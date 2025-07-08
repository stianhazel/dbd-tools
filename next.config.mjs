/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [new URL("https://deadbydaylight.wiki.gg/**"), new URL("https://static.wikia.nocookie.net/**")]
	}
};

export default nextConfig;
