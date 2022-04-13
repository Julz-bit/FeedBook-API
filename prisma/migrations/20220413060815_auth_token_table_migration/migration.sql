-- CreateTable
CREATE TABLE "AuthToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "api_token" TEXT NOT NULL,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
