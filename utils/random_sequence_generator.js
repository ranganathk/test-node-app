'use strict';
const elements = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789';

const createRandomSequence = (len) => {
  let string = '';
  for (let i = 1; i <= len; i++) {
    string += elements[Math.floor(elements.length * Math.random())];
  }
  return string;
};

module.exports = createRandomSequence;