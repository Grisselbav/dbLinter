// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
	site: "https://grisselbav.github.io/dbLinter",
	base: "/dbLinter",
	integrations: [
		starlight({
			title: "dbLinter",
			logo: {
				src: "./src/assets/logo/dbLinter-icon-color.svg",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/Grisselbav/dbLinter",
				},
			],
			sidebar: [
				{
					label: "Home",
					link: "/",
				},
				{
					label: "Getting Started",
					autogenerate : { directory: "getting-started" },
				},
				{
					label: "Tools",
					autogenerate : { directory: "tools" },
				}
			],
			customCss: ["./src/styles/uc.css"],
			components: {
				Footer: "./src/components/Footer.astro",
			},
			plugins: [
				starlightLinksValidator({ errorOnLocalLinks: false }),
				starlightImageZoom(),
			],
		}),
	],
});
