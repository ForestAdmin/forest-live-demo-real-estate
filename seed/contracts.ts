import { pool } from './database';
import { faker } from '@faker-js/faker';
import { QueryResult } from 'pg';

/**
 * Populate property
 * @param dealIds
 * @returns Promise<string[]>
 */
export async function populateContracts(dealIds: Array<string>): Promise<string[]> {
    const client = await pool.connect();

    try {
        const ids: string[] = [];

        // Delete existing data from contract table
        await client.query('DELETE FROM "contract"');

        // Reset the auto-increment counter
        await client.query('ALTER SEQUENCE "contract_id_seq" RESTART WITH 1');

        // Insert 50 fake properties
        for (let i = 0; i < 50; i++) {
            const contract = {
                deal_id: faker.helpers.arrayElement(dealIds),
                commission_rate: faker.number.float({ min: 0.02, max: 0.30, precision: 0.05 }),
                start_at: faker.date.past({years: 1}),
                end_at: null,
                created_at: faker.date.past({years: 1}),
                updated_at: faker.date.recent(),
            };

            const insertQuery = {
                text: 'INSERT INTO "contract" (deal_id, commission_rate, start_at, end_at, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                values: Object.values(contract),
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
