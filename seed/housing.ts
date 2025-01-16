import { pool } from './database';
import { faker } from '@faker-js/faker';
import { QueryResult } from 'pg';
import getRandomPicture from "./images";

/**
 * Populate housing
 * @returns Promise<string[]>
 */
export async function populateHousing(): Promise<string[]> {
    const client = await pool.connect();

    try {
        const ids: string[] = [];

        // Delete existing data from housing table
        await client.query('DELETE FROM "housing"');

        // Reset the auto-increment counter
        await client.query('ALTER SEQUENCE "housing_id_seq" RESTART WITH 1');

        // Insert 100 fake properties
        for (let i = 0; i < 100; i++) {
            const housing = {
                picture: getRandomPicture(),
                address: faker.location.streetAddress(),
                zip: faker.location.zipCode(),
                city: faker.location.city(),
                area: faker.number.int({max:200, min:25}),
                num_rooms: faker.number.int({max:6, min:1}),
                monthly_rent: faker.number.int({max:3000, min:800}),
                description: faker.lorem.text(),
                created_at: faker.date.past({years: 1}),
                updated_at: faker.date.recent(),
            };

            const insertQuery = {
                text: 'INSERT INTO "housing" (picture, address, zip, city, area, num_rooms, monthly_rent, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
                values: Object.values(housing),
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
