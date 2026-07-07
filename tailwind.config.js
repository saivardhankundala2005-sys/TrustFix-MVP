/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trustPrimary: '#2F7C8C',
        trustSecondary: '#00A896',
        trustAccent: '#02C39A',
        trustBackground: '#FFFFFF',
        trustCardBg: '#EAF6F5',
        trustText: '#1A1A1A',
        trustMuted: '#6B7280',
        trustError: '#D64550',
      },
      borderRadius: {
        'card': '12px',
        'btn': '10px',
        'input': '8px',
      }
    },
  },
  plugins: [],
}
