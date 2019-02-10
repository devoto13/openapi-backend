"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var ajv_1 = __importDefault(require("ajv"));
var router_1 = require("./router");
var utils_1 = __importDefault(require("./utils"));
var backend_1 = require("./backend");
/**
 * Class that handles JSON schema validation
 *
 * @export
 * @class OpenAPIValidator
 */
var OpenAPIValidator = /** @class */ (function () {
    /**
     * Creates an instance of OpenAPIValidation
     *
     * @param opts - constructor options
     * @param {Document | string} opts.definition - the OpenAPI definition, file path or Document object
     * @param {boolean} opts.ajvOpts - default ajv constructor opts (default: { unknownFormats: 'ignore' })
     * @param {OpenAPIRouter} opts.router - passed instance of OpenAPIRouter. Will create own child if no passed
     * @memberof OpenAPIRequestValidator
     */
    function OpenAPIValidator(opts) {
        this.definition = opts.definition;
        this.ajvOpts = __assign({ unknownFormats: 'ignore' }, (opts.ajvOpts || {}));
        // initalize router
        this.router = opts.router || new router_1.OpenAPIRouter({ definition: this.definition });
        // get defined api operations
        var operations = this.router.getOperations();
        // build request validation schemas for api operations
        this.requestValidators = {};
        operations.map(this.buildRequestValidatorsForOperation.bind(this));
        // build response validation schemas for api operations
        this.responseValidators = {};
        operations.map(this.buildResponseValidatorForOperation.bind(this));
        // build response validation schemas for api operations, per status code
        this.statusBasedResponseValidators = {};
        operations.map(this.buildStatusBasedResponseValidatorForOperation.bind(this));
        // build response header validation schemas for api operations
        this.responseHeadersValidators = {};
        operations.map(this.buildResponseHeadersValidatorForOperation.bind(this));
    }
    /**
     * Validates a request against prebuilt Ajv validators and returns the validation result.
     *
     * The method will first match the request to an API operation and use the pre-compiled Ajv validation schema to
     * validate it.
     *
     * @param {Request} req - request to validate
     * @param {(Operation | string)} operation - operation to validate against
     * @returns {ValidationResult}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.validateRequest = function (req, operation) {
        var _a;
        var result = {
            valid: true,
            errors: [],
        };
        if (!operation) {
            operation = this.router.matchOperation(req);
        }
        else if (typeof operation === 'string') {
            operation = this.router.getOperation(operation);
        }
        if (!operation || !operation.operationId) {
            throw new Error("Unknown operation");
        }
        // get pre-compiled ajv schemas for operation
        var operationId = operation.operationId;
        var validators = this.getRequestValidatorsForOperation(operationId);
        // build a parameter object to validate
        var _b = this.router.parseRequest(req, operation.path), params = _b.params, query = _b.query, headers = _b.headers, cookies = _b.cookies, requestBody = _b.requestBody;
        // convert singular query parameters to arrays if specified as array in operation parametes
        for (var _i = 0, _c = lodash_1.default.entries(query); _i < _c.length; _i++) {
            var _d = _c[_i], name = _d[0], value = _d[1];
            if (typeof value === 'string') {
                var operationParameter = lodash_1.default.find(operation.parameters, { name: name, in: 'query' });
                if (operationParameter) {
                    var schema = operationParameter.schema;
                    if (schema && schema.type === 'array') {
                        query[name] = [value];
                    }
                }
            }
        }
        var parameters = lodash_1.default.omitBy({
            path: params,
            query: query,
            header: headers,
            cookie: cookies,
        }, lodash_1.default.isNil);
        if (typeof req.body !== 'object' && req.body !== undefined) {
            var payloadFormats = lodash_1.default.keys(lodash_1.default.get(operation, 'requestBody.content', {}));
            if (payloadFormats.length === 1 && payloadFormats[0] === 'application/json') {
                // check that JSON isn't malformed when the only payload format is JSON
                try {
                    JSON.parse("" + req.body);
                }
                catch (err) {
                    result.errors.push({
                        keyword: 'parse',
                        dataPath: '',
                        schemaPath: '#/requestBody',
                        params: [],
                        message: err.message,
                    });
                }
            }
        }
        if (typeof requestBody === 'object' || headers['content-type'] === 'application/json') {
            // include request body in validation if an object is provided
            parameters.requestBody = requestBody;
        }
        // validate parameters against each pre-compiled schema
        for (var _e = 0, validators_1 = validators; _e < validators_1.length; _e++) {
            var validate = validators_1[_e];
            validate(parameters);
            if (validate.errors) {
                (_a = result.errors).push.apply(_a, validate.errors);
            }
        }
        if (lodash_1.default.isEmpty(result.errors)) {
            // set empty errors array to null so we can check for result.errors truthiness
            result.errors = null;
        }
        else {
            // there were errors, set valid to false
            result.valid = false;
        }
        return result;
    };
    /**
     * Validates a response against a prebuilt Ajv validator and returns the result
     *
     * @param {*} res
     * @param {(Operation | string)} [operation]
     * @package {number} [statusCode]
     * @returns {ValidationResult}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.validateResponse = function (res, operation, statusCode) {
        var _a;
        var result = {
            valid: true,
            errors: [],
        };
        if (typeof operation === 'string') {
            operation = this.router.getOperation(operation);
        }
        if (!operation || !operation.operationId) {
            throw new Error("Unknown operation");
        }
        var operationId = operation.operationId;
        var validate;
        if (statusCode) {
            // use specific status code
            var validateMap = this.getStatusBasedResponseValidatorForOperation(operationId);
            if (validateMap) {
                validate = utils_1.default.findStatusCodeMatch(statusCode, validateMap);
            }
        }
        else {
            // match against all status codes
            validate = this.getResponseValidatorForOperation(operationId);
        }
        if (validate) {
            // perform validation against response
            validate(res);
            if (validate.errors) {
                (_a = result.errors).push.apply(_a, validate.errors);
            }
        }
        else {
            // maybe we should warn about this? TODO: add option to enable / disable warnings
            // console.warn(`No validation matched for ${JSON.stringify({ operationId, statusCode })}`);
        }
        if (lodash_1.default.isEmpty(result.errors)) {
            // set empty errors array to null so we can check for result.errors truthiness
            result.errors = null;
        }
        else {
            // there were errors, set valid to false
            result.valid = false;
        }
        return result;
    };
    /**
     * Validates response headers against a prebuilt Ajv validator and returns the result
     *
     * @param {*} headers
     * @param {(Operation | string)} [operation]
     * @param {number} [opts.statusCode]
     * @param {SetMatchType} [opts.setMatchType] - one of 'any', 'superset', 'subset', 'exact'
     * @returns {ValidationResult}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.validateResponseHeaders = function (headers, operation, opts) {
        var _a;
        var result = {
            valid: true,
            errors: [],
        };
        if (typeof operation === 'string') {
            operation = this.router.getOperation(operation);
        }
        if (!operation || !operation.operationId) {
            throw new Error("Unknown operation");
        }
        var setMatchType = opts && opts.setMatchType;
        var statusCode = opts && opts.statusCode;
        if (!setMatchType) {
            setMatchType = backend_1.SetMatchType.Any;
        }
        else if (!lodash_1.default.includes(Object.values(backend_1.SetMatchType), setMatchType)) {
            throw new Error("Unknown setMatchType " + setMatchType);
        }
        var operationId = operation.operationId;
        var validateMap = this.getResponseHeadersValidatorForOperation(operationId);
        if (validateMap) {
            var validateForStatus = void 0;
            if (statusCode) {
                validateForStatus = utils_1.default.findStatusCodeMatch(statusCode, validateMap);
            }
            else {
                validateForStatus = utils_1.default.findDefaultStatusCodeMatch(validateMap).res;
            }
            if (validateForStatus) {
                var validate = validateForStatus[setMatchType];
                if (validate) {
                    headers = lodash_1.default.mapKeys(headers, function (value, headerName) { return headerName.toLowerCase(); });
                    validate({ headers: headers });
                    if (validate.errors) {
                        (_a = result.errors).push.apply(_a, validate.errors);
                    }
                }
            }
        }
        if (lodash_1.default.isEmpty(result.errors)) {
            // set empty errors array to null so we can check for result.errors truthiness
            result.errors = null;
        }
        else {
            // there were errors, set valid to false
            result.valid = false;
        }
        return result;
    };
    /**
     * Get an array of request validator functions for an operation by operationId
     *
     * @param {string} operationId
     * @returns {Ajv.ValidateFunction[]}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.getRequestValidatorsForOperation = function (operationId) {
        return this.requestValidators[operationId];
    };
    /**
     * Builds Ajv request validation functions for an operation and registers them to requestValidators
     *
     * @param {Operation} operation
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.buildRequestValidatorsForOperation = function (operation) {
        var operationId = operation.operationId;
        // validator functions for this operation
        var validators = [];
        // schema for operation requestBody
        if (operation.requestBody) {
            var requestBody = operation.requestBody;
            var jsonbody = requestBody.content['application/json'];
            if (jsonbody && jsonbody.schema) {
                var requestBodySchema = {
                    title: 'Request',
                    type: 'object',
                    additionalProperties: true,
                    properties: {
                        requestBody: jsonbody.schema,
                    },
                    required: [],
                };
                if (lodash_1.default.keys(requestBody.content).length === 1) {
                    // if application/json is the only specified format, it's required
                    requestBodySchema.required.push('requestBody');
                }
                // add compiled params schema to schemas for this operation id
                var requstBodyValidator = new ajv_1.default(this.ajvOpts);
                validators.push(requstBodyValidator.compile(requestBodySchema));
            }
        }
        // schema for operation parameters in: path,query,header,cookie
        var paramsSchema = {
            title: 'Request',
            type: 'object',
            additionalProperties: true,
            properties: {
                path: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {},
                    required: [],
                },
                query: {
                    type: 'object',
                    properties: {},
                    additionalProperties: false,
                    required: [],
                },
                header: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {},
                    required: [],
                },
                cookie: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {},
                    required: [],
                },
            },
            required: [],
        };
        // params are dereferenced here, no reference objects.
        var parameters = operation.parameters;
        parameters.map(function (param) {
            var target = paramsSchema.properties[param.in];
            // Header params are case-insensitive according to https://tools.ietf.org/html/rfc7230#page-22, so they are
            // normalized to lower case and validated as such.
            var normalizedParamName = param.in === 'header' ? param.name.toLowerCase() : param.name;
            if (param.required) {
                target.required.push(normalizedParamName);
                paramsSchema.required = lodash_1.default.uniq(paramsSchema.required.concat([param.in]));
            }
            target.properties[normalizedParamName] = param.schema;
        });
        // add compiled params schema to requestValidators for this operation id
        var paramsValidator = new ajv_1.default(__assign({}, this.ajvOpts, { coerceTypes: true })); // types should be coerced for params
        validators.push(paramsValidator.compile(paramsSchema));
        this.requestValidators[operationId] = validators;
    };
    /**
     * Get response validator function for an operation by operationId
     *
     * @param {string} operationId
     * @returns {Ajv.ValidateFunction}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.getResponseValidatorForOperation = function (operationId) {
        return this.responseValidators[operationId];
    };
    /**
     * Builds an ajv response validator function for an operation and registers it to responseValidators
     *
     * @param {Operation} operation
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.buildResponseValidatorForOperation = function (operation) {
        if (!operation.responses) {
            // operation has no responses, don't register a validator
            return null;
        }
        var operationId = operation.operationId;
        var responseSchemas = [];
        lodash_1.default.mapKeys(operation.responses, function (response, status) {
            if (response.content && response.content['application/json'] && response.content['application/json'].schema) {
                responseSchemas.push(response.content['application/json'].schema);
            }
            return null;
        });
        if (lodash_1.default.isEmpty(responseSchemas)) {
            // operation has no response schemas, don't register a validator
            return null;
        }
        // compile the validator function and register to responseValidators
        var schema = { oneOf: responseSchemas };
        var validator = new ajv_1.default(this.ajvOpts);
        this.responseValidators[operationId] = validator.compile(schema);
    };
    /**
     * Get response validator function for an operation by operationId
     *
     * @param {string} operationId
     * @returns {Object.<Ajv.ValidateFunction>}}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.getStatusBasedResponseValidatorForOperation = function (operationId) {
        return this.statusBasedResponseValidators[operationId];
    };
    /**
     * Builds an ajv response validator function for an operation and registers it to responseHeadersValidators
     *
     * @param {Operation} operation
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.buildStatusBasedResponseValidatorForOperation = function (operation) {
        if (!operation.responses) {
            // operation has no responses, don't register a validator
            return null;
        }
        var operationId = operation.operationId;
        var responseValidators = {};
        var validator = new ajv_1.default(this.ajvOpts);
        lodash_1.default.mapKeys(operation.responses, function (response, status) {
            if (response.content && response.content['application/json'] && response.content['application/json'].schema) {
                var validateFn = response.content['application/json'].schema;
                responseValidators[status] = validator.compile(validateFn);
            }
            return null;
        });
        this.statusBasedResponseValidators[operationId] = responseValidators;
    };
    /**
     * Get response validator function for an operation by operationId
     *
     * @param {string} operationId
     * @returns {Object.<Object.<Ajv.ValidateFunction>>}}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.getResponseHeadersValidatorForOperation = function (operationId) {
        return this.responseHeadersValidators[operationId];
    };
    /**
     * Builds an ajv response validator function for an operation and registers it to responseHeadersValidators
     *
     * @param {Operation} operation
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIValidator.prototype.buildResponseHeadersValidatorForOperation = function (operation) {
        if (!operation.responses) {
            // operation has no responses, don't register a validator
            return null;
        }
        var operationId = operation.operationId;
        var headerValidators = {};
        var validator = new ajv_1.default(__assign({}, this.ajvOpts, { coerceTypes: true }));
        lodash_1.default.mapKeys(operation.responses, function (response, status) {
            var validateFns = {};
            var properties = {};
            var required = [];
            lodash_1.default.mapKeys(response.headers, function (header, headerName) {
                headerName = headerName.toLowerCase();
                if (header.schema) {
                    properties[headerName] = header.schema;
                    required.push(headerName);
                }
                return null;
            });
            validateFns[backend_1.SetMatchType.Any] = validator.compile({
                type: 'object',
                properties: {
                    headers: {
                        type: 'object',
                        additionalProperties: true,
                        properties: properties,
                        required: [],
                    },
                },
            });
            validateFns[backend_1.SetMatchType.Superset] = validator.compile({
                type: 'object',
                properties: {
                    headers: {
                        type: 'object',
                        additionalProperties: true,
                        properties: properties,
                        required: required,
                    },
                },
            });
            validateFns[backend_1.SetMatchType.Subset] = validator.compile({
                type: 'object',
                properties: {
                    headers: {
                        type: 'object',
                        additionalProperties: false,
                        properties: properties,
                        required: [],
                    },
                },
            });
            validateFns[backend_1.SetMatchType.Exact] = validator.compile({
                type: 'object',
                properties: {
                    headers: {
                        type: 'object',
                        additionalProperties: false,
                        properties: properties,
                        required: required,
                    },
                },
            });
            headerValidators[status] = validateFns;
            return null;
        });
        this.responseHeadersValidators[operationId] = headerValidators;
    };
    return OpenAPIValidator;
}());
exports.OpenAPIValidator = OpenAPIValidator;
//# sourceMappingURL=validation.js.map