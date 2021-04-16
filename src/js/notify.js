import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, success, error } from'@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.delay = 4000;


export default {
    error() {
        error({
            title: 'Error!',
            text: 'Something went wrong.'
        });
    },

    success(images) {
        success({
            title: 'Success!',
            text: `${images.length} images was loaded.`,
            delay: 1000,
        });
    },

    notice() {
        notice({
            text: 'Please enter more specified query.',
        });
    },

    alert(){
        alert({
            title: 'Gallery was cleared!',
            text: 'Please enter query.',
        });
    }
}