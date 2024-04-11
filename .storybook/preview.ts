import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'fullscreen',
        viewport: {
            viewports: {
                mobile1: {
                    name: 'Mobile 1',
                    styles: {
                        height: '640px',
                        width: '360px',
                    },
                },
                mobile2: {
                    name: 'Mobile 2',
                    styles: {
                        height: '800px',
                        width: '480px',
                    },
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        height: '1024px',
                        width: '768px',
                    },
                },
                desktop: {
                    name: 'Desktop',
                    styles: {
                        height: '1080px',
                        width: '1920px',
                    },
                },
                retina4k: {
                    name: 'Retina 4K',
                    styles: {
                        height: '4096px',
                        width: '2304px',
                    },
                },
            },
        },
    },
};

export default preview;
