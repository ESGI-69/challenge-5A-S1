<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231207095218 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE company ALTER path_kbis SET NOT NULL');
        $this->addSql('ALTER TABLE company ALTER logo_path SET NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4FBF094FE7927C74 ON company (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_4FBF094FE7927C74');
        $this->addSql('ALTER TABLE company ALTER path_kbis DROP NOT NULL');
        $this->addSql('ALTER TABLE company ALTER logo_path DROP NOT NULL');
    }
}
