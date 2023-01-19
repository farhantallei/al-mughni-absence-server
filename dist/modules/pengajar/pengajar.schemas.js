"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPengajarSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.GetPengajarSchema = {
    querystring: typebox_1.Type.Object({
        program: typebox_1.Type.String(),
    }),
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            username: data_type_1.DataType.string,
            name: data_type_1.DataType.string,
        })),
    },
};
