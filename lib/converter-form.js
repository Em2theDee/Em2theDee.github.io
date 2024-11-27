if (typeof ConverterForm !== 'object') {
  ConverterForm = {};
}

(function () {

  'use strict';

  // Error messages
  if (typeof ConverterForm._undefMsg !== 'string') {
    ConverterForm._undefMsg = 'Some words you have entered cannot be found in the IPA dictionary.';
  }

  if (typeof ConverterForm._multiMsg !== 'string') {
    ConverterForm._multiMsg = 'Some words you have entered have multiple pronunciations in English. These differences are separated with "OR".';
  }

  // Update a specific div by placing a paragraph inside it
  if (typeof ConverterForm._updateParagraph !== 'function') {
    ConverterForm._updateParagraph = function (inID, text) {
      document.getElementById(inID).innerHTML = '<p>' + text + '</p>';
    };
  }

  // Update a text area by replacing its contents, preserving paragraph structure
  if (typeof ConverterForm._updateTextArea !== 'function') {
    ConverterForm._updateTextArea = function (inID, text) {
      document.getElementById(inID).value = text;
    };
  }

  if (typeof ConverterForm.convert !== 'function') {
    ConverterForm.convert = function (inID, outID, errID) {
      if (typeof inID !== 'string') {
        console.log('TextToIPA Error: "inID" called in "ConverterForm.convert()" is not a valid ID"');
      } else if (typeof TextToIPA !== 'object') {
        console.log('TextToIPA Error: "TextToIPA" object not found. Is "text-to-ipa.js" included before ConverterForm.convert() is ran?');
      } else {
        let currentErrorMessage = '';
        let currentMultiMessage = '';

        // Split the input into an array of paragraphs based on new lines
        let paragraphsArray = document.getElementById(inID).value.split(/\n+/);
        let IPAText = [];

        // Iterate through each paragraph
        for (let paragraph of paragraphsArray) {
          // Split the paragraph into words and punctuation
          let wordsAndPunctuation = paragraph.match(/\w+|[^\w\s]/g);
          let IPAPhrase = [];

          if (wordsAndPunctuation) {
            for (let token of wordsAndPunctuation) {
              if (/[\w]/.test(token)) {
                // If the token is a word, look it up in the IPA dictionary
                let IPAWord = TextToIPA.lookup(token);

                if (IPAWord.error === 'undefined') {
                  currentErrorMessage = ConverterForm._undefMsg;
                  IPAPhrase.push(token); // Use the original word if not found
                } else if (IPAWord.error === 'multi') {
                  currentMultiMessage = ConverterForm._multiMsg;
                  IPAPhrase.push(IPAWord.text);
                } else {
                  IPAPhrase.push(IPAWord.text);
                }
              } else {
                // If the token is punctuation, append it to the previous word without a space
                if (IPAPhrase.length > 0) {
                  IPAPhrase[IPAPhrase.length - 1] += token;
                } else {
                  // If it's the first token (punctuation), just push it
                  IPAPhrase.push(token);
                }
              }
            }
          }

          // Join tokens to form the paragraph and add to the result list
          IPAText.push(IPAPhrase.join(' '));
        }

        // Join paragraphs with new lines to maintain structure
        IPAText = IPAText.join('\n\n');

        // Update output field
        if (typeof outID === 'string') {
          ConverterForm._updateTextArea(outID, IPAText);
        } else {
          console.log('TextToIPA Warning: "outID" in "ConverterForm.convert()" is not a string, skipping IPA output.');
        }

        // Update error field
        if (typeof errID === 'string') {
          ConverterForm._updateParagraph(errID, currentErrorMessage + ' ' + currentMultiMessage);
        } else {
          console.log('TextToIPA Warning: "errID" in "ConverterForm.convert()" is not a string, skipping error output.');
        }
      }
    };
  }
})();
