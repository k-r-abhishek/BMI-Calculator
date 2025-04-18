// === DOM Elements ===
const form = document.getElementById('bmiForm');
const results = document.getElementById('results');
const resetBtn = document.getElementById('resetBtn');

// === Spinner Setup ===
const spinner = document.createElement('div');
spinner.classList.add('spinner');

// === Event Listeners ===
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Show the spinner while calculating
  results.innerHTML = '';
  results.appendChild(spinner);

  setTimeout(() => {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Validate inputs
    if (isNaN(height) || height <= 0) {
      showError('Please enter a valid height');
      return;
    }

    if (isNaN(weight) || weight <= 0) {
      showError('Please enter a valid weight');
      return;
    }

    // Calculate BMI
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    const category = getBMICategory(bmi);

    // Display results
    results.innerHTML = `
      <span class="result">Your BMI is <strong>${bmi}</strong></span>
      <span class="category">${category}</span>
    `;
    results.classList.add('show');
  }, 1000); // Simulate delay
});

resetBtn.addEventListener('click', () => {
  results.classList.remove('show');
  results.innerHTML = '';
});

// === Helper Functions ===
function showError(message) {
  results.innerHTML = `<span class="error">${message}</span>`;
  results.classList.add('show');
}

function getBMICategory(bmi) {
  const val = parseFloat(bmi);
  if (val < 18.5) return '🟡 Underweight';
  if (val < 25) return '🟢 Normal weight';
  if (val < 30) return '🟠 Overweight';
  return '🔴 Obese';
}
