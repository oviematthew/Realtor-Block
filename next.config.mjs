/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://ewpqgfenjvvgnhlqueha.supabase.co/**")],
  },
};

export default nextConfig;
