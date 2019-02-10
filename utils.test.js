"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("./utils"));
describe('OpenAPIUtils', function () {
    describe('.findStatusCodeMatch', function () {
        test('mismatches', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(302, {
                    '200': 'OK',
                    '201': 'Created',
                });
                expect(value).toEqual(undefined);
                return [2 /*return*/];
            });
        }); });
        test('matches 200', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(200, {
                    '200': 'OK',
                    '201': 'Created',
                });
                expect(value).toEqual('OK');
                return [2 /*return*/];
            });
        }); });
        test('matches 201', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(201, {
                    '200': 'OK',
                    '201': 'Created',
                });
                expect(value).toEqual('Created');
                return [2 /*return*/];
            });
        }); });
        test('matches 404', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(404, {
                    '200': 'OK',
                    '404': 'Not Found',
                    '201': 'Created',
                });
                expect(value).toEqual('Not Found');
                return [2 /*return*/];
            });
        }); });
        test('matches 500 (not string)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(500, {
                    '200': 'OK',
                    '500': ['a', { test: 'it works' }, 'b'],
                    '201': 'Created',
                });
                expect(value[1].test).toEqual('it works');
                return [2 /*return*/];
            });
        }); });
        test('matches 500 (null)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(500, {
                    '200': 'OK',
                    '500': null,
                    '201': 'Created',
                });
                expect(value).toEqual(null);
                return [2 /*return*/];
            });
        }); });
        test('matches 500 (undefined)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(500, {
                    '200': 'OK',
                    '500': undefined,
                    '201': 'Created',
                });
                expect(value).toEqual(undefined);
                return [2 /*return*/];
            });
        }); });
        test('matches 400 (when pattern present)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(400, {
                    '200': 'OK',
                    '401': 'Unauthorized',
                    '4XX': 'Error (patterned)',
                    '400': 'Bad Request',
                });
                expect(value).toEqual('Bad Request');
                return [2 /*return*/];
            });
        }); });
        test('matches 401 (when pattern present)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(401, {
                    '200': 'OK',
                    '401': 'Unauthorized',
                    '4XX': 'Error (patterned)',
                    '400': 'Bad Request',
                });
                expect(value).toEqual('Unauthorized');
                return [2 /*return*/];
            });
        }); });
        test('matches 403 (via pattern)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(403, {
                    '200': 'OK',
                    '401': 'Unauthorized',
                    '4XX': 'Error (patterned)',
                    '400': 'Bad Request',
                });
                expect(value).toEqual('Error (patterned)');
                return [2 /*return*/];
            });
        }); });
        test('not matches default (on pattern when default present)', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(402, {
                    '200': 'OK',
                    'default': 'Default value',
                    '401': 'Unauthorized',
                    '4XX': 'Error (patterned)',
                    '400': 'Bad Request',
                });
                expect(value).toEqual('Error (patterned)');
                return [2 /*return*/];
            });
        }); });
        test('matches default', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(500, {
                    '200': 'OK',
                    'default': 'Default value',
                    '401': 'Unauthorized',
                    '4XX': 'Error (patterned)',
                    '400': 'Bad Request',
                });
                expect(value).toEqual('Default value');
                return [2 /*return*/];
            });
        }); });
        test('wrong pattern fallback', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findStatusCodeMatch(23456, {
                    '1XX': '100-199 codes',
                    '2XX': '200-299 codes',
                    '3XX': '300-399 codes',
                });
                expect(value).toEqual(undefined);
                return [2 /*return*/];
            });
        }); });
    });
    describe('.findDefaultStatusCodeMatch', function () {
        test('matches 200', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    '200': '200',
                    '201': '201',
                });
                expect(value.res).toEqual('200');
                return [2 /*return*/];
            });
        }); });
        test('matches 201', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    '201': '201',
                    '300': '300',
                });
                expect(value.res).toEqual('201');
                return [2 /*return*/];
            });
        }); });
        test('matches 201 with 2XX fallback', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    '201': '201',
                    '2XX': '2XX',
                    '300': '300',
                });
                expect(value.res).toEqual('201');
                return [2 /*return*/];
            });
        }); });
        test('matches 201 with default fallback', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    'default': 'default',
                    '201': '201',
                    '2XX': '2XX',
                    '300': '300',
                });
                expect(value.res).toEqual('201');
                return [2 /*return*/];
            });
        }); });
        test('matches 2XX', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    '2XX': '2XX',
                    '300': '300',
                });
                expect(value.res).toEqual('2XX');
                return [2 /*return*/];
            });
        }); });
        test('matches 2XX with default fallback', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    '2XX': '2XX',
                    'default': 'default',
                });
                expect(value.res).toEqual('2XX');
                return [2 /*return*/];
            });
        }); });
        test('matches first one', function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = utils_1.default.findDefaultStatusCodeMatch({
                    '305': '305',
                    '3XX': '3XX',
                });
                expect(value.res).toEqual('305');
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=utils.test.js.map