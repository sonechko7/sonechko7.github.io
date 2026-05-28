(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var article = document.querySelector(".post-content");
    if (!article) return;

    // --- Open external links in the post body in a new tab ---
    var postBody = article.querySelector(".post-body");
    if (postBody) {
      postBody.querySelectorAll("a[href]").forEach(function (a) {
        if (a.hostname && a.hostname !== window.location.hostname) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
      });
    }

    // --- Collect image sources: gallery first, then inline body images ---
    var sources = [];
    var seen = {};
    var bodyImgsToRemove = [];

    function add(src, alt) {
      if (!src || seen[src]) return;
      seen[src] = true;
      sources.push({ src: src, alt: alt || "" });
    }

    var galleryBlock = article.querySelector("[data-post-gallery]");
    if (galleryBlock) {
      galleryBlock.querySelectorAll("img").forEach(function (img) {
        add(img.getAttribute("src"), img.getAttribute("alt"));
      });
    }

    var body = article.querySelector(".post-body");
    if (body) {
      body.querySelectorAll("img").forEach(function (img) {
        var src = img.getAttribute("src");
        if (!seen[src]) bodyImgsToRemove.push(img);
        add(src, img.getAttribute("alt"));
      });
    }

    if (sources.length === 0) return;

    // --- Remove originals so images don't appear twice ---
    if (galleryBlock) galleryBlock.remove();
    bodyImgsToRemove.forEach(function (img) {
      var p = img.closest("p");
      img.remove();
      if (p && p.children.length === 0 && p.textContent.trim() === "") p.remove();
    });

    var multiple = sources.length > 1;

    // --- Build slider DOM ---
    var slider = document.createElement("div");
    slider.className = "post-gallery-slider";

    var viewport = document.createElement("div");
    viewport.className = "pg-viewport";

    var track = document.createElement("div");
    track.className = "pg-track";

    sources.forEach(function (s, i) {
      var slide = document.createElement("div");
      slide.className = "pg-slide";
      var img = document.createElement("img");
      img.src = s.src;
      img.alt = s.alt;
      img.loading = i === 0 ? "eager" : "lazy";
      slide.appendChild(img);
      track.appendChild(slide);
    });

    viewport.appendChild(track);
    slider.appendChild(viewport);

    var prevBtn, nextBtn, counter, dotsWrap, dots = [];

    if (multiple) {
      prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "pg-btn pg-prev";
      prevBtn.setAttribute("aria-label", "Попереднє фото");
      prevBtn.innerHTML = "&#8249;";

      nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = "pg-btn pg-next";
      nextBtn.setAttribute("aria-label", "Наступне фото");
      nextBtn.innerHTML = "&#8250;";

      counter = document.createElement("div");
      counter.className = "pg-counter";

      viewport.appendChild(prevBtn);
      viewport.appendChild(nextBtn);
      viewport.appendChild(counter);

      dotsWrap = document.createElement("div");
      dotsWrap.className = "pg-dots";
      sources.forEach(function (s, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "pg-dot";
        dot.setAttribute("aria-label", "Фото " + (i + 1));
        dot.addEventListener("click", function () {
          goTo(i);
        });
        dots.push(dot);
        dotsWrap.appendChild(dot);
      });
      slider.appendChild(dotsWrap);
    }

    article.insertBefore(slider, article.firstChild);

    // --- Slider state ---
    var current = 0;

    function render() {
      track.style.transform = "translateX(" + -current * 100 + "%)";
      if (multiple) {
        counter.textContent = current + 1 + " / " + sources.length;
        dots.forEach(function (d, i) {
          d.classList.toggle("is-active", i === current);
        });
      }
    }

    function goTo(i) {
      current = (i + sources.length) % sources.length;
      render();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (multiple) {
      nextBtn.addEventListener("click", next);
      prevBtn.addEventListener("click", prev);
    }

    render();

    // --- Lightbox ---
    var lb = document.createElement("div");
    lb.className = "pg-lightbox";
    lb.innerHTML =
      '<button type="button" class="pg-lightbox-close" aria-label="Закрити">&times;</button>' +
      '<button type="button" class="pg-lightbox-prev" aria-label="Попереднє фото">&#8249;</button>' +
      '<img class="pg-lightbox-img" alt="">' +
      '<button type="button" class="pg-lightbox-next" aria-label="Наступне фото">&#8250;</button>' +
      '<div class="pg-lightbox-counter"></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector(".pg-lightbox-img");
    var lbClose = lb.querySelector(".pg-lightbox-close");
    var lbPrev = lb.querySelector(".pg-lightbox-prev");
    var lbNext = lb.querySelector(".pg-lightbox-next");
    var lbCounter = lb.querySelector(".pg-lightbox-counter");

    function lbRender() {
      lbImg.src = sources[current].src;
      lbImg.alt = sources[current].alt;
      lbCounter.textContent = current + 1 + " / " + sources.length;
    }

    function openLightbox() {
      lbRender();
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    if (!multiple) {
      lbPrev.style.display = "none";
      lbNext.style.display = "none";
      lbCounter.style.display = "none";
    }

    track.addEventListener("click", openLightbox);
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { prev(); lbRender(); });
    lbNext.addEventListener("click", function () { next(); lbRender(); });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });

    // --- Keyboard ---
    document.addEventListener("keydown", function (e) {
      if (lb.classList.contains("is-open")) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowRight" && multiple) { next(); lbRender(); }
        else if (e.key === "ArrowLeft" && multiple) { prev(); lbRender(); }
      } else if (multiple) {
        if (e.key === "ArrowRight") next();
        else if (e.key === "ArrowLeft") prev();
      }
    });

    // --- Touch swipe ---
    function addSwipe(el, onLeft, onRight) {
      var startX = null;
      el.addEventListener("touchstart", function (e) {
        startX = e.changedTouches[0].clientX;
      }, { passive: true });
      el.addEventListener("touchend", function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
          if (dx < 0) onLeft();
          else onRight();
        }
        startX = null;
      });
    }

    if (multiple) {
      addSwipe(viewport, next, prev);
      addSwipe(lb, function () { next(); lbRender(); }, function () { prev(); lbRender(); });
    }
  });
})();
