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

// Copy to clipboard functionality
copyButton.addEventListener("click", () => {
    passwordDisplay.select();
    passwordDisplay.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(passwordDisplay.value);
    copyButton.innerHTML = "COPIED!"; 
    setTimeout(() => {
        copyButton.innerHTML = `<span class="material-symbols-outlined">content_copy</span>`; 
    }, 1500);
})

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

// Sets strenght function 
function setStrength(level) {
    const bars = [
        document.getElementById('bar1'), // red
        document.getElementById('bar2'), // yellow
        document.getElementById('bar3')  // green
    ];

    const strengthLabel = document.querySelector('.strength-text');
    const strengthColors = ['Weak', 'Medium', 'Strong'];
    strengthLabel.textContent = strengthColors[level - 1];
    
    bars.forEach(bar => {
      bar.classList.remove('active')
      bar.style.backgroundColor = 'transparent';
    });
  

    for (let i = 0; i < level; i++) {
        bars[i].classList.add('active');
      }
    
    let color = '';
    if (level === 1) color = 'red';
    if (level === 2) color = 'yellow';
    if (level === 3) color = 'green';

    for (let i = 0; i < level; i++) {
        bars[i].style.backgroundColor = color;
    }
}

// Any box checked function
function anyBoxChecked() {
    if (uppercaseCheckbox.checked || lowercaseCheckbox.checked || numbersCheckbox.checked || symbolsCheckbox.checked) {
       return true;      
    }
    return false;
  }

// Pasword Generation and password strength
generateButton.addEventListener("click", () => {
    let password = "";
    let possibleChars = "";
    let checkboxesSelected = 0;
    let passwordStrength = 0;

    // Chceck which checkboxes are selected and add corresponding characters
    // Every checkbox adds 5 points to strenght
    if (uppercaseCheckbox.checked) {
        possibleChars += uppercaseChars;
        checkboxesSelected += 1
        passwordStrength += 7
    }
    if (lowercaseCheckbox.checked) {
        possibleChars += lowercaseChars;
        checkboxesSelected += 1
        passwordStrength += 7
    }
    if (numbersCheckbox.checked) {
        possibleChars += numberChars;
        checkboxesSelected += 1
        passwordStrength += 7
    }
    if (symbolsCheckbox.checked) {
        possibleChars += symbolChars;
        checkboxesSelected += 1
        passwordStrength += 7
    }

    // Get value from the slider
    let sliderStrength = Number(slider.value);
    passwordStrength += sliderStrength

    // Updating the colors and strenght label if any box is checked
    if (anyBoxChecked() == true) { 
      if(passwordStrength < 16) {
        setStrength(1)
      } else if (passwordStrength <= 32 ) {
        setStrength(2)
      } else {
        setStrength(3)
      }
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

  });


