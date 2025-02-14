document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const value = document.getElementById("value");
  const generated = document.getElementById("generated");
  const uppercaseCheckbox = document.getElementById("uppercase");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");
  const generateButton = document.getElementById("generateButton");
  const copyButton = document.getElementById("copyButton");
  const copyFeedback = document.getElementById("copyFeedback");

  slider.addEventListener("input", () => {
    value.textContent = slider.value;
  });

  function generatePassword(length, options) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characters = "";
    if (options.uppercase) characters += uppercase;
    if (options.lowercase) characters += lowercase;
    if (options.numbers) characters += numbers;
    if (options.symbols) characters += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  }

  function updatePassword() {
    const length = parseInt(slider.value, 10);
    const options = {
      uppercase: uppercaseCheckbox.checked,
      lowercase: lowercaseCheckbox.checked,
      numbers: numbersCheckbox.checked,
      symbols: symbolsCheckbox.checked,
    };
    const password = generatePassword(length, options);
    generated.textContent = password;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      copyFeedback.style.display = "inline";
      setTimeout(() => {
        copyFeedback.style.display = "none";
      }, 2000);
    });
  }

  updatePassword();

  slider.addEventListener("input", updatePassword);
  uppercaseCheckbox.addEventListener("change", updatePassword);
  lowercaseCheckbox.addEventListener("change", updatePassword);
  numbersCheckbox.addEventListener("change", updatePassword);
  symbolsCheckbox.addEventListener("change", updatePassword);

  generateButton.addEventListener("click", updatePassword);

  copyButton.addEventListener("click", () => {
    copyToClipboard(generated.textContent);
  });
});
