'use strict';

import fs from 'fs';
import { join } from 'path';

/**
 * Reads and parses seed data from a JSON file asynchronously.
 *
 * This function locates the `data_users.json` file in the `src/tests/seed` directory,
 * reads its contents, and parses it into a JavaScript object. It is primarily used
 * for loading test data in the application.
 *
 * @async
 * @function ObtainSeedData
 * @returns {Promise<Object[]>} Resolves with an array of user data objects parsed from the JSON file.
 * @throws {Error} If the file cannot be read or the JSON is invalid, an error is thrown.
 *
 * @example
 * ObtainSeedData()
 *   .then(data => console.log(data))
 *   .catch(error => console.error('Failed to load seed data:', error));
 */
async function ObtainSeedData() {
    try {
        const filePath = join(process.cwd(), 'src', 'tests', 'seed', 'data_users.json');
        console.log('\n---------------------\n', filePath, '\n-------------------\n\n');
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const parsedData = JSON.parse(data);

        return parsedData.users;
    } catch (error) {
        throw new Error('Error reading seed data: ' + error.message);
    }
}

export default ObtainSeedData;