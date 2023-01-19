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
exports.updateAbsent = exports.addAbsent = exports.getAbsent = exports.checkAbsent = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const utils_1 = require("../../utils");
const formatDate_1 = require("../../utils/formatDate");
function checkAbsent(reply, { pelajarId, programId, date, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.absent.count({ where: { pelajarId, programId, date } }), reply).then((val) => !!val);
    });
}
exports.checkAbsent = checkAbsent;
function getAbsent(reply, pelajarId_programId_date) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.absent
            .findUnique({
            where: { pelajarId_programId_date },
            select: {
                id: true,
                pengajarId: true,
                programId: true,
                date: true,
                present: true,
                reason: true,
            },
        })
            .then((res) => {
            if (res == null)
                return null;
            return Object.assign(Object.assign({}, res), { date: (0, formatDate_1.formatDate)(res.date) });
        }), reply);
    });
}
exports.getAbsent = getAbsent;
function addAbsent(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.absent
            .create({
            data,
            select: {
                id: true,
                pengajarId: true,
                programId: true,
                date: true,
                present: true,
                reason: true,
            },
        })
            .then((res) => (Object.assign(Object.assign({}, res), { date: (0, formatDate_1.formatDate)(res.date) }))), reply);
    });
}
exports.addAbsent = addAbsent;
function updateAbsent(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.absent
            .update({
            where: {
                pelajarId_programId_date: {
                    pelajarId: data.pelajarId,
                    programId: data.programId,
                    date: data.date,
                },
            },
            data,
            select: {
                id: true,
                pengajarId: true,
                programId: true,
                date: true,
                present: true,
                reason: true,
            },
        })
            .then((res) => (Object.assign(Object.assign({}, res), { date: (0, formatDate_1.formatDate)(res.date) }))), reply);
    });
}
exports.updateAbsent = updateAbsent;
