import { populateCustomers } from './customers';
import { populateHousing } from './housing';
import { populateDeals } from './deals';
import { populateContracts } from './contracts';

import { pool } from './database';

(async () => {
  try {
    process.stdout.write('Starting populate the database...');

    const customerIds = await populateCustomers();
    process.stdout.write('.');
    const housingIds = await populateHousing();
    process.stdout.write('.');
    const dealsIds = await populateDeals(customerIds, housingIds);
    process.stdout.write('.');
    const contractIds = await populateContracts(dealsIds);
    process.stdout.write('.');

    console.log(' the database has been populated ! 👏');
  } catch (err) {
    console.error('Error while populating the database:', err);
  } finally {
    await pool.end();
  }
})();
