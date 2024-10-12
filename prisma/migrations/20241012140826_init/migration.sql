/*
  Warnings:

  - Added the required column `guestName` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "guestName" TEXT NOT NULL;
