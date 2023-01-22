-- CreateTable
CREATE TABLE `PelajarOnPengajar` (
    `pelajarId` INTEGER NOT NULL,
    `pengajarId` INTEGER NOT NULL,
    `programId` INTEGER NOT NULL,

    PRIMARY KEY (`pelajarId`, `programId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PelajarOnPengajar` ADD CONSTRAINT `PelajarOnPengajar_pelajarId_fkey` FOREIGN KEY (`pelajarId`) REFERENCES `Pelajar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PelajarOnPengajar` ADD CONSTRAINT `PelajarOnPengajar_pengajarId_programId_fkey` FOREIGN KEY (`pengajarId`, `programId`) REFERENCES `Pengajar`(`pelajarId`, `programId`) ON DELETE RESTRICT ON UPDATE CASCADE;
