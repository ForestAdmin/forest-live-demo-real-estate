DROP TABLE IF EXISTS "customer" CASCADE;
DROP TABLE IF EXISTS "housing" CASCADE;
DROP TABLE IF EXISTS "deal" CASCADE;
DROP TABLE IF EXISTS "contract" CASCADE;
DROP TYPE IF EXISTS "customer_status" CASCADE;
CREATE TYPE "customer_status" AS ENUM ('lead', 'customer', 'ex-customer');
CREATE TABLE "customer" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(30),
    customer_type customer_status,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE "housing" (
    id SERIAL PRIMARY KEY,
    picture VARCHAR(255),
    address TEXT NOT NULL,
    zip VARCHAR(10) NOT NULL,
    city VARCHAR(255) NOT NULL,
    area FLOAT,
    num_rooms INTEGER,
    monthly_rent FLOAT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE "deal" (
    id SERIAL PRIMARY KEY,
    owner VARCHAR(255),
    customer_id INTEGER NOT NULL REFERENCES "customer"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    housing_id INTEGER NOT NULL REFERENCES "housing"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    stage VARCHAR(20),
    closed_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE "contract" (
    id SERIAL PRIMARY KEY,
    deal_id INTEGER NOT NULL REFERENCES "deal"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    commission_rate FLOAT,
    start_at DATE,
    end_at DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_deal_customer_id ON "deal"(customer_id);
CREATE INDEX idx_contract_deal_id ON "contract"(deal_id);