const CACHE = "hana-cache-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./game.js",
  "./manifest.webmanifest",
  "./Gemini_Generated_Image_yefmyuyefmyuyefm.png",

  "./IMG_8331.png",
  "./IMG_8329.png",
  "./IMG_8330.png",
  "./IMG_8337.png",
  "./IMG_8338.png",
  "./IMG_8339.png",
  "./IMG_8340.png",
  "./IMG_8341.png",
  "./unnamed.png",

  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// 安裝 Service Worker：快取所有必要檔案
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 清除舊快取
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE) return caches.delete(k);
        })
      )
    )
  );
});

// 攔截請求：快取優先，沒有才從網路抓
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
