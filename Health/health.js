document.addEventListener("DOMContentLoaded", function() {
    const tips = [
        "Sleep when your baby sleeps. Rest is key!",
        "Hydrate! Drink at least 2-3 liters of water daily.",
        "Light exercise helps with postpartum recovery!",
        "Talk to a friend or loved one if you're feeling overwhelmed.",
        "Your body is healing—be patient with yourself!",
        "Don't forget to eat nutrient-rich meals to regain energy."
    ];
    
    document.getElementById("dailyTip").innerText = tips[Math.floor(Math.random() * tips.length)];
});

// Function to add custom reminders
function addReminder() {
    const date = document.getElementById("reminderDate").value;
    const text = document.getElementById("reminderText").value;
    if (date && text) {
        const reminderList = document.getElementById("customReminders");
        const newReminder = document.createElement("p");
        newReminder.innerHTML = `📌 <b>${date}</b> - ${text}`;
        reminderList.appendChild(newReminder);
        document.getElementById("reminderText").value = "";
    }
}
