import type { NextConfig } from "next";

// Export estático para GitHub Pages. Con dominio propio (digital.kyriosgrid.cl)
// NO se necesita basePath. Si algún día lo sirves desde
// willdiazram.github.io/<repo>, agrega basePath: "/<repo>".
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
