(() => {
  const body = document.body;
  const themeButtons = document.querySelectorAll("[data-theme]");
  const rtlButtons = document.querySelectorAll("[data-rtl]");

  const sunIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  const eyeOpen = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  const eyeClosed = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

  const syncThemeIcons = () => {
    const isDark = body.classList.contains("dark-mode");
    themeButtons.forEach((btn) => {
      btn.innerHTML = isDark ? sunIcon : moonIcon;
      btn.setAttribute("aria-pressed", String(isDark));
      btn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    });
  };

  if (localStorage.getItem("gf-theme") === "dark") {
    body.classList.add("dark-mode");
  }
  syncThemeIcons();

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("gf-theme", body.classList.contains("dark-mode") ? "dark" : "light");
      syncThemeIcons();
    });
  });

  const savedDir = localStorage.getItem("gf-dir");
  if (savedDir) {
    document.documentElement.dir = savedDir;
  }

  rtlButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
      document.documentElement.dir = next;
      localStorage.setItem("gf-dir", next);
    });
  });

  // Hamburger Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("nav-open")) {
        mainNav.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        mainNav.classList.contains("nav-open") &&
        !mainNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        mainNav.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Password Visibility Eye Icon Toggle
  document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
    btn.innerHTML = eyeOpen;
    btn.addEventListener("click", () => {
      const wrap = btn.closest(".password-wrap");
      const input = wrap ? wrap.querySelector("input") : null;
      if (!input) return;
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      btn.innerHTML = showing ? eyeOpen : eyeClosed;
      btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
  });

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const toggleTopBtn = () => {
      backToTop.classList.toggle("visible", window.scrollY > 240);
    };
    window.addEventListener("scroll", toggleTopBtn, { passive: true });
    toggleTopBtn();
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Products Category Filter
  const filterPills = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll(".product-card[data-category]");
  if (filterPills.length && productCards.length) {
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const target = pill.dataset.filter;
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        productCards.forEach((card) => {
          const match = target === "all" || card.dataset.category === target;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }
})();
