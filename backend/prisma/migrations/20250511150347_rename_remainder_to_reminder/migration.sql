/*
  Warnings:

  - You are about to drop the column `reminder_type` on the `TakingMedication` table. All the data in the column will be lost.
  - Added the required column `remainder_type` to the `TakingMedication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TakingMedication" DROP COLUMN "reminder_type",
ADD COLUMN     "remainder_type" VARCHAR(100) NOT NULL;
