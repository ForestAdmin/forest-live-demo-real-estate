import { pool } from './database';
import { faker } from '@faker-js/faker';
import { QueryResult } from 'pg';

/**
 * Populate housing
 * @param customerIds 
 * @param housingIds 
 * @returns Promise<string[]>
 */
export async function populateDeals(customerIds: Array<string>, housingIds: Array<string>): Promise<string[]> {
    const client = await pool.connect();

    try {
        const ids: string[] = [];

        // Delete existing data from deal table
        await client.query('DELETE FROM "deal"');

        // Reset the auto-increment counter
        await client.query('ALTER SEQUENCE "deal_id_seq" RESTART WITH 1');

        // Insert 100 fake properties
        const owner = ['lionel.bouzonville@forestadmin.com', 'louis@forestadmin.com', 'erlich.bachman@forestadmin.com'];
        const stageStatus = ['new', 'closed', 'rejected'];
        for (let i = 0; i < 100; i++) {
            const deal = {
                owner: faker.helpers.arrayElement(owner),
                customer_id: faker.helpers.arrayElement(customerIds),
                housing_id: faker.helpers.arrayElement(housingIds),
                stage: faker.helpers.arrayElement(stageStatus),
                created_at: faker.date.past({years: 1}),
                updated_at: faker.date.recent(),
            };

            const insertQuery = {
                text: 'INSERT INTO "deal" (owner, customer_id, housing_id, stage, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                values: Object.values(deal),
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
