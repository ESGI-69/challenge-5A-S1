<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240207210105 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE working_hours_range ADD day VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE working_hours_range ALTER COLUMN start_date DROP NOT NULL');
        $this->addSql('ALTER TABLE working_hours_range ALTER COLUMN end_date DROP NOT NULL');
        }

        public function down(Schema $schema): void
        {
            // this down() migration is auto-generated, please modify it to your needs
            $this->addSql('CREATE SCHEMA public');
            $this->addSql('ALTER TABLE working_hours_range DROP day');
            $this->addSql('ALTER TABLE working_hours_range ALTER COLUMN start_date TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING start_date::TIMESTAMP(0) WITHOUT TIME ZONE');
            $this->addSql('ALTER TABLE working_hours_range ALTER COLUMN start_date SET DEFAULT CURRENT_TIMESTAMP');
            $this->addSql('ALTER TABLE working_hours_range ALTER COLUMN end_date TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING end_date::TIMESTAMP(0) WITHOUT TIME ZONE');
            $this->addSql('ALTER TABLE working_hours_range ALTER COLUMN end_date SET DEFAULT CURRENT_TIMESTAMP');
        }
    }
