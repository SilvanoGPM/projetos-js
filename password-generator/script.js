function control() {
  const range = document.getElementById("range");
  const passwordLengthElm = document.querySelector(
    '[data-js="password-length"]'
  );

  const button = document.querySelector("button");
  const passwordElm = document.querySelector('[data-js="password"]');

  let passwordLength = 8;

  function copy() {
    navigator.clipboard.writeText(passwordElm.textContent);
  }

  function updatePasswordLength() {
    passwordLengthElm.innerText = range.value;
    passwordLength = range.value;
  }

  function generatePassword() {
    passwordElm.innerText = genPassword(passwordLength);
  }

  range.addEventListener("change", updatePasswordLength);
  button.addEventListener("click", generatePassword);
  passwordElm.addEventListener("click", copy);

  generatePassword();
}

control();

function genPassword(length = 8) {
  const SMALLEST_CHARACTER = "!".charCodeAt(0);
  const BIGGEST_CHARACTER = "z".charCodeAt(0);
  const IGNORED_CHARS = [
    "`",
    "'",
    "(",
    ")",
    ".",
    ",",
    "*",
    "-",
    ":",
    ";",
    "<",
    ">",
    "=",
    "?",
    "/",
    "[",
    "]",
    "^",
    "_",
    "\\"
  ];

  let password = "";

  function randomChar() {
    const random = Math.ceil(
      Math.random() * (BIGGEST_CHARACTER - SMALLEST_CHARACTER)
    );
    const char = String.fromCharCode(random + SMALLEST_CHARACTER);
    if (isIgnoredChar(char)) return randomChar();
    else return char;
  }

  function isIgnoredChar(char) {
    return IGNORED_CHARS.indexOf(char) !== -1;
  }

  for (let i = 0; i < length; i++) {
    password += randomChar();
  }

  return password;
}
