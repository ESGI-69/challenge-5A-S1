<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231018144635 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE working_hours_range_service (working_hours_range_id INT NOT NULL, service_id INT NOT NULL, PRIMARY KEY(working_hours_range_id, service_id))');
        $this->addSql('CREATE INDEX IDX_AC8D92D8DA8AE78 ON working_hours_range_service (working_hours_range_id)');
        $this->addSql('CREATE INDEX IDX_AC8D92DED5CA9E6 ON working_hours_range_service (service_id)');
        $this->addSql('ALTER TABLE working_hours_range_service ADD CONSTRAINT FK_AC8D92D8DA8AE78 FOREIGN KEY (working_hours_range_id) REFERENCES working_hours_range (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE working_hours_range_service ADD CONSTRAINT FK_AC8D92DED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE working_hours_range_service DROP CONSTRAINT FK_AC8D92D8DA8AE78');
        $this->addSql('ALTER TABLE working_hours_range_service DROP CONSTRAINT FK_AC8D92DED5CA9E6');
        $this->addSql('DROP TABLE working_hours_range_service');
    }
}
