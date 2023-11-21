<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231119184356 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE service ADD establishment_id INT NOT NULL');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD28565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E19D9AD28565851 ON service (establishment_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD28565851');
        $this->addSql('DROP INDEX IDX_E19D9AD28565851');
        $this->addSql('ALTER TABLE service DROP establishment_id');
    }
}
