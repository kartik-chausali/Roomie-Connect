/*
  Warnings:

  - You are about to drop the column `about` on the `RoomPost` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `RoomPost` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `RoomPost` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `RoomPost` table. All the data in the column will be lost.
  - You are about to drop the column `locations` on the `RoomPost` table. All the data in the column will be lost.
  - You are about to drop the column `lookingFor` on the `RoomPost` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `RoomPost` table. All the data in the column will be lost.
  - Added the required column `image` to the `RoomatePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `RoomatePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomPost" DROP COLUMN "about",
DROP COLUMN "budget",
DROP COLUMN "gender",
DROP COLUMN "image",
DROP COLUMN "locations",
DROP COLUMN "lookingFor",
DROP COLUMN "profession";

-- AlterTable
ALTER TABLE "RoomatePost" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL,
ALTER COLUMN "budget" SET DATA TYPE TEXT;
