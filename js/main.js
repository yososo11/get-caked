// js/main.js

// 1. Dynamic Year in Footer
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 2. Smooth Scroll for Internal Links
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

// 3. Fullscreen 3D Viewer Modal for Cakes

// Grab modal elements from the HTML
const modal = document.getElementById("viewer-modal");
const modalModel = document.getElementById("viewer-modal-model");
const modalBackdrop = modal?.querySelector(".viewer-modal-backdrop");
const modalCloseBtn = modal?.querySelector(".viewer-modal-close");

if (modal && modalModel && modalBackdrop && modalCloseBtn) {
  // When clicking on any 3D viewer inside a product card, open the modal
  const productViewers = document.querySelectorAll(".product model-viewer");

  productViewers.forEach((viewer) => {
    viewer.addEventListener("click", () => {
      const src = viewer.getAttribute("src");
      const alt = viewer.getAttribute("alt") || "";

      // Copy the same 3D model into the fullscreen viewer
      modalModel.setAttribute("src", src);
      modalModel.setAttribute("alt", alt);

      modal.classList.add("is-open");
      document.body.style.overflow = "hidden"; // stop background scroll
    });
  });

  // Helper to close the modal
  function closeViewerModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  // Close when clicking the X button
  modalCloseBtn.addEventListener("click", closeViewerModal);

  // Close when clicking the dark backdrop
  modalBackdrop.addEventListener("click", closeViewerModal);

  // Close when pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeViewerModal();
    }
  });
}
