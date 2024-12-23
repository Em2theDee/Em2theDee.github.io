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


