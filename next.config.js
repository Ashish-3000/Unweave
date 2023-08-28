/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
};

// Merge MDX config with Next.js config
module.exports = {
  env: {
    PASSWORD: process.env.PASSWORD,
    API: process.env.API,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING: process.env.REACT_APP_MESSAGING,
    REACT_APP_APP_ID: process.env.REACT_APP_ID,
    REACT_APP_MEASUREMENT: process.env.REACT_APP_MEASUREMENT,
    REACT_APP_MAIL: process.env.REACT_APP_MAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    WEBSITE: process.env.WEBSITE,
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "icons8.com"],
  },
};
