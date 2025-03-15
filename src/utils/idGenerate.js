'use strict';

function generate() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const complement = Math.floor(Math.random() * 10);
    
    let id = `${timestamp}${random}`;
    while(id.length < 16) {
        id = id + complement;
    }

    return parseInt(id);
}

export default {generate};