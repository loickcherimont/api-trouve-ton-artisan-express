CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Schemas
CREATE TABLE IF NOT EXISTS categories (
    id INT UNSIGNED AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS specialites (
    id INT UNSIGNED AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    categories_id INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_categories
    FOREIGN KEY (categories_id) REFERENCES categories (id)
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS artisans (
    id INT UNSIGNED AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
	note DECIMAL(2,1) NOT NULL CHECK (note BETWEEN 0 AND 5),
	ville VARCHAR(100) NOT NULL,
	a_propos TEXT NOT NULL,
	email VARCHAR(255) UNIQUE,
	site_web VARCHAR(255),
	est_en_top_trois BOOLEAN NOT NULL CHECK (est_en_top_trois IN (0, 1)),
    specialites_id INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_specialites
    FOREIGN KEY (specialites_id) REFERENCES specialites (id)
    ON DELETE RESTRICT
);