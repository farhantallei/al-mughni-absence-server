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
exports.getAbsentByPelajarId = exports.getProgram = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const utils_1 = require("../../utils");
const formatDate_1 = require("../../utils/formatDate");
function getProgram(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.program.findMany(), reply);
    });
}
exports.getProgram = getProgram;
function getAbsentByPelajarId(reply, { pelajarId, programId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.absent.findUnique({
            where: {
                pelajarId_programId_date: {
                    pelajarId,
                    programId,
                    date: new Date((0, formatDate_1.formatDate)(new Date())),
                },
            },
            select: { present: true, reason: true },
        }), reply);
    });
}
exports.getAbsentByPelajarId = getAbsentByPelajarId;
