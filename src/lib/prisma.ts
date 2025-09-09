import { PrismaClient } from "../generated/prisma";

declare global {
    // Allow global prisma during dev to avoid multiple instances
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
