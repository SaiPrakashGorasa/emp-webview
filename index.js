function reverseString(input) {
  if (typeof input !== 'string') {
    console.warn('reverseString expects a string');
    return '';
  }

  const reversed = input.split('').reverse().join('');
  console.log("Reversed string from my-utils:", reversed);
  return reversed;
}

module.exports = {
  reverseString,
};
