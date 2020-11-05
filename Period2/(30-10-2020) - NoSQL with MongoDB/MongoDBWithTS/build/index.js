"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = __importStar(require("mongodb"));
require('dotenv').config();
var MongoClient = mongo.MongoClient;
var uri = process.env.CONNECTION;
var client;
if (uri != undefined) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
function insertAndReadData() {
    return __awaiter(this, void 0, void 0, function () {
        var db, result, results, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db("test");
                    return [4 /*yield*/, db.collection("inventory").deleteMany({})];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection("inventory").insertOne({
                            item: "canvas",
                            qty: 100,
                            tags: ["cotton"],
                            size: { h: 28, w: 35.5, uom: "cm" }
                        })];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({}).toArray()];
                case 4:
                    results = _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    console.log("UPPS --->", err_1);
                    return [3 /*break*/, 7];
                case 6:
                    client.close();
                    console.log("Connection Closed");
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function connectSetupDataAndGetDB() {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db("test");
                    return [4 /*yield*/, db.collection("inventory").deleteMany({})];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection("inventory").insertMany([
                            { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
                            { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
                            { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
                            { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
                            { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
                        ])];
                case 3:
                    _a.sent();
                    return [2 /*return*/, db];
            }
        });
    });
}
function readDataWithQueries() {
    return __awaiter(this, void 0, void 0, function () {
        var db, results, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, connectSetupDataAndGetDB()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ status: "D" }).toArray()];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ size: { h: 14, w: 21, uom: "cm" } }).toArray()];
                case 3:
                    // console.log("1 --->\n", results);
                    results = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ "size.uom": "in" }).toArray()];
                case 4:
                    // console.log("2 --->\n", results);
                    results = _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_2 = _a.sent();
                    console.log("UPPS --->", err_2);
                    return [3 /*break*/, 7];
                case 6:
                    client.close();
                    console.log("Closes connection");
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function readWithOptions() {
    return __awaiter(this, void 0, void 0, function () {
        var db, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, connectSetupDataAndGetDB()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({}, //The empty brackets mean "Find everything"
                        {
                            projection: { item: 1, qty: 1, _id: 0 },
                            limit: 3,
                            sort: { qty: -1 }
                        } //This extra bracket is for options.
                        ).toArray()];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_3 = _a.sent();
                    console.log("UPPS --->", err_3);
                    return [3 /*break*/, 5];
                case 4:
                    client.close();
                    console.log("Closes connection");
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function readDataWithOperatorsAndCompoundQueries() {
    return __awaiter(this, void 0, void 0, function () {
        var db, result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 8]);
                    return [4 /*yield*/, connectSetupDataAndGetDB()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ "size.h": { $lt: 15 } }).toArray()];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ status: "A", qty: { $lt: 30 } }).toArray()];
                case 3:
                    // console.log("1 --->\n", result);
                    result = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ $or: [{ status: "A" }, { qty: { $lt: 30 } }] }).toArray()];
                case 4:
                    // console.log("2 --->\n", result);
                    result = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").find({ status: "A", $or: [{ qty: { $lt: 30 } }, { item: /^p/ }] }).toArray()];
                case 5:
                    // console.log("3 --->\n", result);
                    result = _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    err_4 = _a.sent();
                    console.log("UPPS --->", err_4);
                    return [3 /*break*/, 8];
                case 7:
                    client.close();
                    console.log("Closes connection");
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function updateData() {
    return __awaiter(this, void 0, void 0, function () {
        var db, result, res, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    return [4 /*yield*/, connectSetupDataAndGetDB()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").findOneAndUpdate({ item: "paper" }, {
                            $set: { "size.uom": "cm", status: "P" },
                            $currentDate: { lastModified: true }
                        }, { returnOriginal: false })];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").updateMany({ "qty": { $lt: 50 } }, {
                            $set: { "size.uom": "cm", "status": "P" },
                            $currentDate: { "lastModified": true }
                        })];
                case 3:
                    res = _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    err_5 = _a.sent();
                    console.log("UPPS --->", err_5);
                    return [3 /*break*/, 6];
                case 5:
                    client.close();
                    console.log("Closes connection");
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function deleteData() {
    return __awaiter(this, void 0, void 0, function () {
        var db, result, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    return [4 /*yield*/, connectSetupDataAndGetDB()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").deleteOne({ status: "D" })];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, db.collection("inventory").deleteMany({ status: "A" })];
                case 3:
                    // console.log("1 --->\n", result.deletedCount);
                    result = _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    err_6 = _a.sent();
                    console.log("UPPS --->", err_6);
                    return [3 /*break*/, 6];
                case 5:
                    client.close();
                    console.log("Closes connection");
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// insertAndReadData();
// readDataWithQueries();
// readWithOptions();
// readDataWithOperatorsAndCompoundQueries();
// updateData();
// deleteData();
//# sourceMappingURL=index.js.map