/*
  Warnings:

  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `first_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `gender` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `last_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthdate",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "medical_situation" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drug" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakingMedication" (
    "id" SERIAL NOT NULL,
    "take_hour" TIMESTAMP(3) NOT NULL,
    "reminder_type" VARCHAR(100) NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "drug_id" INTEGER NOT NULL,

    CONSTRAINT "TakingMedication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideEffect" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "reporting_date" TIMESTAMP(3) NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "drug_id" INTEGER NOT NULL,

    CONSTRAINT "SideEffect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_id_key" ON "Subscription"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drug" ADD CONSTRAINT "Drug_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakingMedication" ADD CONSTRAINT "TakingMedication_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakingMedication" ADD CONSTRAINT "TakingMedication_drug_id_fkey" FOREIGN KEY ("drug_id") REFERENCES "Drug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideEffect" ADD CONSTRAINT "SideEffect_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideEffect" ADD CONSTRAINT "SideEffect_drug_id_fkey" FOREIGN KEY ("drug_id") REFERENCES "Drug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
