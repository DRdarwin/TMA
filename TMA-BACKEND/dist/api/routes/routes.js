var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { RoutesController } from '../../controllers/routesController.js';
import asyncHandler from 'express-async-handler';
const router = Router();
const controller = new RoutesController();
router.post('/routes', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.createRoutes(req, res); // ✅ Виклик createRoutes (МНОЖИНА)
})));
router.get('/routes', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getRoutes(req, res); // ✅ Виклик getRoutes (МНОЖИНА)
})));
router.get('/routes/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getRoutesById(req, res); // ✅ Виклик getRoutesById (МНОЖИНА)
})));
router.put('/routes/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.updateRoutes(req, res); // ✅ Виклик updateRoutes (МНОЖИНА)
})));
router.delete('/routes/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.deleteRoutes(req, res); // ✅ Виклик deleteRoutes (МНОЖИНА)
})));
export default router;
