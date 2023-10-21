<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231020074811 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('COMMENT ON COLUMN company.validated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE establishment ADD company_id INT NOT NULL');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EE979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_DBEFB1EE979B1AD6 ON establishment (company_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EE979B1AD6');
        $this->addSql('DROP INDEX IDX_DBEFB1EE979B1AD6');
        $this->addSql('ALTER TABLE establishment DROP company_id');
    }
}
