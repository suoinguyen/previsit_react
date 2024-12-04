/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        "./node_modules/flowbite/**/*.js",
        "./src/**/*.{html,js}"
    ],
    theme: {
        extend: {
            colors: {
                'white': '#FFF',
                'black': '#15151D',
                'green': '#00B805',
                'darkgreen': '#008E04',
                'purple': '#6A67E2',
                'pink': '#F15484',
                'bluewhite': '#78CDEE',

                'grey': '#8A8D94',
                'greywhite': '#E8E9EB',
                'greydark': '#343538',
                'blue': '#36AFE2',

                'appyellow': '#EBEB41',
                'primary': '#03254C',
                'secondary': '#EFF7FF',
                // 'tertiary': '#12A170',#015941
                'tertiary': '#015941',
                'footergreen': '#0C1E1B',
                'pricinggreen': '#0C1E1B',
                'blue': '#125D99',
                'pricingblue': '#43b1ca'
            },
            fontFamily: {
                'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            scale: {
                '130': '1.3',
            }
        },

        screens: {
            xs: '375px',
            ...defaultTheme.screens,
        },
    },
    plugins: [
        require('flowbite/plugin'),
        plugin(function ({ matchUtilities, theme, addUtilities, addVariant}) {
            matchUtilities(
                {
                    'gfrom-pos': (value) => ({
                        '--gradient-radial-from-position': value
                    }),
                    'gto-pos': (value) => ({
                        '--gradient-radial-to-position': value
                    }),
                    'gmiddle-pos': (value) => ({
                        '--gradient-radial-middle-position': value
                    }),

                    'gfrom': (value) => ({
                        '--gradient-radial-from': value
                    }),
                    'gto': (value) => ({
                        '--gradient-radial-to': value
                    }),
                    'gmiddle': (value) => ({
                        '--gradient-radial-middle': value
                    }),
                }
            ),

            addUtilities(
                {
                    '.bg-gradient-radial': {
                        'background-image': 'radial-gradient(50% 50% at 50% 50%, var(--gradient-radial-from) var(--gradient-radial-from-position), var(--gradient-radial-to) var(--gradient-radial-to-position))'
                    },

                    '.bg-gradient-3-radial': {
                        'background-image': 'radial-gradient(50% 50% at 50% 50%, var(--gradient-radial-from) var(--gradient-radial-from-position), var(--gradient-radial-middle) var(--gradient-radial-middle-position), var(--gradient-radial-to) var(--gradient-radial-to-position))'
                    }
                }
            ),

            // '.active&' => Used for self
            // '.active &' => Used for child
            addVariant('active', ['.active&', '.active &']),
            addVariant('active-menu', ['.active-menu&', '.active-menu &'])
        })
    ],
}