/*
  Warnings:

  - Added the required column `about` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budget` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lookingFor` to the `RoomPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `RoomPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomPost" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "budget" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "locations" TEXT[],
ADD COLUMN     "lookingFor" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL;
