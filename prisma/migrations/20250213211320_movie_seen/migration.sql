-- CreateTable
CREATE TABLE "SeenMovie" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nomineeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeenMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeenMovie_userId_nomineeId_key" ON "SeenMovie"("userId", "nomineeId");

-- AddForeignKey
ALTER TABLE "SeenMovie" ADD CONSTRAINT "SeenMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenMovie" ADD CONSTRAINT "SeenMovie_nomineeId_fkey" FOREIGN KEY ("nomineeId") REFERENCES "Nominee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
