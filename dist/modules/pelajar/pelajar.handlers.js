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
exports.ValidationHandler = exports.LoginHandler = exports.RegisterHandler = void 0;
const pelajar_services_1 = require("./pelajar.services");
const RegisterHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name } = request.body;
    const pelajar = yield (0, pelajar_services_1.getPelajar)(reply, { username });
    if (pelajar)
        return reply.badRequest('Username is already taken.');
    const newPelajar = yield (0, pelajar_services_1.createPelajar)(reply, { username, name });
    return reply.code(201).send(newPelajar);
});
exports.RegisterHandler = RegisterHandler;
const LoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.body;
    const pelajar = yield (0, pelajar_services_1.getPelajar)(reply, { username });
    if (pelajar == null)
        return reply.badRequest('Username is not exists.');
    return reply.send(pelajar);
});
exports.LoginHandler = LoginHandler;
const ValidationHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.params;
    const pelajar = yield (0, pelajar_services_1.getPelajar)(reply, { username });
    if (pelajar == null)
        return reply.unauthorized('Username is not exists.');
    return reply.send(pelajar);
});
exports.ValidationHandler = ValidationHandler;
