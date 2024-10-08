-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_headquarterBoxId_fkey" FOREIGN KEY ("headquarterBoxId") REFERENCES "Box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
