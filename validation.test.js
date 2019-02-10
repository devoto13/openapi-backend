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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var backend_1 = require("./backend");
var headers = { accept: 'application/json' };
var meta = {
    openapi: '3.0.0',
    info: {
        title: 'api',
        version: '1.0.0',
    },
};
describe('OpenAPIValidator', function () {
    describe('.validateRequest', function () {
        describe('path params in path base object', function () {
            var validator = new index_1.OpenAPIValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets/{id}': {
                            get: {
                                operationId: 'getPetById',
                                responses: { 200: { description: 'ok' } },
                            },
                            delete: {
                                operationId: 'deletePetById',
                                responses: { 200: { description: 'ok' } },
                            },
                            parameters: [
                                {
                                    name: 'id',
                                    in: 'path',
                                    required: true,
                                    schema: {
                                        type: 'integer',
                                        minimum: 0,
                                    },
                                },
                            ],
                        },
                    } }),
            });
            test('passes validation for GET /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/NaN', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/1.1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1.1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/-1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/-1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for DELETE /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1', method: 'delete', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for DELETE /pets/NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/NaN', method: 'delete', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for DELETE /pets/1.1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1.1', method: 'delete', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for DELETE /pets/-1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/-1', method: 'delete', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('path params in operation object', function () {
            var validator = new index_1.OpenAPIValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets/{id}': {
                            get: {
                                operationId: 'getPetById',
                                responses: { 200: { description: 'ok' } },
                                parameters: [
                                    {
                                        name: 'id',
                                        in: 'path',
                                        required: true,
                                        schema: {
                                            type: 'integer',
                                            minimum: 0,
                                        },
                                    },
                                ],
                            },
                        },
                    } }),
            });
            test('passes validation for GET /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/NaN', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('path params with custom apiRoot', function () {
            var definition = __assign({}, meta, { paths: {
                    '/pets/{id}': {
                        get: {
                            operationId: 'getPetById',
                            responses: { 200: { description: 'ok' } },
                            parameters: [
                                {
                                    name: 'id',
                                    in: 'path',
                                    required: true,
                                    schema: {
                                        type: 'integer',
                                        minimum: 0,
                                    },
                                },
                            ],
                        },
                    },
                } });
            var validator = new index_1.OpenAPIValidator({
                definition: definition,
                router: new index_1.OpenAPIRouter({ definition: definition, apiRoot: '/v1' }),
            });
            test('passes validation for GET /v1/pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/v1/pets/1', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
        });
        describe('query params in path base object', function () {
            var validator = new index_1.OpenAPIValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets': {
                            get: {
                                operationId: 'getPets',
                                responses: { 200: { description: 'ok' } },
                            },
                            parameters: [
                                {
                                    name: 'limit',
                                    in: 'query',
                                    schema: {
                                        type: 'integer',
                                        minimum: 1,
                                        maximum: 100,
                                    },
                                },
                                {
                                    name: 'offset',
                                    in: 'query',
                                    schema: {
                                        type: 'integer',
                                        minimum: 0,
                                    },
                                },
                            ],
                        },
                    } }),
            });
            test('passes validation for GET /pets', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?limit=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?offset=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?offset=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?limit=10&offset=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=10&offset=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=NaN', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=-1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=-1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=999999999', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=999999999', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?unknownparam=1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?unknownparam=1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('query params in operation object', function () {
            var validator = new index_1.OpenAPIValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets': {
                            get: {
                                operationId: 'getPets',
                                responses: { 200: { description: 'ok' } },
                                parameters: [
                                    {
                                        name: 'q',
                                        in: 'query',
                                        schema: {
                                            type: 'array',
                                            items: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                    {
                                        name: 'limit',
                                        in: 'query',
                                        schema: {
                                            type: 'integer',
                                            minimum: 1,
                                            maximum: 100,
                                        },
                                    },
                                ],
                            },
                        },
                    } }),
            });
            test('passes validation for GET /pets?limit=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=10&limit=20', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?unknownparam=1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q=search', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q=search', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q=search1&q=search2', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q=search1&q=search2', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q[]=search1&q[]=search2', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q[]=search1&q[]=search2', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q[0]=search1&q[1]=search2', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q[0]=search1&q[1]=search2', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?unknownparam=1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?unknownparam=1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('headers', function () {
            var validator = new index_1.OpenAPIValidator({
                definition: __assign({}, meta, { paths: {
                        '/secret': {
                            get: {
                                operationId: 'secretWithApiKey',
                                responses: { 200: { description: 'ok' } },
                            },
                            parameters: [
                                {
                                    name: 'X-Api-Key',
                                    in: 'header',
                                    schema: {
                                        type: 'string',
                                        pattern: '^[A-Za-z0-9]{8,16}$',
                                    },
                                    required: true,
                                },
                            ],
                        },
                    } }),
            });
            test('passes validation for GET /secret, x-api-key:abcd0123', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/secret',
                        method: 'get',
                        headers: __assign({}, headers, { 'x-api-key': 'abcd0123' }),
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /secret, x-api-key:123', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/secret',
                        method: 'get',
                        headers: __assign({}, headers, { 'x-api-key': '123' }),
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /secret, x-api-key:äääöööååå', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/secret',
                        method: 'get',
                        headers: __assign({}, headers, { 'x-api-key': 'äääöööååå' }),
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('request payloads', function () {
            var petSchema = {
                type: 'object',
                additionalProperties: false,
                properties: {
                    name: {
                        type: 'string',
                    },
                    age: {
                        type: 'integer',
                    },
                },
                required: ['name'],
            };
            var validator = new index_1.OpenAPIValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets': {
                            post: {
                                operationId: 'createPet',
                                responses: { 200: { description: 'ok' } },
                                requestBody: {
                                    content: {
                                        'application/json': {
                                            schema: petSchema,
                                        },
                                    },
                                },
                            },
                            put: {
                                operationId: 'replacePet',
                                responses: { 200: { description: 'ok' } },
                                requestBody: {
                                    content: {
                                        'application/json': {
                                            schema: petSchema,
                                        },
                                        'application/xml': {
                                            example: '<Pet><name>string</name></Pet>',
                                        },
                                    },
                                },
                            },
                        },
                    } }),
            });
            test('passes validation for POST /pets with full object', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            name: 'Garfield',
                            age: 40,
                        },
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for POST /pets with name only', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            name: 'Garfield',
                        },
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for POST /pets with age only', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            age: 40,
                        },
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for POST /pets with additional property', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            name: 'Garfield',
                            hello: 'world',
                        },
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for POST /pets with empty payload', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for non-json data when the only media type defined is application/json', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        body: '<XML>',
                        headers: headers,
                    });
                    expect(valid.errors).toHaveLength(2);
                    expect(valid.errors[0].keyword).toBe('parse');
                    return [2 /*return*/];
                });
            }); });
            test('allows non-json data when application/json is not the only allowed media type', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'put',
                        body: '<XML>',
                        headers: headers,
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('.validateResponse', function () {
        var petSchema = {
            type: 'object',
            additionalProperties: false,
            properties: {
                name: {
                    type: 'string',
                },
                age: {
                    type: 'integer',
                },
            },
            required: ['name'],
        };
        var validator = new index_1.OpenAPIValidator({
            definition: __assign({}, meta, { paths: {
                    '/pets': {
                        get: {
                            operationId: 'listPets',
                            responses: {
                                200: {
                                    description: 'list of pets',
                                    content: {
                                        'application/json': {
                                            schema: {
                                                type: 'array',
                                                items: petSchema,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        post: {
                            operationId: 'createPet',
                            responses: {
                                201: {
                                    description: 'created pet',
                                },
                            },
                        },
                    },
                    '/pets/{id}': {
                        get: {
                            operationId: 'getPetById',
                            responses: {
                                200: {
                                    description: 'a pet',
                                    content: {
                                        'application/json': {
                                            schema: petSchema,
                                        },
                                    },
                                },
                                404: {
                                    description: 'pet not found',
                                    content: {
                                        'application/json': {
                                            schema: {
                                                type: 'object',
                                                properties: {
                                                    err: { type: 'string' },
                                                },
                                                required: ['err'],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        parameters: [
                            {
                                name: 'id',
                                in: 'path',
                                required: true,
                                schema: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                            },
                        ],
                    },
                } }),
        });
        test('passes validation with valid 200 response object and operationId getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    name: 'Garfield',
                    age: 30,
                }, 'getPetById');
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid 200 response object and operation object for getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    name: 'Garfield',
                    age: 30,
                }, {
                    method: 'get',
                    path: '/pets/{id}',
                    operationId: 'getPetById',
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid 404 response object and operationId getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    err: 'pet not found',
                }, 'getPetById');
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid response array and operationId listPets', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse([
                    {
                        name: 'Garfield',
                        age: 30,
                    },
                    {
                        name: 'Odie',
                        age: 2,
                    },
                ], 'listPets');
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with an invalid response object', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    unknown: 'property',
                }, 'getPetById');
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with a missing response object', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse(null, 'getPetById');
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation for an operation with no response schemas', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({}, 'createPet');
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid 200 response object and operationId getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    name: 'Garfield',
                    age: 30,
                }, 'getPetById', 200);
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with valid 404 response object and operationId getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    name: 'Garfield',
                    age: 30,
                }, 'getPetById', 404);
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid 200 response object and operation object for getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    name: 'Garfield',
                    age: 30,
                }, {
                    method: 'get',
                    path: '/pets/{id}',
                    operationId: 'getPetById',
                }, 200);
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with valid 404 response object and operation object for getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    name: 'Garfield',
                    age: 30,
                }, {
                    method: 'get',
                    path: '/pets/{id}',
                    operationId: 'getPetById',
                }, 404);
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid 404 response object and operationId getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    err: 'pet not found',
                }, 'getPetById', 404);
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with valid 200 response object and operationId getPetById', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponse({
                    err: 'pet not found',
                }, 'getPetById', 200);
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
    });
    describe('.validateResponseHeaders', function () {
        var validator = new index_1.OpenAPIValidator({
            definition: __assign({}, meta, { paths: {
                    '/pets': {
                        get: {
                            operationId: 'listPets',
                            responses: {
                                200: {
                                    description: 'list of pets',
                                    headers: {
                                        'X-Integer': {
                                            description: 'A header with an Integer',
                                            schema: {
                                                type: 'integer',
                                            },
                                        },
                                        'X-String': {
                                            description: 'The number of remaining requests in the current period',
                                            schema: {
                                                type: 'string',
                                            },
                                        },
                                        'X-Boolean': {
                                            description: 'The number of seconds left in the current period',
                                            schema: {
                                                type: 'boolean',
                                            },
                                        },
                                    },
                                },
                                '2XX': {
                                    description: 'list of pets',
                                    headers: {
                                        'X-Other-Integer': {
                                            description: 'A header with an Integer',
                                            schema: {
                                                type: 'integer',
                                            },
                                        },
                                        'X-Other-String': {
                                            description: 'The number of remaining requests in the current period',
                                            schema: {
                                                type: 'string',
                                            },
                                        },
                                        'X-Other-Boolean': {
                                            description: 'The number of seconds left in the current period',
                                            schema: {
                                                type: 'boolean',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        post: {
                            operationId: 'createPet',
                            responses: {
                                201: {
                                    description: 'created pet',
                                    headers: {
                                        'X-Integer': {
                                            description: 'A header with an Integer',
                                            schema: {
                                                type: 'integer',
                                            },
                                        },
                                        'X-String': {
                                            description: 'The number of remaining requests in the current period',
                                            schema: {
                                                type: 'string',
                                            },
                                        },
                                        'X-Boolean': {
                                            description: 'The number of seconds left in the current period',
                                            schema: {
                                                type: 'boolean',
                                            },
                                        },
                                    },
                                },
                                default: {
                                    description: 'created pet',
                                    headers: {
                                        'X-Other-Integer': {
                                            description: 'A header with an Integer',
                                            schema: {
                                                type: 'integer',
                                            },
                                        },
                                        'X-Other-String': {
                                            description: 'The number of remaining requests in the current period',
                                            schema: {
                                                type: 'string',
                                            },
                                        },
                                        'X-Other-Boolean': {
                                            description: 'The number of seconds left in the current period',
                                            schema: {
                                                type: 'boolean',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                } }),
        });
        test('passes validation with valid header object and operationId listPets, no options', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': 42,
                    'X-String': '42',
                    'X-Boolean': true,
                }, 'listPets');
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid header object and operationId listPets', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': 42,
                    'X-String': '42',
                    'X-Boolean': true,
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid header object, operationId listPets and no statusCode', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': 42,
                    'X-String': '42',
                    'X-Boolean': true,
                }, 'listPets', {
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid header object and operationId createPet', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': 42,
                    'X-String': '42',
                    'X-Boolean': true,
                }, 'createPet', {
                    statusCode: 201,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with valid header object after coercion and operationId listPets', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': '42',
                    'X-String': 42,
                    'X-Boolean': 'true',
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation when fallback to default', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Other-Integer': '42',
                    'X-Other-String': 42,
                    'X-Other-Boolean': 'true',
                }, 'createPet', {
                    statusCode: 404,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with additional headers and setMatchType is superset', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': '42',
                    'X-String': 42,
                    'X-Boolean': 'true',
                    'X-Other': 'false',
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Superset,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with missing headers and setMatchType is superset', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': '42',
                    'X-String': 42,
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Superset,
                });
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with missing headers and setMatchType is subset', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': '42',
                    'X-String': 42,
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Subset,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with additional headers and setMatchType is subset', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': '42',
                    'X-String': 42,
                    'X-Boolean': 'true',
                    'X-Other': 'false',
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Subset,
                });
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with any header set and setMatchType is any', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Integer': '42',
                    'X-String': 42,
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Any,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with an invalid response object', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    unknown: 'property',
                }, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with a missing response object', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders(null, 'listPets', {
                    statusCode: 200,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with a res code handler fallback', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-Other-Integer': '42',
                    'X-Other-String': 42,
                    'X-Other-Boolean': 'true',
                }, 'listPets', {
                    statusCode: 205,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('throw an error when passing SetMatchType', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(function () {
                    validator.validateResponseHeaders({
                        'X-Other-Integer': '42',
                        'X-Other-String': 42,
                        'X-Other-Boolean': 'true',
                    }, 'listPets', {
                        statusCode: 205,
                        setMatchType: 'error',
                    });
                }).toThrow();
                return [2 /*return*/];
            });
        }); });
        test('passes validation with header case not matching the spec', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'X-OtHer-InTeger': '42',
                    'x-other-string': 42,
                    'X-OTHER-BOOLEAN': 'true',
                }, 'listPets', {
                    statusCode: 205,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeFalsy();
                return [2 /*return*/];
            });
        }); });
        test('fails validation with header separators omitted', function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = validator.validateResponseHeaders({
                    'xotherinteger': '42',
                    'xotherstring': 42,
                    'XOTHERBOOLEAN': 'true',
                }, 'listPets', {
                    statusCode: 205,
                    setMatchType: backend_1.SetMatchType.Exact,
                });
                expect(valid.errors).toBeTruthy();
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=validation.test.js.map