'use strict';

import fs from 'fs';
import { join } from 'path';

async function ObtainSeedData() {
    try {
        const filePath = join(process.cwd(), 'src', 'tests', 'seed', 'data_users.json');
        console.log('\n---------------------\n', filePath, '\n-------------------\n\n');
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (error) {
        throw new Error('Error reading seed data: ' + error.message);
    }
}

export default ObtainSeedData;