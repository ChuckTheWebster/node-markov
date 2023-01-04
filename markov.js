'use strict';

/** Class: Textual markov chain generator. */
class MarkovMachine {

  /** Build markov machine; read in text.*/
  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.markovChain = this.getMarkovChain();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */
  getMarkovChain() {
    const markovChain = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i+1] || null;

      if (markovChain.has(word)) {
        markovChain.get(word).push(nextWord)
      } else {
        markovChain.set(word, [nextWord])
      }

    }

    return markovChain;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    let outputArray = [];
    let currentWord = this.words[0];

    while (currentWord !== null) {
      outputArray.push(currentWord);
      currentWord = this._getRandomNextWord(currentWord);
    }

    return outputArray.join(' ');
  }

  /** Return random next word from array words */
  _getRandomNextWord(currentWord) {
    const wordChoices = this.markovChain.get(currentWord);

    return wordChoices[Math.floor(Math.random() * wordChoices.length)];
  }

}

module.exports = {
  MarkovMachine,
};