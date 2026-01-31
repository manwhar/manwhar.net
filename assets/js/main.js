/*
  main.js
  - Mobile nav toggle
  - Active nav link highlighting
  - Optional: Copy email button with toast
*/

(function () {
  "use strict";

  const selectors = {
    header: "[data-site-header]",
    navToggle: "[data-nav-toggle]",
    navMenu: "[data-nav-menu]",
    toastRegion: "[data-toast-region]",
    copyEmailBtn: "[data-copy-email]"
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function normalizePath(pathname) {
    if (!pathname) return "/";

    // Normalize Windows-style local file paths if any get through (rare).
    const cleaned = pathname.replace(/\\/g, "/");

    // If opened as file:///C:/.../index.html, pathname may include full folders.
    // We match by filename or known folder segments.
    return cleaned.toLowerCase();
  }

  function setActiveNav() {
    const path = normalizePath(window.location.pathname);
    const href = (value) => (value || "").toLowerCase();

    const navLinks = $all("a[data-nav]", document);
    navLinks.forEach((a) => a.removeAttribute("aria-current"));

    // Match heuristics for local file opening and GitHub Pages
    navLinks.forEach((a) => {
      const target = href(a.getAttribute("href"));

      // Don't set current for external links.
      if (/^https?:\/\//.test(target) || /^mailto:/.test(target)) return;

      // Home
      if ((path.endsWith("/index.html") || path.endsWith("/")) && (target === "index.html" || target === "./index.html" || target.endsWith("index.html"))) {
        if (target.includes("index.html")) a.setAttribute("aria-current", "page");
      }

      // Projects
      if (path.includes("projects.html") && target.includes("projects.html")) {
        a.setAttribute("aria-current", "page");
      }

      // Project detail pages
      if (path.includes("/projects/") && target.includes("projects.html")) {
        // Keep Projects highlighted when inside /projects/
        a.setAttribute("aria-current", "page");
      }

      // Demo pages
      if (path.includes("/demos/") && (target.includes("#demos") || target.includes("demos"))) {
        a.setAttribute("aria-current", "page");
      }

      // 404
      if (path.endsWith("/404.html") && target.includes("index.html")) {
        // No highlight or Home is fine; leave as-is.
      }
    });
  }

  function setupMobileNav() {
    const header = $(selectors.header);
    const toggle = $(selectors.navToggle);
    const menu = $(selectors.navMenu);

    if (!header || !toggle || !menu) return;

    function setOpen(isOpen) {
      header.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));

      if (isOpen) {
        // Move focus to first link for keyboard users.
        const firstLink = menu.querySelector("a, button");
        if (firstLink) firstLink.focus();
      } else {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", () => {
      const open = header.classList.contains("nav-open");
      setOpen(!open);
    });

    // Close after selecting a link (mobile)
    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.matches("a")) {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!header.classList.contains("nav-open")) return;
      setOpen(false);
    });
  }

  function toast(message) {
    const region = $(selectors.toastRegion);
    if (!region) return;

    region.textContent = message;
    region.classList.add("toast", "show");

    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => {
      region.classList.remove("show");
      // keep toast base class for styling; leave content
    }, 1800);
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {
      // fall back below
    }

    // Fallback for older browsers
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();

    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }

    document.body.removeChild(temp);
    return ok;
  }

  function setupCopyEmail() {
    const btn = $(selectors.copyEmailBtn);
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-email") || "mjhawar@ucsc.edu";
      const ok = await copyToClipboard(email);
      toast(ok ? "Email copied to clipboard" : "Could not copy email (select and copy manually)");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    setupMobileNav();
    setupCopyEmail();
  });
})();
