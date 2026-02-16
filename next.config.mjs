const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chats/new",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
