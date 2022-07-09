/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			transitionTimingFunction: {
				"out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
				"out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
			},
		},
	},
	plugins: [],
};
