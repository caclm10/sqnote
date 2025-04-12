import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import nodePath from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon-180x180.png",
				"maskable-icon-512x512.png",
			],
			manifest: {
				name: "SQNote",
				short_name: "SQNote",
				description:
					"SQNote — Lightweight and intuitive app for quick notes, ideas, and to-do lists. Keep your thoughts organized on the go.",
				theme_color: "#18181b",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": nodePath.resolve(__dirname, "src"),
		},
	},
});
