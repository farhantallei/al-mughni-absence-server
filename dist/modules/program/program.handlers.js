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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProgramListHandler = void 0;
const program_services_1 = require("./program.services");
const GetProgramListHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelajarId } = request.params;
    const programs = yield (0, program_services_1.getProgram)(reply);
    let result = [];
    for (let i = 0; i < programs.length; i++) {
        const absent = yield (0, program_services_1.getAbsentByPelajarId)(reply, {
            pelajarId,
            programId: programs[i].id,
        });
        let status = 'alpha';
        if (absent == null)
            status = 'alpha';
        else if (absent.present)
            status = 'present';
        else
            status = 'absent';
        result.push({
            id: programs[i].id,
            program: programs[i].name,
            status,
            reason: (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
        });
    }
    return result;
});
exports.GetProgramListHandler = GetProgramListHandler;
