"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitToDB = void 0;
const app_1 = __importDefault(require("../app"));
function commitToDB(prisma, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, data] = yield app_1.default.to(prisma);
        if (error) {
            if (reply)
                return reply.internalServerError(error.message);
            return app_1.default.httpErrors.internalServerError(error.message);
        }
        return data;
    });
}
exports.commitToDB = commitToDB;
