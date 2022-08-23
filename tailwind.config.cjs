/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,svelte}"],
    theme: {
        extend: {},
        container: { center: true },
    },
    plugins: [require("@tailwindcss/forms")],
};
