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
exports.getPengajarByProgram = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const utils_1 = require("../../utils");
function getPengajarByProgram(reply, { program }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.pengajar
            .findMany({
            where: { Program: { name: program } },
            select: { Pelajar: true },
            orderBy: { Pelajar: { name: 'asc' } },
        })
            .then((pengajar) => pengajar.map((val) => val.Pelajar)), reply);
    });
}
exports.getPengajarByProgram = getPengajarByProgram;
