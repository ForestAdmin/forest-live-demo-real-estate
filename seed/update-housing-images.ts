import { pool } from './database';
import getRandomPicture from "./images";

(async () => {
  const client = await pool.connect();

  const results = await client.query('SELECT id FROM housing;');

  await Promise.all(results.rows.map((house) => {
    return client.query(`UPDATE housing SET picture = '${getRandomPicture()}' WHERE id = ${house.id};`);
  }))

  return;
})();