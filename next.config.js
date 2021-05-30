const withPWA = require("next-pwa")
const util = require("util")
const defaultRuntimeCache = require("next-pwa/cache")

// Remove next-image max entries
for (const entry of defaultRuntimeCache) {
  if (entry.options.cacheName === "next-image") {
    delete entry.options.expiration.maxEntries
  }
}

if (process.env.NODE_ENV === "production") {
  console.log(
    `Using pwa runtimeCaching rules:\n${util.inspect(defaultRuntimeCache, false, 5)}`,
  )
}

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    publicExcludes: ["!static/**/*"],
    runtimeCaching: defaultRuntimeCache,
  },
  images: {
    deviceSizes: [400, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 48, 64, 72, 96, 128, 256],
  },
})
