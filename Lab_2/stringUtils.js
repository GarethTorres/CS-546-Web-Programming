/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (strings) => {

      //condition below

      if (Array.isArray(strings) !== true) {
            throw new Error("Input array should be exists");
            //That the array exists
            //The array is of the proper type (meaning, it's an array)
      }
      else if (strings.length === 0) {
            throw new Error("Input array should not be empty");
            //The array is not empty
      }

      const result = {};
      for (let i = 0; i < strings.length; i++) {

            if (typeof strings[i] !== 'string') {
                  throw new Error('Each element in the array should not be an empty string');
                  //Each array element in the array is a string (No strings with empty spaces)
            }
            else if (strings[i].trim().length === 0) {
                  throw new Error('Each element in the array should not be an empty string');
                  //Each array element in the array is a string (No strings with empty spaces)
            }
            const str = strings[i].toLowerCase().replace(/[^a-z0-9]/g, '');
            //Using replace() Method with Regular Expression to strip all non alphanumeric text; this includes spaces.
            //I used a for loop to check if the given string it's palindromes after I use Regular Expression to strip all non alphanumeric text; this includes spaces. I was inspired by this link below
            //https://www.freecodecamp.org/news/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7/

            //condition over 
            //function below

            let alphanumeric_check = true;
            let len = str.length
            //Check if it's palindromes or not with a For loop

            for (let i = 0; i < Math.floor(len / 2); i++) {
                  //use Math.floor() in the loop to ensure the result always be an integer
                  if (str[i] !== str[len - 1 - i]) {
                        alphanumeric_check = false;
                        break;
                  }
            }
            result[str] = alphanumeric_check;
      }
      return result;
}


let censorWords = (string, badWordsList) => {

      //condition below
      // Check if the input string exists and is not just empty spaces

      if (string.trim() !== true) {
            throw new Error("input string should be exists and is a string (not just empty spaces)");
            //the input string exists and is a string (not just empty spaces)
      }

      // Check if the bad words list exists, is an array, and is not empty
      else if (Array.isArray(badWordsList) !== true) {
            throw new Error("bad words list should exist");
            //The bad words list exists and is an array
      }

      else if (badWordsList.length === 0)
            throw new Error("bad words list should not be empty");
      //The bad words list is not empty

      // Check that each element in the bad words list is a string
      else if (badWordsList.some((word) => typeof word !== "string")) {
            throw new Error("each element in the bad words list should be a string");
            //Each element in the bad words list is a string
      }

      //condition end
      //function below

      const censored_words = badWordsList.reduce((acc, word) => {
            // Create a dictionary of bad words to their censored versions
            const censored_word = "!@$#".repeat(word.length);
            acc[word] = censored_word;

            return acc;
      }, {});

      const badWordsRegex = new RegExp(badWordsList.join("|"), "gi");
      let last_index = 0;
      // Create a regular expression that matches any bad word in the input string
      // Replace every bad words in the input string with its censored version

      const final_String = string.replace(badWordsRegex, (match) => {

            const censored_word = censored_words[match.toLowerCase()];
            const start = string.indexOf(match, last_index);
            const end = start + match.length;
            last_index = end;
            return censored_word + string.slice(end).match(/^\s*/)[0];
      });

      return final_String;
};


let distance = (string, word1, word2) => {

      if (!string) {
            throw new Error("string should exist");
            //That string should be exist
      }

      else if (!word1) {
            throw new Error("word1 should exist");
            //That word1 should be exist
      }

      else if (!word2) {
            throw new Error("word2 should exist");
            //That word2 should be exist
      }

      else if (typeof string !== "string") {
            throw new Error("All three arguments must be of type string");
            //That string is type string
      }

      else if (typeof word1 !== "string") {
            throw new Error("That word1 should be type string");
            //That word1 is type string
      }

      else if (typeof word2 !== "string") {
            throw new Error("That word2 should be type string");
            //That word2 is type string
      }

      else if (string.trim() === "") {
            throw new Error("That string is not just empty strings");
            //That string should not just empty strings
      }
      else if (word1.trim() === "") {
            throw new Error("That word1 is not just empty strings");
            //That word1 should not just empty strings
      }
      else if (word2.trim() === "") {
            throw new Error("That word2 is not just empty strings");
            //That word2 should not just empty strings
      }

      const word_result = string.split(/\s+/);
      //I found that code will split the full string of and element into an array containing every word, here's the link below
      //https://stackoverflow.com/questions/28127794/difference-between-split-s-and-split
      const index_word1 = word_result.indexOf(word1);
      const index_word2 = word_result.indexOf(word2);

      if (/^\s* $/.test(string)) {
            throw new Error("That string is not just whitespace characters");
            //That string should not be just whitespace characters
      }
      else if (/^\p{P}+$/.test(string)) {
            //I used regular expressions to check That string, word1, and word2 are not just strings made of punctuation symbols,here's the link below:
            //https://stackoverflow.com/questions/13925454/check-if-string-is-a-punctuation-character
            throw new Error("That string should not be just strings made of punctuation symbols");
            //That string is not just strings made of punctuation symbols
      }
      else if (/^\p{P}+$/.test(word1)) {
            throw new Error("That string should not be just strings made of punctuation symbols");
            //That word1 is not just strings made of punctuation symbols
      }
      else if (/^\p{P}+$/.test(word2)) {
            throw new Error("That string should not be just strings made of punctuation symbols");
            //That word2 is not just strings made of punctuation symbols
      }
      else if (word_result.length < 2) {
            throw new Error("That string should be at least two words long");
            //That string is at least two words long
      }
      else if (word1.toUpperCase() === word2.toUpperCase()) {
            // Turn word1 and word2 to uppercase to compare
            throw new Error("That word1 and word2 should not be the same");
            //That word1 and word2 are not the same
      }
      else if (word_result.includes(word1) !== true) {
            throw new Error("That word1 should exist in the string");
            //That word1 and word1 exist in the string
      }
      else if (!word_result.includes(word2) !== true) {
            throw new Error("That word2 should exist in the string");
            //That word1 and word2 exist in the string
      }
      else if (index_word1 >= index_word2) {
            throw new Error("That word1 should appears before word2 in the string");
            //That word1 appears before word2 in the string
      }
      //conditions end

      // Function below
      let final_distance = Infinity;
      let last_word1_index = -1;
      let last_word2_index = -1;

      word_result.forEach((word, index) => {
            if (word === word1) {
                  last_word1_index = index;
            } else if (word === word2) {
                  last_word2_index = index;
            }

            if (last_word1_index >= 0 && last_word2_index >= 0) {
                  const distance = last_word2_index - last_word1_index;
                  if (distance < final_distance) {
                        final_distance = distance;
                  }
            }
      });

      return final_distance;
};

export {
      palindromes,
      censorWords,
      distance
};




