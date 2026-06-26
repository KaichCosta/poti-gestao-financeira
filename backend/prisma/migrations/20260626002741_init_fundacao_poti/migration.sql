-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipoConta` VARCHAR(191) NOT NULL DEFAULT 'gratis',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuracoes_orcamento` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `receitaMensal` DECIMAL(10, 2) NOT NULL,
    `porcentagemFixos` INTEGER NOT NULL DEFAULT 50,
    `porcentagemNaoEssenc` INTEGER NOT NULL DEFAULT 30,
    `porcentagemInvest` INTEGER NOT NULL DEFAULT 20,
    `diaResetOrcamento` INTEGER NOT NULL DEFAULT 1,
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `configuracoes_orcamento_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacoes` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metodo_pagamento` VARCHAR(191) NOT NULL,
    `tipo_gasto` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transacoes_usuario_id_data_tipo_gasto_metodo_pagamento_idx`(`usuario_id`, `data`, `tipo_gasto`, `metodo_pagamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `configuracoes_orcamento` ADD CONSTRAINT `configuracoes_orcamento_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
