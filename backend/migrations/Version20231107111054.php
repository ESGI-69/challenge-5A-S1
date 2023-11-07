<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231107111054 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE working_hours_range ADD employee_id INT NOT NULL');
        $this->addSql('ALTER TABLE working_hours_range ADD CONSTRAINT FK_8F7C03CD8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8F7C03CD8C03F15C ON working_hours_range (employee_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE working_hours_range DROP CONSTRAINT FK_8F7C03CD8C03F15C');
        $this->addSql('DROP INDEX IDX_8F7C03CD8C03F15C');
        $this->addSql('ALTER TABLE working_hours_range DROP employee_id');
    }
}
