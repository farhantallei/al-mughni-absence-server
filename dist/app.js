"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = exports.addPlugins = void 0;
const sensible_1 = __importDefault(require("@fastify/sensible"));
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
const app = (0, fastify_1.default)().withTypeProvider();
function addPlugins() {
    app.register(sensible_1.default);
}
exports.addPlugins = addPlugins;
function addRoutes() {
    app.register(routes_1.routes, { prefix: 'api' });
}
exports.addRoutes = addRoutes;
exports.default = app;
