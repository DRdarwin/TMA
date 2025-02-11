// src/services/adminService.ts
import { prisma } from '../prisma/prisma.service';

export const getFlights = async () => {
    return await prisma.flight.findMany();
};

export const createFlight = async (data: any) => {
    return await prisma.flight.create({ data });
};

export const updateFlight = async (id: string, data: any) => {
    return await prisma.flight.update({ where: { id }, data });
};

export const deleteFlight = async (id: string) => {
    return await prisma.flight.delete({ where: { id } });
};

export const getWallets = async () => {
    return await prisma.wallet.findMany();
};

export const updateWallet = async (id: string, data: any) => {
    return await prisma.wallet.update({ where: { id }, data });
};
