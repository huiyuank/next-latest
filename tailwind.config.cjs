module.exports = {
    content: [
        "./src/app/**/*.{ts,tsx,js,jsx}",
        "./src/components/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0f172a",
                accent: "#0369a1",
                muted: "#64748b",
                surface: "#f8fafc",
            },
            container: {
                center: true,
                padding: "1rem",
            },
        },
    },
    plugins: [],
};
