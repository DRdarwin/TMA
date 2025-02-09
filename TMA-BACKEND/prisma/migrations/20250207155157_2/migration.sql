/*
  Warnings:

  - The primary key for the `Flight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arrivalCity` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalTime` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departureCity` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Flight` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usdtBalance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTransaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[telegramId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `arrival` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengers` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTransaction" DROP CONSTRAINT "UserTransaction_flightId_fkey";

-- DropForeignKey
ALTER TABLE "UserTransaction" DROP CONSTRAINT "UserTransaction_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_pkey",
DROP COLUMN "arrivalCity",
DROP COLUMN "arrivalTime",
DROP COLUMN "departureCity",
DROP COLUMN "departureTime",
DROP COLUMN "status",
ADD COLUMN     "arrival" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departure" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ADD COLUMN     "passengers" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Flight_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Flight_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "usdtBalance",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "telegramId" TEXT NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "UserSettings";

-- DropTable
DROP TABLE "UserTransaction";

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
