<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240127133227 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE feedback_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE feedback_type_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE sub_feedback_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE feedback (id INT NOT NULL, appointment_id INT DEFAULT NULL, service_id INT DEFAULT NULL, employee_id INT DEFAULT NULL, author_id INT DEFAULT NULL, comment VARCHAR(1000) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D2294458E5B533F9 ON feedback (appointment_id)');
        $this->addSql('CREATE INDEX IDX_D2294458ED5CA9E6 ON feedback (service_id)');
        $this->addSql('CREATE INDEX IDX_D22944588C03F15C ON feedback (employee_id)');
        $this->addSql('CREATE INDEX IDX_D2294458F675F31B ON feedback (author_id)');
        $this->addSql('CREATE TABLE feedback_type (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE feedback_type_establishment (feedback_type_id INT NOT NULL, establishment_id INT NOT NULL, PRIMARY KEY(feedback_type_id, establishment_id))');
        $this->addSql('CREATE INDEX IDX_B11B9A005415AC30 ON feedback_type_establishment (feedback_type_id)');
        $this->addSql('CREATE INDEX IDX_B11B9A008565851 ON feedback_type_establishment (establishment_id)');
        $this->addSql('CREATE TABLE sub_feedback (id INT NOT NULL, feedback_id INT DEFAULT NULL, feedback_type_id INT DEFAULT NULL, note INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6886AA01D249A887 ON sub_feedback (feedback_id)');
        $this->addSql('CREATE INDEX IDX_6886AA015415AC30 ON sub_feedback (feedback_type_id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D22944588C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458F675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback_type_establishment ADD CONSTRAINT FK_B11B9A005415AC30 FOREIGN KEY (feedback_type_id) REFERENCES feedback_type (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback_type_establishment ADD CONSTRAINT FK_B11B9A008565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE sub_feedback ADD CONSTRAINT FK_6886AA01D249A887 FOREIGN KEY (feedback_id) REFERENCES feedback (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE sub_feedback ADD CONSTRAINT FK_6886AA015415AC30 FOREIGN KEY (feedback_type_id) REFERENCES feedback_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE feedback_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE feedback_type_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE sub_feedback_id_seq CASCADE');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D2294458E5B533F9');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D2294458ED5CA9E6');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D22944588C03F15C');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D2294458F675F31B');
        $this->addSql('ALTER TABLE feedback_type_establishment DROP CONSTRAINT FK_B11B9A005415AC30');
        $this->addSql('ALTER TABLE feedback_type_establishment DROP CONSTRAINT FK_B11B9A008565851');
        $this->addSql('ALTER TABLE sub_feedback DROP CONSTRAINT FK_6886AA01D249A887');
        $this->addSql('ALTER TABLE sub_feedback DROP CONSTRAINT FK_6886AA015415AC30');
        $this->addSql('DROP TABLE feedback');
        $this->addSql('DROP TABLE feedback_type');
        $this->addSql('DROP TABLE feedback_type_establishment');
        $this->addSql('DROP TABLE sub_feedback');
    }
}
