// js/main.js

// ---------------------------------------------------------
// 1. Dynamic Year in Footer
// ---------------------------------------------------------
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------
// 2. Smooth Scroll for Internal Links
// ---------------------------------------------------------
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const section = document.querySelector(targetId);
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// ---------------------------------------------------------
// 3. Fullscreen 3D Viewer Modal for Model-Viewer
// ---------------------------------------------------------

// Grab modal elements
const modal = document.getElementById("viewer-modal");
const modalModel = document.getElementById("viewer-modal-model");
const modalBackdrop = modal?.querySelector(".viewer-modal-backdrop");
const modalCloseBtn = modal?.querySelector(".viewer-modal-close");

// Only run modal code if modal exists in HTML
if (modal && modalModel && modalBackdrop && modalCloseBtn) {
  
  // When clicking any model-viewer inside a product card → open fullscreen modal
  document.querySelectorAll(".product model-viewer").forEach((viewer) => {
    viewer.addEventListener("click", () => {
      const src = viewer.getAttribute("src");
      const alt = viewer.getAttribute("alt") || "";

      modalModel.setAttribute("src", src);
      modalModel.setAttribute("alt", alt);

      modal.classList.add("is-open");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  // Helper: close modal function
  function closeViewerModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  // Close on X button
  modalCloseBtn.addEventListener("click", closeViewerModal);

  // Close when clicking outside (backdrop)
  modalBackdrop.addEventListener("click", closeViewerModal);

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeViewerModal();
    }
  });
}
