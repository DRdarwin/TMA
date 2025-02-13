var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
// src/services/adminService.ts
import { prisma } from "../prisma/prisma.service.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
const checkAdmin = (adminId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new UnauthorizedError("Access denied: Admin privileges required");
    }
  });
export const getFlights = (adminId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    return yield prisma.flight.findMany();
  });
export const createFlight = (adminId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    return yield prisma.flight.create({ data });
  });
export const updateFlight = (adminId, id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    return yield prisma.flight.update({
      where: { id },
      data,
    });
  });
export const deleteFlight = (adminId, id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    return yield prisma.flight.delete({
      where: { id },
    });
  });
export const getWallets = (adminId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    try {
      return yield prisma.user.findMany({
        select: {
          id: true,
          telegramId: true,
          username: true,
          usdtBalance: true,
          walletAddress: true,
        },
      });
    } catch (error) {
      console.error("Error fetching wallets:", error);
      throw new Error("Failed to fetch wallets");
    }
  });
export const updateWallet = (adminId, id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    try {
      return yield prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error updating wallet with id ${id}:`, error);
      throw new Error(`Failed to update wallet with id ${id}`);
    }
  });
export const getAllUsers = (adminId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    try {
      return yield prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch all users");
    }
  });
export const banUser = (adminId, id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    try {
      return yield prisma.user.update({
        where: { id: id },
        data: {
          banned: true,
        },
      });
    } catch (error) {
      console.error(`Error banning user with id ${id}:`, error);
      throw new Error(`Failed to ban user with id ${id}`);
    }
  });
export const unbanUser = (adminId, id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield checkAdmin(adminId);
    try {
      return yield prisma.user.update({
        where: { id: id },
        data: {
          banned: false,
        },
      });
    } catch (error) {
      console.error(`Error unbanning user with id ${id}:`, error);
      throw new Error(`Failed to unban user with id ${id}`);
    }
  });
