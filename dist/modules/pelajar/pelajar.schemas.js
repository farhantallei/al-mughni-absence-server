"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.RegisterSchema = {
    body: typebox_1.Type.Object({
        username: data_type_1.DataType.string,
        name: data_type_1.DataType.string,
    }),
    response: {
        201: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            username: data_type_1.DataType.string,
            name: data_type_1.DataType.string,
        }),
    },
};
exports.LoginSchema = {
    body: typebox_1.Type.Object({
        username: data_type_1.DataType.string,
    }),
    response: {
        200: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            username: data_type_1.DataType.string,
            name: data_type_1.DataType.string,
        }),
    },
};
exports.ValidationSchema = {
    params: typebox_1.Type.Object({ username: data_type_1.DataType.string }),
    response: {
        200: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            username: data_type_1.DataType.string,
            name: data_type_1.DataType.string,
        }),
    },
};
