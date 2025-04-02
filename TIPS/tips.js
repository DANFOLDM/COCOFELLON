// Scroll to Content
function scrollToContent() {
    document.querySelector("main").scrollIntoView({ behavior: "smooth" });
}

// Initialize Map
const map = L.map("map").setView([-1.2906, 36.7888], 15); // Lavington, Nairobi
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add Initial Markers
const locations = [
    { name: "XYZ Exchange", lat: -1.2915, lng: 36.7891 },
    { name: "ABC Grocery", lat: -1.292, lng: 36.79 },
    { name: "Sunrise Market", lat: -1.293, lng: 36.788 },
];

locations.forEach((loc) => {
    L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(`<strong>${loc.name}</strong>`);
});

// Additional Marker Data
const markers = [
    { coords: [-1.2737, 36.7612], text: "Save on Groceries" },
    { coords: [-1.2769, 36.7635], text: "Best Currency Rates" },
    { coords: [-1.2715, 36.7654], text: "Discount on Lunch" },
    { coords: [-1.2751, 36.7582], text: "Flash Sales Nearby" },
];

// Add Additional Markers
markers.forEach(marker => {
    L.marker(marker.coords).bindPopup(marker.text).addTo(map);
});

// Dynamic Tips
const tips = [
    { title: "10% off groceries", content: "Shop at ABC Grocery today!", location: { lat: -1.292, lng: 36.79 } },
    { title: "Currency Exchange", content: "Get better rates at XYZ Exchange!", location: { lat: -1.2915, lng: 36.7891 } },
    { title: "Exclusive Deals", content: "Find discounts at Sunrise Market.", location: { lat: -1.293, lng: 36.788 } },
];

const tipCarousel = document.getElementById("tip-carousel");
tips.forEach((tip) => {
    const tipCard = document.createElement("div");
    tipCard.className = "tip-card";
    tipCard.dataset.location = JSON.stringify(tip.location);
    tipCard.innerHTML = `<h3>${tip.title}</h3><p>${tip.content}</p>`;
    tipCarousel.appendChild(tipCard);
});

// Click Interaction for Tips
document.querySelectorAll(".tip-card").forEach(card => {
    card.addEventListener("click", () => {
        const location = JSON.parse(card.dataset.location);
        const bio = card.querySelector("p").textContent;
        map.flyTo(location, 16, { animate: true });
        L.popup()
            .setLatLng(location)
            .setContent(`<strong>${card.querySelector("h3").textContent}</strong><p>${bio}</p>`)
            .openOn(map);
    });
});

// Community Reviews
const reviews = [
    { user: "John", comment: "Saved big on my shopping today!", icon: "fas fa-shopping-cart" },
    { user: "Jane", comment: "Great exchange rates nearby.", icon: "fas fa-money-bill-wave" },
    { user: "Doe", comment: "Found amazing local deals!", icon: "fas fa-tags" },
    { user: "Smith", comment: "Best place for fresh groceries.", icon: "fas fa-apple-alt" },
    { user: "Brown", comment: "Highly recommend the local market.", icon: "fas fa-leaf" },
];

const communityGrid = document.getElementById("community-grid");
reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "community-card";
    reviewCard.innerHTML = `<i class="${review.icon}"></i><strong>${review.user}</strong><p>${review.comment}</p>`;
    communityGrid.appendChild(reviewCard);
});
