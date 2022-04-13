/*
  Warnings:

  - You are about to drop the column `userId` on the `AuthToken` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `AuthToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_userId_fkey";

-- AlterTable
ALTER TABLE "AuthToken" DROP COLUMN "userId",
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER;
