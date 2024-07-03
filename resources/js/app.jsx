import './bootstrap';
import '../css/orders/basket.css';
import '../css/burger_menu.css';
import '../css/main.css';
import '../css/orders/orders.css';
import '../css/product/product_create_edit.css';
import '../css/product/product_index.css';
import '../css/product/product_show.css';
import '../css/project/project_task.css';
import '../css/media_screen.css';

import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
