/*
  Warnings:

  - The primary key for the `UserSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `theme` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "UserSettings_userId_key";

-- AlterTable
ALTER TABLE "FinancialTransaction" ADD COLUMN     "blockchainTxHash" TEXT,
ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_pkey",
DROP COLUMN "id",
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'uk-UA',
ALTER COLUMN "theme" SET NOT NULL,
ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
