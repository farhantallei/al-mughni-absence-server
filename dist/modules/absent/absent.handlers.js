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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAbsentHandler = exports.AddAbsentHandler = exports.GetAbsentHandler = void 0;
const absent_services_1 = require("./absent.services");
const GetAbsentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.query, { date } = _a, rest = __rest(_a, ["date"]);
    return yield (0, absent_services_1.getAbsent)(reply, Object.assign({ date: new Date(date) }, rest));
});
exports.GetAbsentHandler = GetAbsentHandler;
const AddAbsentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = request.body, { pelajarId, programId, date, present, reason } = _b, rest = __rest(_b, ["pelajarId", "programId", "date", "present", "reason"]);
    const isAbsentExists = yield (0, absent_services_1.checkAbsent)(reply, {
        pelajarId,
        programId,
        date: new Date(date),
    });
    if (isAbsentExists)
        return reply.badRequest('Cannot modify existing absent.');
    if (present === false && reason == null)
        return reply.badRequest('Fill the reason.');
    const absent = yield (0, absent_services_1.addAbsent)(reply, Object.assign({ pelajarId,
        programId, date: new Date(date), present,
        reason }, rest));
    return reply.code(201).send(absent);
});
exports.AddAbsentHandler = AddAbsentHandler;
const UpdateAbsentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = request.body, { pelajarId, programId, date, present, reason } = _c, rest = __rest(_c, ["pelajarId", "programId", "date", "present", "reason"]);
    const isAbsentExists = yield (0, absent_services_1.checkAbsent)(reply, {
        pelajarId,
        programId,
        date: new Date(date),
    });
    if (!isAbsentExists)
        return reply.badRequest('Absent is not found.');
    if (!present && reason == null)
        return reply.badRequest('Fill the reason.');
    return yield (0, absent_services_1.updateAbsent)(reply, Object.assign({ pelajarId,
        programId, date: new Date(date), present, reason: present ? null : reason }, rest));
});
exports.UpdateAbsentHandler = UpdateAbsentHandler;
