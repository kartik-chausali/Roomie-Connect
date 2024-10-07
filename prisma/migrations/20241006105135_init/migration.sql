-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RoomPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomatePost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "lookingFor" TEXT NOT NULL,
    "locations" TEXT[],
    "budget" INTEGER NOT NULL,

    CONSTRAINT "RoomatePost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RoomPost_userId_key" ON "RoomPost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomatePost_userId_key" ON "RoomatePost"("userId");

-- AddForeignKey
ALTER TABLE "RoomPost" ADD CONSTRAINT "RoomPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomatePost" ADD CONSTRAINT "RoomatePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
