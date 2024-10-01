/*
  Warnings:

  - You are about to drop the column `publishedDate` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "publishedDate",
ADD COLUMN     "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
