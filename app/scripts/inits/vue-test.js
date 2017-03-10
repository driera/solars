'use strict';

const Vue = require('vue/dist/vue.js');

function vueTest() {
    
    let message = 'Hello world'

    new Vue({
        el: '#root',
        data: {
            message: message
        }
    })
}

export default vueTest;
