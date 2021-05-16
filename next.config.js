const withPWA = require("next-pwa")

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
  images: {
    deviceSizes: [400, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 48, 64, 72, 96, 128, 256],
  },
})
