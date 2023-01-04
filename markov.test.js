'use strict';

const { MarkovMachine } = require('./markov');

describe('markov machine', function () {
  test('makes correct chains', function () {
    let test = new MarkovMachine('the cat in the hat');

    expect(test.markovChain).toEqual(new Map([
      ['the', ['cat', 'hat']],
      ['cat', ['in']],
      ['in', ['the']],
      ['hat', [null]]
    ]));
  });

  test('ends with the right word', function () {
    let test = new MarkovMachine('the cat in the hat');
    let testText = test.getText();
    expect(testText.endsWith('hat')).toEqual(true);
  });

  test('generates text from input', function () {
    let test = new MarkovMachine('1 2 3');
    let testText = test.getText();
    // expect('1 2 3').toEqual(testText);
    expect(['1 2 3', '2 3', '3']).toContain(testText);
  });

  test('generates text from valid pairs', function () {
    const pairs = ['the cat', 'the hat', 'cat in', 'in the'];
    let test = new MarkovMachine('the cat in the hat');
    let testTextSplit = test.getText().split(/[ \r\n]+/);

    for (let i = 0; i < testTextSplit.length - 1; i++) {
      expect(pairs).toContain(`${testTextSplit[i]} ${testTextSplit[i + 1]}`);
    }
  });
});