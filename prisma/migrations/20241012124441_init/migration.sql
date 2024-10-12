/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `View` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "View_postId_userId_key" ON "View"("postId", "userId");
