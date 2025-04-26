// src/plugins/vuetify.js

import { createVuetify } from '../plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'; // icon font
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { BLUE_THEME } from '@/theme/LightTheme';

const vuetify = createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'BLUE_THEME',
        themes: {
            BLUE_THEME,
        }
    },

    defaults: {
        VCard: {
            rounded: 'xl'
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VListItem: {
            minHeight: '45px'
        },
        VTooltip: {
            location: 'top'
        }
    }
});

export default vuetify;
