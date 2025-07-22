/*
  Warnings:

  - Added the required column `about` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyName` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `RoomPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomPost" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "propertyName" TEXT NOT NULL,
ADD COLUMN     "rent" INTEGER NOT NULL,
ADD COLUMN     "roomType" TEXT NOT NULL;
