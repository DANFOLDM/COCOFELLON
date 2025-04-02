document.addEventListener("DOMContentLoaded", function () {
    loadUserData();
    calculatePregnancyStage();
    loadPregnancyData();
    renderGraph();
    applyDarkModePreference();
});

/**
 * Toggle Sidebar Visibility
 */
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

/**
 * Toggle Dark Mode and Save Preference
 */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

/**
 * Apply Dark Mode Preference from Local Storage
 */
function applyDarkModePreference() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

/**
 * Load Personalized User Data
 */
function loadUserData() {
    document.getElementById("dashboardName").textContent = document.getElementById("userName").textContent;
}

/**
 * Calculate Pregnancy Stage Based on Last Menstrual Period (LMP)
 */
function calculatePregnancyStage() {
    let lmpDate = new Date(document.getElementById("userLMP").textContent);
    let today = new Date();
    let diffInDays = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    let weeksPregnant = Math.floor(diffInDays / 7);
    let stageMessage = weeksPregnant > 40 ? "Congratulations! Your due date has arrived!" : `You are approximately ${weeksPregnant} weeks pregnant.`;
    document.getElementById("pregnancyStage").textContent = stageMessage;
}

/**
 * Load Pregnancy Data (Baby Development, Nutrition Tips, Checkups)
 */
function loadPregnancyData() {
    axios.get("https://pregnancy-api.com/data")  // Replace with actual API
        .then(response => {
            document.getElementById("babyDevelopment").textContent = response.data.babyDevelopment;
            document.getElementById("nutritionTips").textContent = response.data.nutritionTips;
            document.getElementById("checkupReminders").textContent = response.data.checkupReminders;
        })
        .catch(error => {
            console.error("Error loading pregnancy data:", error);
        });
}

/**
 * Render Pregnancy Progress Chart with Fixed Height
 */
function renderGraph() {
    let ctx = document.getElementById("healthGraph").getContext("2d");
    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Week 4", "Week 8", "Week 12", "Week 16", "Week 20", "Week 24", "Week 28", "Week 32", "Week 36", "Week 40"],
            datasets: [{
                label: "Pregnancy Progress (%)",
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 100 }
            }
        }
    });

    // Fix Graph Height
    document.getElementById("healthGraph").parentElement.style.height = "300px";
}
