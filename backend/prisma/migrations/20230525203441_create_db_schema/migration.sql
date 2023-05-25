-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
