var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { RouteController } from "../../controllers/routeController.js";
import asyncHandler from "express-async-handler";
const router = Router();
const controller = new RouteController();
router.post("/routes", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.createRoute(req, res);
})));
router.get("/routes", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield controller.getRoutes(req, res); })));
router.get("/routes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield controller.getRouteById(req, res); })));
router.put("/routes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield controller.updateRoute(req, res); })));
router.delete("/routes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield controller.deleteRoute(req, res); })));
export default router;
