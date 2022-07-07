const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            minHeight: {
                '36': '144px'
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "e-orange": {
                    "10": "#FFD5AD",
                    "20": "#FD8B21",
                    "30": "#F27602",
                },
                "e-green": {
                    "09": "#9EDBD4",
                    "10": "#91CAC3",
                    "11": "#72a69f",
                    "20": "#008E82",
                    "30": "#00665F",
                    "31": "#004d47",
                },
                "e-blue": {
                    "10": "#CADEF8",
                    "20": "#5C90EB",
                    "30": "#315BE7",
                },
                "e-gray": {
                    "10": "#C7CBD1",
                    "20": "#555E6D",
                    "29": "#314345",
                    "30": "#30333c",
                },
            },
            transitionProperty: {
                'width': 'width'
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ['disabled'],
            cursor: ['disabled']
        },
    },
    plugins: [],
}