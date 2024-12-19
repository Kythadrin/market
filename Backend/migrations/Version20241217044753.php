<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241217044753 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admins (id SERIAL NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A2E0150FF85E0677 ON admins (username)');
        $this->addSql('CREATE TABLE cities (id SERIAL NOT NULL, country_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D95DB16B5E237E06 ON cities (name)');
        $this->addSql('CREATE INDEX IDX_D95DB16BF92F3E70 ON cities (country_id)');
        $this->addSql('CREATE TABLE clients (id SERIAL NOT NULL, balance NUMERIC(10, 2) NOT NULL, telegram_id BIGINT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C82E74CC0B3066 ON clients (telegram_id)');
        $this->addSql('COMMENT ON COLUMN clients.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN clients.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE countries (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5D66EBAD5E237E06 ON countries (name)');
        $this->addSql('CREATE TABLE districts (id SERIAL NOT NULL, city_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_68E318DC5E237E06 ON districts (name)');
        $this->addSql('CREATE INDEX IDX_68E318DC8BAC62AF ON districts (city_id)');
        $this->addSql('CREATE TABLE payment (id SERIAL NOT NULL, client_id INT NOT NULL, amount VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, is_completed BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6D28840D19EB6921 ON payment (client_id)');
        $this->addSql('COMMENT ON COLUMN payment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN payment.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE product_variants (id SERIAL NOT NULL, product_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_782839764584665A ON product_variants (product_id)');
        $this->addSql('COMMENT ON COLUMN product_variants.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN product_variants.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE products (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN products.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN products.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE ready_products (id SERIAL NOT NULL, client_id INT DEFAULT NULL, quantity DOUBLE PRECISION NOT NULL, price NUMERIC(10, 2) NOT NULL, latitude NUMERIC(9, 6) DEFAULT NULL, longitude NUMERIC(9, 6) DEFAULT NULL, photos JSON NOT NULL, contract_address VARCHAR(100) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_EBB3077919EB6921 ON ready_products (client_id)');
        $this->addSql('COMMENT ON COLUMN ready_products.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN ready_products.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT FK_D95DB16BF92F3E70 FOREIGN KEY (country_id) REFERENCES countries (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE districts ADD CONSTRAINT FK_68E318DC8BAC62AF FOREIGN KEY (city_id) REFERENCES cities (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D19EB6921 FOREIGN KEY (client_id) REFERENCES clients (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_variants ADD CONSTRAINT FK_782839764584665A FOREIGN KEY (product_id) REFERENCES products (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE ready_products ADD CONSTRAINT FK_EBB3077919EB6921 FOREIGN KEY (client_id) REFERENCES clients (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cities DROP CONSTRAINT FK_D95DB16BF92F3E70');
        $this->addSql('ALTER TABLE districts DROP CONSTRAINT FK_68E318DC8BAC62AF');
        $this->addSql('ALTER TABLE payment DROP CONSTRAINT FK_6D28840D19EB6921');
        $this->addSql('ALTER TABLE product_variants DROP CONSTRAINT FK_782839764584665A');
        $this->addSql('ALTER TABLE ready_products DROP CONSTRAINT FK_EBB3077919EB6921');
        $this->addSql('DROP TABLE admins');
        $this->addSql('DROP TABLE cities');
        $this->addSql('DROP TABLE clients');
        $this->addSql('DROP TABLE countries');
        $this->addSql('DROP TABLE districts');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP TABLE product_variants');
        $this->addSql('DROP TABLE products');
        $this->addSql('DROP TABLE ready_products');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
