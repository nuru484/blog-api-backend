/*
  Warnings:

  - You are about to drop the column `userId` on the `View` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `View` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userId_fkey";

-- AlterTable
ALTER TABLE "View" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "View_postId_key" ON "View"("postId");
