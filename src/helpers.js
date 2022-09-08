export const generateRandom = (length = 8) => {
  let password = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsLength = chars.length;
  const passwordLength = length;

  const array = new Uint32Array(charsLength); // create 'unsigned' array
  window.crypto.getRandomValues(array); // assign random values to new array

  for (let i = 0; i < passwordLength; i++) {
    // adding values to password var from chars using the random values
    password += chars[array[i] % charsLength]; // since the random value is quite, we use % operator which returns remainder of division
  }
  return password;
};
