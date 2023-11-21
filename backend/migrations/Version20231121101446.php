<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231121101446 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE establishment_type_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE establishment_type (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE establishment ADD type_id INT NOT NULL');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EEC54C8C93 FOREIGN KEY (type_id) REFERENCES establishment_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEC54C8C93 ON establishment (type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EEC54C8C93');
        $this->addSql('DROP SEQUENCE establishment_type_id_seq CASCADE');
        $this->addSql('DROP TABLE establishment_type');
        $this->addSql('DROP INDEX IDX_DBEFB1EEC54C8C93');
        $this->addSql('ALTER TABLE establishment DROP type_id');
    }
}
