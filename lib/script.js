document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed"); // Debugging message
  setTimeout(() => {
    console.log("Adding 'loaded' class to <body>");
    document.body.classList.add("loaded");
  }, 2500); // Adjust time as needed
});
