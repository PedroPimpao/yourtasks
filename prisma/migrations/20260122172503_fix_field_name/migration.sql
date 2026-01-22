/*
  Warnings:

  - You are about to drop the column `stats` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "stats",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendente';
