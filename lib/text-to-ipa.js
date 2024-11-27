//  text-to-ipa.js

// This file creates a global TextToIPA object containing the public loadDict
// and lookup methods as well as the associated private helper objects and methods.

/* eslint-disable no-console, no-undef */

// Create a TextToIPA object only if one does not already exist.
if (typeof TextToIPA !== 'object') {
  TextToIPA = {};
}

(function () {
  'use strict';

  // Create the IPA dictionary if one does not currently exist.
  if (typeof TextToIPA._IPADict !== 'object') {
    TextToIPA._IPADict = {};
  }

  // Create a constructor for an IPAWord that makes displaying them and associated errors much easier. 
  function IPAWord(error, text) {
    this.error = error;
    this.text = text;
  }

  // Parse the dictionary. Only used by loadDict.
  if (typeof TextToIPA._parseDict !== 'function') {
    TextToIPA._parseDict = function (lines) {
      console.log('TextToIPA: Beginning parsing to dict...');

      // Fill out the IPA dictionary by splitting each line into the word and its IPA representation.
      for (var i in lines) {
        var arr = lines[i].split(/\s+/g);
        TextToIPA._IPADict[arr[0]] = arr[1];
      }

      console.log('TextToIPA: Done parsing.');
    };
  }

  // Load the dictionary.
  if (typeof TextToIPA.loadDict !== 'function') {
    TextToIPA.loadDict = function (location) {
      console.log('TextToIPA: Loading dict from ' + location + '...');

      if (typeof location !== 'string') {
        console.log('TextToIPA Error: Location is not valid!');
      } else {

        var txtFile = new XMLHttpRequest();

        txtFile.open('GET', location, true);

        txtFile.onreadystatechange = function() {
          if (txtFile.readyState == 4 && (txtFile.status == 200 || txtFile.status == 0)) {
            TextToIPA._parseDict(txtFile.responseText.split('\n'));
          }
        };

        txtFile.send(null);

      }
    };
  }

  // Lookup function to find an English word's corresponding IPA text.
  if (typeof TextToIPA.lookup !== 'function') {
    TextToIPA.lookup = function (word) {

      if (Object.keys(TextToIPA._IPADict).length === 0) {
        console.log('TextToIPA Error: No data in TextToIPA._IPADict. Did "TextToIPA.loadDict()" run?');
      } else {
        // Preserve original casing of the word
        let originalWord = word;
        let lookupWord = word.toLowerCase();

        let ipaWord = TextToIPA._IPADict[lookupWord];

        if (ipaWord) {
          // Adjust IPA output based on original casing
          if (originalWord === originalWord.toUpperCase()) {
            ipaWord = ipaWord.toUpperCase();
          } else if (originalWord[0] === originalWord[0].toUpperCase()) {
            ipaWord = ipaWord.charAt(0).toUpperCase() + ipaWord.slice(1);
          }

          return new IPAWord(null, ipaWord);
        } else {
          // Word not found in the dictionary
          return new IPAWord('undefined', word);
        }
      }
    };
  }

}());
