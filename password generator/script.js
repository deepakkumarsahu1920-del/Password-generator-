const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthRange = document.getElementById("lengthRange");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const special = document.getElementById("special");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

length.addEventListener("input", function () {
    let value = parseInt(length.value);

    if (value < 4) value = 4;
    if (value > 50) value = 50;

    length.value = value;
    lengthRange.value = value;
});

lengthRange.addEventListener("input", function () {
    length.value = lengthRange.value;
});

generateBtn.addEventListener("click", function () {
    message.textContent = "";

    const passwordLength = parseInt(length.value);

    if (passwordLength < 4 || passwordLength > 50) {
        message.textContent = "Password length must be between 4 and 50.";
        return;
    }

    if (
        !uppercase.checked &&
        !lowercase.checked &&
        !numbers.checked &&
        !special.checked
    ) {
        message.textContent = "Please select at least one character type.";
        return;
    }

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characters = "";
    let generatedPassword = "";

    if (uppercase.checked) {
        characters += upperChars;
        generatedPassword += getRandomCharacter(upperChars);
    }

    if (lowercase.checked) {
        characters += lowerChars;
        generatedPassword += getRandomCharacter(lowerChars);
    }

    if (numbers.checked) {
        characters += numberChars;
        generatedPassword += getRandomCharacter(numberChars);
    }

    if (special.checked) {
        characters += specialChars;
        generatedPassword += getRandomCharacter(specialChars);
    }

    while (generatedPassword.length < passwordLength) {
        generatedPassword += getRandomCharacter(characters);
    }

    generatedPassword = shuffle(generatedPassword);

    password.value = generatedPassword;
});

function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

function shuffle(text) {
    let array = text.split("");

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.join("");
}

copyBtn.addEventListener("click", function () {
    if (password.value === "") {
        message.textContent = "Generate a password first.";
        return;
    }

    navigator.clipboard.writeText(password.value);
    message.textContent = "Password copied!";
});