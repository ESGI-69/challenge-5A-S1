<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231015151701 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE establishment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE establishment (id INT NOT NULL, name VARCHAR(55) NOT NULL, email VARCHAR(55) NOT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, lat NUMERIC(10, 6) NOT NULL, long NUMERIC(10, 6) NOT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE establishment_id_seq CASCADE');
        $this->addSql('DROP TABLE establishment');
    }
}
