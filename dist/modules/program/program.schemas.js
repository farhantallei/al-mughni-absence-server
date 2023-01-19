"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProgramListSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.GetProgramListSchema = {
    params: typebox_1.Type.Object({ pelajarId: data_type_1.DataType.id }),
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            program: typebox_1.Type.String(),
            status: typebox_1.Type.Union([
                typebox_1.Type.Literal('alpha'),
                typebox_1.Type.Literal('present'),
                typebox_1.Type.Literal('absent'),
            ]),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        })),
    },
};
