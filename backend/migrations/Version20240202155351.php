<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240202155351 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP start_date');
        $this->addSql('ALTER TABLE appointment DROP end_date');
        $this->addSql('ALTER TABLE appointment DROP cancelled_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE appointment ADD start_date TIME(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE appointment ADD end_date TIME(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE appointment ADD cancelled_at TIME(0) WITHOUT TIME ZONE DEFAULT NULL');
    }
}
