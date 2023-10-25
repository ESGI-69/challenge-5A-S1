<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231023151933 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE employee_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, company_id_id INT NOT NULL, prefered_establishment_id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D9F75A138B53C32 ON employee (company_id_id)');
        $this->addSql('CREATE INDEX IDX_5D9F75A152BAE862 ON employee (prefered_establishment_id)');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A138B53C32 FOREIGN KEY (company_id_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A152BAE862 FOREIGN KEY (prefered_establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE employee_id_seq CASCADE');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A138B53C32');
        $this->addSql('ALTER TABLE employee DROP CONSTRAINT FK_5D9F75A152BAE862');
        $this->addSql('DROP TABLE employee');
    }
}
