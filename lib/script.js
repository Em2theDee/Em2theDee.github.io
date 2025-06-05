document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed"); // Debugging message
  setTimeout(() => {
    console.log("Adding 'loaded' class to <body>");
    document.body.classList.add("loaded");
  }, 2500); // Adjust time as needed
});

document.addEventListener('DOMContentLoaded', function () {
  const ipaOut = document.getElementById('ipa-out');
  const translateButton = document.getElementById('js-ipa-submit');

  function autoExpand() {
    if (!ipaOut) return;
    ipaOut.style.height = 'auto';
    ipaOut.style.height = ipaOut.scrollHeight + 'px';
  }

  // Scroll helper that applies a custom offset
  function scrollWithOffset(element, offset = 50) {
    const elementRect = element.getBoundingClientRect();
    // Current scroll + element's position from the top - offset
    const scrollPosition = window.pageYOffset + elementRect.top - offset;

    // Smoothly scroll the window to this position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Auto-expand the textarea on input
  ipaOut.addEventListener('input', autoExpand);

  // Auto-expand if there's initial content on page load
  autoExpand();

  // On translate button click:
  if (translateButton) {
    translateButton.addEventListener('click', function () {
      // 1. Convert the text
      ConverterForm.convert('ipa-in', 'ipa-out', 'ipa-err');
      
      // 2. Adjust the textarea to new content
      autoExpand();

      // 3. Wait for layout to update, then scroll with offset
      requestAnimationFrame(() => {
        const errDiv = document.getElementById('ipaout-plaque');
        if (errDiv) {
          // Use our custom scroll function
          scrollWithOffset(errDiv, 500);
        }
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
    const plaque = document.getElementById("ipaout-plaque");

    plaque.addEventListener("click", function (e) {
      e.preventDefault();

      // If popup already exists, just show it
      let existingPopup = document.getElementById("phonetic-popup");
      if (existingPopup) {
        existingPopup.style.display = "flex";
        return;
      }

      // Create popup container
      const popup = document.createElement("div");
      popup.id = "phonetic-popup";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100vw";
      popup.style.height = "100vh";
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      popup.style.display = "flex";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      popup.style.zIndex = "10000";

      // Inner content box
      const box = document.createElement("div");
      box.style.background = "var(--orange)";
      box.style.padding = "32px";
      box.style.gap = "32px";
      box.style.borderRadius = "12px";
      box.style.width = "75vw";
      // box.style.height = "75vh";
      box.style.overflow = "auto";
      box.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
      box.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; height: auto;">
          <h3 style="margin-bottom: 16px;">Here is the phonetic chart content</h3>
          <button id="close-popup" style="border-radius: 10px;  padding: 12px 20px; background: var(--blue); border: none; cursor: pointer; font-weight: bold; color: white;">Close</button>
          </div>
        <div class="roundbox image4"> </div>
      `;

      popup.appendChild(box);
      document.body.appendChild(popup);

      // Close behaviour
      document.getElementById("close-popup").addEventListener("click", function () {
        popup.style.display = "none";
      });

      // Optional: click outside box to close
      popup.addEventListener("click", function (e) {
        if (e.target === popup) {
          popup.style.display = "none";
        }
      });
    });
  });

