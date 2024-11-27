document.addEventListener("DOMContentLoaded", function () {
    // Get the textarea
    const textArea = document.getElementById('ipa-out');

    // Function to detect if a font fallback occurs
    function usesFallbackFont(text, font) {
        const span = document.createElement('span');
        span.style.fontFamily = font + ', sans-serif';
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.textContent = text;
        document.body.appendChild(span);
        
        // Check if the computed font family is not what we expected
        const computedFont = window.getComputedStyle(span).fontFamily;
        document.body.removeChild(span);

        // If computed font is different, it means it fell back to something else
        return !computedFont.includes(font);
    }

    // Iterate over the text content and apply fallback
    function applyFallbackFont() {
        const originalText = textArea.value;
        let updatedText = '';

        for (let char of originalText) {
            if (usesFallbackFont(char, 'Arial New English')) {
                // Wrap the character in a span to apply the Arial fallback
                updatedText += `<span style="font-family: Arial, sans-serif;">${char}</span>`;
            } else {
                updatedText += char;
            }
        }

        // Update textarea's HTML using innerHTML
        textArea.innerHTML = updatedText;
    }

    // Run the function when content changes (e.g., after conversion)
    textArea.addEventListener('input', applyFallbackFont);
});
