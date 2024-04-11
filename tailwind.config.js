/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                retina: '4096px',
            },
            height: {
                192: '48rem',
            },
        },
    },
    plugins: [],
};
