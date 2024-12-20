<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241220013827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ready_products ADD product_variant_id INT NOT NULL');
        $this->addSql('ALTER TABLE ready_products ADD CONSTRAINT FK_EBB30779A80EF684 FOREIGN KEY (product_variant_id) REFERENCES product_variants (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_EBB30779A80EF684 ON ready_products (product_variant_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE ready_products DROP CONSTRAINT FK_EBB30779A80EF684');
        $this->addSql('DROP INDEX IDX_EBB30779A80EF684');
        $this->addSql('ALTER TABLE ready_products DROP product_variant_id');
    }
}
