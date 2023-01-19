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
exports.absentRoutes = void 0;
const absent_handlers_1 = require("./absent.handlers");
const absent_schemas_1 = require("./absent.schemas");
const absentRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: absent_schemas_1.GetAbsentSchema,
        handler: absent_handlers_1.GetAbsentHandler,
    });
    route.post('/', {
        schema: absent_schemas_1.AddAbsentSchema,
        handler: absent_handlers_1.AddAbsentHandler,
    });
    route.patch('/', {
        schema: absent_schemas_1.UpdateAbsentSchema,
        handler: absent_handlers_1.UpdateAbsentHandler,
    });
});
exports.absentRoutes = absentRoutes;
