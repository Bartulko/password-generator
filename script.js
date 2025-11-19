// Const's
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const passwordDisplay = document.getElementById("password-display");
const copyButton = document.getElementById("copy-button");
const generateButton = document.querySelector(".button-generate");

const uppercaseCheckbox = document.getElementById("uppercase-checkbox");
const lowercaseCheckbox = document.getElementById("lowercase-checkbox");
const numbersCheckbox = document.getElementById("numbers-checkbox");
const symbolsCheckbox = document.getElementById("symbols-checkbox");

// Slider dynamic styling
const slider = document.getElementById("length-slider");

function updateSlider() {
    slider.style.setProperty("--val", slider.value);
    slider.style.setProperty("--min", slider.min);
    slider.style.setProperty("--max", slider.max);
}

slider.addEventListener("input", updateSlider);
updateSlider();

// Slider updating password length display
const chrcLength = document.getElementById("length-display");
slider.addEventListener("input", () => {
    chrcLength.textContent = slider.value;
})


// Pasword Generation
generateButton.addEventListener("click", () => {
    let password = "";
    let possibleChars = "";
    let checkboxesSelected = 0;

    // Chceck which checkboxes are selected and add corresponding characters
    if (uppercaseCheckbox.checked) {
        possibleChars += uppercaseChars;
        checkboxesSelected += 1
    }
    if (lowercaseCheckbox.checked) {
        possibleChars += lowercaseChars;
        checkboxesSelected += 1
    }
    if (numbersCheckbox.checked) {
        possibleChars += numberChars;
        checkboxesSelected += 1
    }
    if (symbolsCheckbox.checked) {
        possibleChars += symbolChars;
        checkboxesSelected += 1
    }
    // Generate Password 
    for(let i = 0; i < slider.value; i++) {
      if (checkboxesSelected == 0) {
        tooltip.classList.add("show");
        passwordDisplay.value = null;
        setTimeout(() => {
          tooltip.classList.remove("show");
          }, 1800);
        return
      }
      const randomIndex = Math.floor(Math.random() * possibleChars.length)
      password += possibleChars[randomIndex]
    }
    
    passwordDisplay.value = password
    console.log(password)

  });


