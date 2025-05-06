'use strict';

import { v4 as uuidv4 } from 'uuid';

function generateID() {
    return uuidv4()
}

export { generateID };