(function () {
  const NO_COOKIE = "https://www.youtube-nocookie.com/embed/";

  function createIframe(videoId, title) {
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `${NO_COOKIE}${videoId}?rel=0&modestbranding=1`;
    iframe.title = title;
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    return iframe;
  }

  function activateLite(el) {
    if (el.dataset.activated === "true") return;
    el.dataset.activated = "true";
    const videoId = el.dataset.videoId;
    const title = el.dataset.videoTitle || "YouTube video";
    const thumb = el.querySelector(".yt-lite__thumb");
    const play = el.querySelector(".yt-lite__play");
    thumb?.remove();
    play?.remove();
    el.appendChild(createIframe(videoId, title));
    el.classList.add("yt-lite--active");
  }

  document.querySelectorAll(".yt-lite").forEach((el) => {
    const thumb = el.querySelector(".yt-lite__thumb");
    if (thumb && el.dataset.videoId) {
      thumb.src = `https://i.ytimg.com/vi/${el.dataset.videoId}/hqdefault.jpg`;
      thumb.alt = "";
    }

    el.addEventListener("click", () => activateLite(el));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateLite(el);
      }
    });
  });

  const liteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.autoload === "true") {
            activateLite(el);
            liteObserver.unobserve(el);
          }
        }
      });
    },
    { rootMargin: "200px" }
  );

  document.querySelectorAll('.yt-lite[data-autoload="true"]').forEach((el) => {
    liteObserver.observe(el);
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
