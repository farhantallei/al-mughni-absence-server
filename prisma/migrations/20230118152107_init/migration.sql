-- CreateTable
CREATE TABLE `Absent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pelajarId` INTEGER NOT NULL,
    `pengajarId` INTEGER NOT NULL,
    `programId` INTEGER NOT NULL,
    `level` ENUM('dasar', 'lanjutan') NULL,
    `date` DATE NOT NULL,
    `present` BOOLEAN NOT NULL,
    `reason` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Absent_pelajarId_programId_date_key`(`pelajarId`, `programId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelajar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Pelajar_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengajar` (
    `pelajarId` INTEGER NOT NULL,
    `programId` INTEGER NOT NULL,

    PRIMARY KEY (`pelajarId`, `programId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Program` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Program_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Absent` ADD CONSTRAINT `Absent_pelajarId_fkey` FOREIGN KEY (`pelajarId`) REFERENCES `Pelajar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengajar` ADD CONSTRAINT `Pengajar_pelajarId_fkey` FOREIGN KEY (`pelajarId`) REFERENCES `Pelajar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengajar` ADD CONSTRAINT `Pengajar_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
