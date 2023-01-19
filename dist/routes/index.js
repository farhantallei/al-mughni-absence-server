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
exports.routes = void 0;
const absent_routes_1 = require("../modules/absent/absent.routes");
const pelajar_routes_1 = require("../modules/pelajar/pelajar.routes");
const pengajar_routes_1 = require("../modules/pengajar/pengajar.routes");
const program_routes_1 = require("../modules/program/program.routes");
const routes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(pelajar_routes_1.pelajarRoutes, { prefix: 'pelajar' });
    route.register(pengajar_routes_1.pengajarRoutes, { prefix: 'pengajar' });
    route.register(absent_routes_1.absentRoutes, { prefix: 'absent' });
    route.register(program_routes_1.programRoutes, { prefix: 'program' });
});
exports.routes = routes;
