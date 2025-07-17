/* eslint-disable @typescript-eslint/no-require-imports */

import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		animation: {
			rotate: 'rotate 10s linear infinite',
			border:'border 4s linear infinite',
			move: "move 5s linear infinite",
			shimmer: "shimmer 2s linear infinite"
		  },
		  keyframes: {
			border: {
                    to: { '--border-angle': '360deg' },
                },
			rotate: {
			  '0%': { transform: 'rotate(0deg) scale(10)' },
			  '100%': { transform: 'rotate(-360deg) scale(10)' },
			},
			move: {
				"0%": { transform: "translateX(-200px)" },
				"100%": { transform: "translateX(200px)" },
			  },
			  shimmer: {
				from: {
				  "backgroundPosition": "0 0"
				},
				to: {
				  "backgroundPosition": "-200% 0"
				}
			  }
		  },
		fontFamily:{
			heading:['Poppins']
		},
  		colors: {
			"background-black":"#08090A",
			"nav-default":"#CDCDCD",
			"nav-background":"#090A0A",
			"login-background":"#28282C",
			"appbar-border":"#1D1D1D",
			"logo-color-green":"#16B26A",
			"searchBar-border":"#16B26A",
			"searchBar-background":"#F3F4F6",
			"createProfile-background":"#F7FAFC",
			"light-black":"#27272A",
			"tabs-black":"#09090B",
			"nav-border":"hsl(240 3.7% 15.9%)",
			"nav-blendColor":"rgba(40,40,40,0.70)",
			"formPurple":"#2A2A3B",
			"formBlack":"#1C2126",
			"formLight":"#2E2E41",
			"formCard":"#1B2532",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
