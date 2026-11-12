(function () {
  const NO_COOKIE = "https://www.youtube-nocookie.com/embed/";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // YouTube thumbnails: try the sharp 16:9 one, fall back to the small 16:9 one.
  function setThumb(img, videoId) {
    const small = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    img.addEventListener("error", function onError() {
      img.removeEventListener("error", onError);
      img.src = small;
    });
    img.addEventListener("load", function onLoad() {
      // YouTube serves a tiny grey placeholder when a size is missing.
      if (img.naturalWidth <= 120 && img.src !== small) img.src = small;
    });
    img.src = `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
  }

  function createIframe(videoId, title) {
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `${NO_COOKIE}${videoId}?rel=0&modestbranding=1&autoplay=1`;
    iframe.title = title;
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
    el.querySelector(".yt-lite__thumb")?.remove();
    el.querySelector(".yt-lite__play")?.remove();
    el.appendChild(createIframe(videoId, title));
    el.classList.add("yt-lite--active");
  }

  document.querySelectorAll(".yt-lite").forEach((el) => {
    const thumb = el.querySelector(".yt-lite__thumb");
    if (thumb && el.dataset.videoId) setThumb(thumb, el.dataset.videoId);
    el.addEventListener("click", () => activateLite(el));
  });

  document.querySelectorAll("img[data-thumb]").forEach((img) => setThumb(img, img.dataset.thumb));

  // Marquees: duplicate the track once so the -50% loop is seamless.
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    Array.from(track.children).forEach((child) => {
      const clone = child.cloneNode(true);
      if (clone.dataset && clone.dataset.thumb) setThumb(clone, clone.dataset.thumb);
      track.appendChild(clone);
    });
  });

  // Googly eyes: pupils follow the pointer.
  const eyes = Array.from(document.querySelectorAll(".eye"));
  if (eyes.length && !reduceMotion) {
    let queued = false;
    window.addEventListener("pointermove", (e) => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        eyes.forEach((eye) => {
          const r = eye.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const angle = Math.atan2(dy, dx);
          const reach = Math.min(1, Math.hypot(dx, dy) / 160) * r.width * 0.22;
          const pupil = eye.firstElementChild;
          pupil.style.setProperty("--px", `${Math.cos(angle) * reach}px`);
          pupil.style.setProperty("--py", `${Math.sin(angle) * reach}px`);
        });
      });
    });
  }

  // Cursor spotlight on cards.
  document.querySelectorAll(".spot").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  // Scroll reveal, staggered within each row.
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            entry.target.style.setProperty("--delay", `${i * 80}ms`);
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
