import { pool } from './database';
import { faker } from '@faker-js/faker';
import { QueryResult } from 'pg';

/**
 * Populate customer
 * @returns Promise<string[]>
 */
export async function populateCustomers(): Promise<string[]> {
    const client = await pool.connect();

    try {
        const ids: string[] = [];

        // Delete existing data from customer table
        await client.query('DELETE FROM "customer"');

        // Reset the auto-increment counter
        await client.query('ALTER SEQUENCE "customer_id_seq" RESTART WITH 1');

        // Insert 100 fake customers
        const customerType = ['lead', 'customer', 'ex-customer'];
        for (let i = 0; i < 100; i++) {
            const customer = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                customer_type: faker.helpers.arrayElement(customerType),
                created_at: faker.date.past({years: 1}),
                updated_at: faker.date.recent(),
            };

            const insertQuery = {
                text: 'INSERT INTO "customer" (first_name, last_name, email, phone, customer_type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                values: Object.values(customer),
            };

            const result: QueryResult<any> = await client.query(insertQuery);
            ids.push(result.rows[0].id.toString());
        }

        return ids;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}
