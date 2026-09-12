/* ==========================================================================
   ICATI Jatim — main.js
   Header, menu seluler, pencarian, animasi scroll, paralaks
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------
     Header: memadat saat scroll
     ------------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-compact", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Menu seluler
     ------------------------------------------------------------------ */
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("#mobile-menu");
  const menuClose = document.querySelector("[data-menu-close]");
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  const setMenu = (open) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      const first = mobileMenu.querySelector("a, button");
      if (first) first.focus();
    } else if (menuToggle) {
      menuToggle.focus();
    }
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () =>
      setMenu(!mobileMenu.classList.contains("is-open"))
    );
    if (menuClose) menuClose.addEventListener("click", () => setMenu(false));
    menuLinks.forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );
  }

  /* ------------------------------------------------------------------
     Pencarian
     ------------------------------------------------------------------ */
  const searchBtn = document.querySelector("[data-search-open]");
  const searchOverlay = document.querySelector("#search-overlay");
  const searchClose = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");

  // Indeks halaman sederhana (Bahasa Indonesia)
  const searchIndex = [
    {
      href: "index.html",
      title: "Beranda",
      desc: "Halaman utama ICATI Jatim — perkenalan, program, dan jalur menuju pendaftaran.",
      keys: "beranda home utama ikati selamat datang",
    },
    {
      href: "tentang.html",
      title: "Tentang ICATI Jatim",
      desc: "Siapa kami, visi & tujuan, apa yang kami lakukan, serta mengapa Taiwan.",
      keys: "tentang tentang icati siapa kami visi tujuan verifikasi dokumen overseas chinese",
    },
    {
      href: "pendaftaran.html",
      title: "Info Pendaftaran",
      desc: "Informasi jalur pendaftaran: Beasiswa dan Kuliah — persyaratan, dokumen, dan jadwal universitas.",
      keys: "pendaftaran info jalur beasiswa kuliah universitas program persyaratan dokumen jadwal top",
    },
    {
      href: "poster.html",
      title: "Galeri Poster & Panduan",
      desc: "Galeri poster ICATI Jatim, panduan komprehensif perguruan tinggi Taiwan, dan brosur universitas.",
      keys: "galeri poster informasi gambar universitas beasiswa panduan pdf dokumen brosur jadwal",
    },
  ];

  const renderResults = (query) => {
    if (!searchResults || !searchInput) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML =
        '<p class="search-overlay__empty">Ketik kata kunci untuk mencari halaman, misalnya “beasiswa” atau “tentang”.</p>';
      return;
    }
    const matches = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.keys.includes(q)
    );
    if (matches.length === 0) {
      searchResults.innerHTML =
        '<p class="search-overlay__empty">Tidak ditemukan hasil untuk “' +
        escapeHtml(query) +
        '”. Coba kata kunci lain.</p>';
      return;
    }
    searchResults.innerHTML = matches
      .map(
        (m) =>
          '<a class="search-result" href="' +
          m.href +
          '"><span class="search-result__title">' +
          m.title +
          '</span><span class="search-result__desc">' +
          m.desc +
          "</span></a>"
      )
      .join("");
  };

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  const setSearch = (open) => {
    if (!searchOverlay) return;
    searchOverlay.classList.toggle("is-open", open);
    searchOverlay.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      if (searchInput) {
        searchInput.value = "";
        renderResults("");
        setTimeout(() => searchInput.focus(), 120);
      }
    } else if (searchBtn) {
      searchBtn.focus();
    }
  };

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener("click", () => setSearch(true));
    if (searchClose) searchClose.addEventListener("click", () => setSearch(false));
    if (searchInput)
      searchInput.addEventListener("input", (e) => renderResults(e.target.value));
  }

  /* ------------------------------------------------------------------
     Tutup overlay dengan tombol Esc + fokus terperangkap di dalamnya
     ------------------------------------------------------------------ */
  const trapFocus = (container, e) => {
    const focusables = container.querySelectorAll(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenu(false);
      setSearch(false);
    }
    if (e.key === "Tab") {
      if (mobileMenu && mobileMenu.classList.contains("is-open")) {
        trapFocus(mobileMenu, e);
      } else if (searchOverlay && searchOverlay.classList.contains("is-open")) {
        trapFocus(searchOverlay, e);
      }
    }
  });

  /* ------------------------------------------------------------------
     Animasi muncul saat scroll (IntersectionObserver)
     ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ------------------------------------------------------------------
     Paralaks halus pada gunung (hero)
     ------------------------------------------------------------------ */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReducedMotion) {
    let ticking = false;
    const applyParallax = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.12");
        const rect = el.parentElement.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2) - window.innerHeight / 2;
        el.style.transform =
          "translateY(" + Math.max(-60, Math.min(60, y * speed - offset * 0.02)) + "px)";
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Galeri poster & lightbox (poster.html)
     ------------------------------------------------------------------ */
  const posterGrid = document.querySelector("[data-poster-grid]");
  const lightbox = document.querySelector(".lightbox");

  if (posterGrid && window.ICATI_POSTERS) {
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const sorted = [...window.ICATI_POSTERS].sort((a, b) => {
      const da = a.match(/(\d{4}-\d{2}-\d{2})/);
      const db = b.match(/(\d{4}-\d{2}-\d{2})/);
      return (db ? db[1] : "").localeCompare(da ? da[1] : "");
    });

    posterGrid.innerHTML = sorted
      .map((src) => {
        const m = src.match(/(\d{4})-(\d{2})-(\d{2})/);
        const date = m
          ? parseInt(m[3], 10) + " " + bulan[parseInt(m[2], 10) - 1] + " " + m[1]
          : "Poster ICATI Jatim";
        return (
          '<a class="gallery__item" href="' +
          src +
          '" data-lightbox-item role="listitem" aria-label="Poster ICATI Jatim — ' +
          date +
          '"><img src="' +
          src +
          '" alt="Poster ICATI Jatim — ' +
          date +
          '" loading="lazy"><span class="gallery__cap">' +
          date +
          "</span></a>"
        );
      })
      .join("");

    const items = posterGrid.querySelectorAll("[data-lightbox-item]");
    const lbImg = lightbox ? lightbox.querySelector(".lightbox__img") : null;
    const lbCounter = lightbox ? lightbox.querySelector(".lightbox__counter") : null;
    const lbDownload = lightbox ? lightbox.querySelector(".lightbox__download") : null;
    let current = 0;

    const openLightbox = (i) => {
      if (items.length === 0) return;
      current = (i + items.length) % items.length;
      const src = items[current].getAttribute("href");
      if (lbImg) lbImg.src = src;
      if (lbDownload) lbDownload.href = src;
      if (lbCounter) lbCounter.textContent = current + 1 + " / " + items.length;
      if (lightbox) {
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
      }
      document.body.style.overflow = "hidden";
      const closeBtn = lightbox ? lightbox.querySelector("[data-lightbox-close]") : null;
      if (closeBtn) closeBtn.focus();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    posterGrid.addEventListener("click", (e) => {
      const a = e.target.closest("[data-lightbox-item]");
      if (a) {
        e.preventDefault();
        openLightbox([...items].indexOf(a));
      }
    });

    const lbClose = lightbox ? lightbox.querySelector("[data-lightbox-close]") : null;
    const lbPrev = lightbox ? lightbox.querySelector("[data-lightbox-prev]") : null;
    const lbNext = lightbox ? lightbox.querySelector("[data-lightbox-next]") : null;
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", () => openLightbox(current - 1));
    if (lbNext) lbNext.addEventListener("click", () => openLightbox(current + 1));
    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      });
      lightbox.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") openLightbox(current - 1);
        if (e.key === "ArrowRight") openLightbox(current + 1);
      });
    }
  }

  /* ------------------------------------------------------------------
     Discipleship: karosel mahasiswa & pencarian nama
     ------------------------------------------------------------------ */
  const discipleSearch = document.querySelector("[data-disciple-search]");

  const initCarousels = () => {
    document.querySelectorAll(".students-grid").forEach((grid) => {
      if (grid.dataset.icatiCarousel) return;
      grid.dataset.icatiCarousel = "1";

      const students = Array.from(grid.children);
      // bersihkan baris catatan opsional yang masih placeholder
      students.forEach((s) => {
        s.querySelectorAll(".student__note").forEach((n) => n.remove());
      });

      const carousel = document.createElement("div");
      carousel.className = "carousel";
      const viewport = document.createElement("div");
      viewport.className = "carousel__viewport";
      const track = document.createElement("div");
      track.className = "carousel__track";
      students.forEach((s) => {
        s.classList.add("carousel__slide");
        track.appendChild(s);
      });
      viewport.appendChild(track);

      const makeBtn = (dir, label) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "carousel__btn carousel__btn--" + dir;
        b.setAttribute("aria-label", label);
        b.innerHTML =
          dir === "prev"
            ? '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'
            : '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
        return b;
      };
      const prev = makeBtn("prev", "Mahasiswa sebelumnya");
      const next = makeBtn("next", "Mahasiswa berikutnya");
      const dots = document.createElement("div");
      dots.className = "carousel__dots";

      const dotEls = students.map((_, i) => {
        const d = document.createElement("button");
        d.type = "button";
        d.className = "carousel__dot";
        d.setAttribute("aria-label", "Mahasiswa ke-" + (i + 1));
        if (i === 0) d.classList.add("is-active");
        d.addEventListener("click", () =>
          viewport.scrollTo({ left: viewport.clientWidth * i, behavior: "smooth" })
        );
        dots.appendChild(d);
        return d;
      });

      const sync = () => {
        const width = viewport.clientWidth || 1;
        const index = Math.max(0, Math.round(viewport.scrollLeft / width));
        prev.disabled = viewport.scrollLeft <= 4;
        next.disabled = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 4;
        dotEls.forEach((d, i) => d.classList.toggle("is-active", i === index));
      };
      viewport.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);

      prev.addEventListener("click", () =>
        viewport.scrollBy({ left: -viewport.clientWidth, behavior: "smooth" })
      );
      next.addEventListener("click", () =>
        viewport.scrollBy({ left: viewport.clientWidth, behavior: "smooth" })
      );

      carousel.appendChild(prev);
      carousel.appendChild(viewport);
      carousel.appendChild(next);
      carousel.appendChild(dots);
      grid.replaceWith(carousel);

      carousel._students = students;
      carousel._viewport = viewport;
      carousel._dots = dots;
      sync();
    });
  };
  initCarousels();

  if (discipleSearch) {
    discipleSearch.addEventListener("input", () => {
      const q = discipleSearch.value.trim().toLowerCase();
      document.querySelectorAll(".timeline-year").forEach((year) => {
        const carousel = year.querySelector(".carousel");
        if (!carousel || !carousel._students) return;
        let anyVisible = false;
        carousel._students.forEach((s) => {
          const name = (s.querySelector(".student__name")?.textContent || "").toLowerCase();
          const meta = (s.querySelector(".student__meta")?.textContent || "").toLowerCase();
          const match = !q || name.includes(q) || meta.includes(q);
          s.style.display = match ? "" : "none";
          if (match) anyVisible = true;
        });
        year.style.display = anyVisible ? "" : "none";
        if (anyVisible) {
          carousel._viewport.scrollTo({ left: 0 });
        }
        if (carousel._dots) carousel._dots.style.display = q ? "none" : "";
      });
    });
  }

  /* ------------------------------------------------------------------
     Tautan navigasi aktif berdasarkan halaman
     ------------------------------------------------------------------ */
  const pageId = document.body.dataset.page;
  if (pageId) {
    document
      .querySelectorAll('.nav-link[data-page="' + pageId + '"]')
      .forEach((el) => el.classList.add("is-active"));
  }

  /* ------------------------------------------------------------------
     Tahun otomatis di footer
     ------------------------------------------------------------------ */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
