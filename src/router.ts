import _ from 'lodash';
import { OpenAPIV3 } from 'openapi-types';
import bath from 'bath';
import cookie from 'cookie';
import { parse as parseQuery } from 'qs';

// alias Document to OpenAPIV3.Document
export type Document = OpenAPIV3.Document;

/**
 * OAS Operation Object containing the path and method so it can be placed in a flat array of operations
 *
 * @export
 * @interface Operation
 * @extends {OpenAPIV3.OperationObject}
 */
export interface Operation extends OpenAPIV3.OperationObject {
  path: string;
  method: string;
}

export interface Request {
  method: string;
  path: string;
  headers: {
    [key: string]: string | string[];
  };
  query?:
    | {
        [key: string]: string | string[];
      }
    | string;
  body?: any;
}

export interface ParsedRequest extends Request {
  params?: {
    [key: string]: string | string[];
  };
  cookies?: {
    [key: string]: string | string[];
  };
  query?: {
    [key: string]: string | string[];
  };
  requestBody?: any;
}

/**
 * Class that handles routing
 *
 * @export
 * @class OpenAPIRouter
 */
export class OpenAPIRouter {
  public definition: Document;
  public apiRoot: string;

  /**
   * Creates an instance of OpenAPIRouter
   *
   * @param opts - constructor options
   * @param {Document} opts.definition - the OpenAPI definition, file path or Document object
   * @param {string} opts.apiRoot - the root URI of the api. all paths are matched relative to apiRoot
   * @memberof OpenAPIRouter
   */
  constructor(opts: { definition: Document; apiRoot?: string }) {
    this.definition = opts.definition;
    this.apiRoot = opts.apiRoot || '/';
  }

  /**
   * Matches a request to an API operation (router)
   *
   * @param {Request} req
   * @returns {Operation}
   * @memberof OpenAPIRouter
   */
  public matchOperation(req: Request): Operation {
    // normalize request for matching
    req = this.normalizeRequest(req);
    // get all operations matching request method in a flat array
    const operations = _.filter(this.getOperations(), ({ method }) => method === req.method);

    // first check for an exact match for path
    const exactMatch = _.find(operations, ({ path }) => path === req.path);
    if (exactMatch) {
      return exactMatch;
    }

    // then check for matches using path templating
    return _.find(operations, ({ path }) => {
      // convert openapi path template to a regex pattern i.e. /{id}/ becomes /[^/]+/
      const pathPattern = `^${path.replace(/\{.*?\}/g, '[^/]+')}$`;
      return Boolean(req.path.match(new RegExp(pathPattern, 'g')));
    });
  }

  /**
   * Flattens operations into a simple array of Operation objects easy to work with
   *
   * @returns {Operation[]}
   * @memberof OpenAPIRouter
   */
  public getOperations(): Operation[] {
    const paths = _.get(this.definition, 'paths', {});
    return _.chain(paths)
      .entries()
      .flatMap(([path, pathBaseObject]) => {
        const methods = _.pick(pathBaseObject, ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']);
        return _.map(_.entries(methods), ([method, operation]) => ({
          ...(operation as OpenAPIV3.OperationObject),
          path,
          method,
          // add the path base object's operations to the operation's parameters
          parameters: [
            ...((operation.parameters as OpenAPIV3.ParameterObject[]) || []),
            ...((pathBaseObject.parameters as OpenAPIV3.ParameterObject[]) || []),
          ],
        }));
      })
      .value();
  }

  /**
   * Gets a single operation based on operationId
   *
   * @param {string} operationId
   * @returns {Operation}
   * @memberof OpenAPIRouter
   */
  public getOperation(operationId: string): Operation {
    return _.find(this.getOperations(), { operationId });
  }

  /**
   * Normalises request:
   * - http method to lowercase
   * - path leading slash 👍
   * - path trailing slash 👎
   * - path query string 👎
   * - apiRoot prefix in path 👎
   *
   * @export
   * @param {Request} req
   * @returns {Request}
   */
  public normalizeRequest(req: Request): Request {
    return {
      ...req,
      path: (req.path || '')
        .trim()
        .split('?')[0] // remove query string
        .replace(/\/+$/, '') // remove trailing slash
        .replace(/^\/*/, '/') // add leading slash
        .replace(new RegExp(`^${this.apiRoot}/?`), '/'), // strip apiRoot prefix
      method: req.method.trim().toLowerCase(),
    };
  }

  /**
   * Parses request
   * - parse json body
   * - parse path params based on uri template
   * - parse query string
   * - parse cookies from headers
   *
   * @export
   * @param {Request} req
   * @param {string} [path]
   * @returns {ParsedRequest}
   */
  public parseRequest(req: Request, path?: string): ParsedRequest {
    let requestBody = req.body;
    if (req.body && typeof req.body !== 'object') {
      try {
        // attempt to parse json
        requestBody = JSON.parse(req.body.toString());
      } catch {
        // suppress json parsing errors
        // we will emit error if validation requires it later
      }
    }

    // parse query string from req.path + req.query
    const query = typeof req.query === 'object' ? req.query : parseQuery(req.path.split('?')[1]);

    // header keys are converted to lowercase, so Content-Type becomes content-type
    const headers = _.mapKeys(req.headers, (val, header) => header.toLowerCase());

    // parse cookie from headers
    const cookieHeader = headers['cookie'];
    const cookies = cookie.parse(_.flatten([cookieHeader]).join('; '));

    // normalize
    req = this.normalizeRequest(req);

    let params = {};
    if (path) {
      // parse path params if path is given
      const pathParams = bath(path);
      params = pathParams.params(req.path);
    }

    return {
      ...req,
      params,
      headers,
      query,
      cookies,
      requestBody,
    };
  }
}
