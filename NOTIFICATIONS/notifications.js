// script.js

// Handle preferences form submission
document.getElementById("preferences-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedPreferences = Array.from(
      document.querySelectorAll('input[name="preferences"]:checked')
    ).map((input) => input.value);
  
    alert(`Preferences saved: ${selectedPreferences.join(", ")}`);
  });
  
  // Handle savings goal submission
  document.getElementById("savings-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const goalAmount = parseInt(document.getElementById("goal-amount").value, 10);
    if (!goalAmount || goalAmount <= 0) {
      alert("Please enter a valid goal amount!");
      return;
    }
  
    // Simulate savings progress
    let progress = 0;
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
  
    const interval = setInterval(() => {
      progress += 10;
      progressBar.value = progress;
      progressText.textContent = `${progress}% of your goal achieved`;
  
      if (progress >= 100) {
        clearInterval(interval);
        document.getElementById("rewards-list").innerHTML += `
          <li>Congratulations! You've achieved your savings goal of $${goalAmount}! 🎉</li>
        `;
      }
    }, 500); // Adjust speed as needed
  });
  
  // Handle time-sensitive notifications toggle
  document.getElementById("time-sensitive").addEventListener("change", (event) => {
    if (event.target.checked) {
      alert("Time-sensitive notifications enabled!");
    } else {
      alert("Time-sensitive notifications disabled!");
    }
  });
  
  // Side Menu Toggle
  function openNav() {
    document.getElementById("side-menu").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("side-menu").style.width = "0";
  }
  