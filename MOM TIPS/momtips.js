// Search Function
function searchTips() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let tips = document.querySelectorAll(".tip-bubble");

    tips.forEach(tip => {
        let text = tip.innerText.toLowerCase();
        tip.style.display = text.includes(input) ? "inline-block" : "none";
    });
}

// Toggle Tip Expansion
function toggleTip(element) {
    if (element.style.height === "auto") {
        element.style.height = "50px";
        element.style.overflow = "hidden";
    } else {
        element.style.height = "auto";
    }
}

// Change Background Wallpaper
document.getElementById("bgUpload").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = "cover";
        };
        reader.readAsDataURL(file);
    }
});

// Display Motivational Quote
const quotes = [
    "You're doing an amazing job! 💖",
    "Motherhood is a journey, not a race. 🏃‍♀️",
    "Take care of yourself too, mama! 🌿",
    "Every small step matters. Keep going! 🚀"
];
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
