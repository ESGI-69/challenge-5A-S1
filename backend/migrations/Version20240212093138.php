<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240212093138 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE establishment_picture_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE establishment_picture (id INT NOT NULL, establishment_id INT NOT NULL, path_picture VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6BFC3AAC8565851 ON establishment_picture (establishment_id)');
        $this->addSql('ALTER TABLE establishment_picture ADD CONSTRAINT FK_6BFC3AAC8565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE establishment_picture_id_seq CASCADE');
        $this->addSql('ALTER TABLE establishment_picture DROP CONSTRAINT FK_6BFC3AAC8565851');
        $this->addSql('DROP TABLE establishment_picture');
    }
}
