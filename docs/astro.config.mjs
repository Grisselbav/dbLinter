// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightImageZoom from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: "https://grisselbav.github.io/dbLinter",
	base: "/dbLinter",
	integrations: [
		starlight({
			title: "dbLinter",
			pagination: true,
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
					label: "Web GUI",
					autogenerate : { directory: "tools/web-gui" },
				},
				{
					label: "VS Code Extension",
					autogenerate : { directory: "tools/vscode" },
				},
				{
					label: "CLI",
					autogenerate : { directory: "tools/cli" },
				},
				{
					label: "SonarQub Plugin",
					autogenerate : { directory: "tools/sonarqube" },
				},
				{
					label: "Reference",
					autogenerate : { directory: "reference" },
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
		mermaid({
      	theme: 'forest',
      	autoTheme: true
    	})
	],
});
