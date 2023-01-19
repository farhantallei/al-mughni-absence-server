"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAbsentSchema = exports.AddAbsentSchema = exports.GetAbsentSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.GetAbsentSchema = {
    querystring: typebox_1.Type.Object({
        pelajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
    }),
    response: {
        200: typebox_1.Type.Union([
            typebox_1.Type.Object({
                id: data_type_1.DataType.id,
                pengajarId: data_type_1.DataType.id,
                programId: data_type_1.DataType.id,
                date: data_type_1.DataType.date,
                present: typebox_1.Type.Boolean(),
                reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
            }),
            typebox_1.Type.Null(),
        ]),
    },
};
exports.AddAbsentSchema = {
    body: typebox_1.Type.Object({
        pelajarId: data_type_1.DataType.id,
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
        present: typebox_1.Type.Boolean(),
        reason: typebox_1.Type.Optional(data_type_1.DataType.string),
    }),
    response: {
        201: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            pengajarId: data_type_1.DataType.id,
            programId: data_type_1.DataType.id,
            date: data_type_1.DataType.date,
            present: typebox_1.Type.Boolean(),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        }),
    },
};
exports.UpdateAbsentSchema = {
    body: typebox_1.Type.Object({
        pelajarId: data_type_1.DataType.id,
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
        present: typebox_1.Type.Boolean(),
        reason: typebox_1.Type.Optional(data_type_1.DataType.string),
    }),
    response: {
        200: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            pengajarId: data_type_1.DataType.id,
            programId: data_type_1.DataType.id,
            date: data_type_1.DataType.date,
            present: typebox_1.Type.Boolean(),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        }),
    },
};
