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
exports.pelajarRoutes = void 0;
const pelajar_handlers_1 = require("./pelajar.handlers");
const pelajar_schemas_1 = require("./pelajar.schemas");
const pelajarRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/:username', {
        schema: pelajar_schemas_1.ValidationSchema,
        handler: pelajar_handlers_1.ValidationHandler,
    });
    route.post('/register', {
        schema: pelajar_schemas_1.RegisterSchema,
        handler: pelajar_handlers_1.RegisterHandler,
    });
    route.post('/login', {
        schema: pelajar_schemas_1.LoginSchema,
        handler: pelajar_handlers_1.LoginHandler,
    });
});
exports.pelajarRoutes = pelajarRoutes;
