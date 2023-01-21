-- AddForeignKey
ALTER TABLE `Absent` ADD CONSTRAINT `Absent_pengajarId_programId_fkey` FOREIGN KEY (`pengajarId`, `programId`) REFERENCES `Pengajar`(`pelajarId`, `programId`) ON DELETE RESTRICT ON UPDATE CASCADE;
