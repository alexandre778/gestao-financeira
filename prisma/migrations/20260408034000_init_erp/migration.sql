-- DropForeignKey
ALTER TABLE `itemvenda` DROP FOREIGN KEY `ItemVenda_vendaId_fkey`;

-- DropIndex
DROP INDEX `ItemVenda_vendaId_fkey` ON `itemvenda`;

-- AlterTable
ALTER TABLE `itemvenda` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `venda` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `ItemVenda_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Venda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
