"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.DataType = {
    id: typebox_1.Type.Integer({ minimum: 1 }),
    string: typebox_1.Type.String({ minLength: 3 }),
    date: typebox_1.Type.String({ format: 'date' }),
    datetime: typebox_1.Type.String({ format: 'date-time' }),
};
