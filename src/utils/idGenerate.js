'use strict';

import {v4 as uuidv4 } from 'uuid';

function generate() {
    return uuidv4()
}

export default {generate};