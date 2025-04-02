// Initialize Map
const map = L.map("map").setView([-1.2906, 36.7888], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Placeholder marker
let selectedMarker;

// Allow users to select a location on the map
map.on("click", (event) => {
  const { lat, lng } = event.latlng;

  // Update form input with the selected location
  const locationInput = document.getElementById("location");
  locationInput.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

  // Update marker on the map
  if (selectedMarker) {
    map.removeLayer(selectedMarker);
  }
  selectedMarker = L.marker([lat, lng]).addTo(map);
});

// Tip Submission
document.getElementById("tip-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("tip-title").value;
  const description = document.getElementById("tip-content").value;
  const locationInput = document.getElementById("location").value;

  const [lat, lng] = locationInput.split(",").map(coord => parseFloat(coord.trim()));

  // Add Tip to Map
  const newMarker = L.marker([lat, lng]).addTo(map).bindPopup(`<strong>${title}</strong><p>${description}</p>`);

  // Add Tip to Tip Carousel
  const tipCard = document.createElement("div");
  tipCard.className = "tip-card";
  tipCard.dataset.location = JSON.stringify({ lat, lng });
  tipCard.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
  document.getElementById("tip-carousel").appendChild(tipCard);

  // Clear Form and Marker
  event.target.reset();
  if (selectedMarker) {
    map.removeLayer(selectedMarker);
    selectedMarker = null;
  }
});

// Sample Community Reviews
const communityReviews = [
  { title: "Great Tip!", content: "This tip saved me a lot of money. 👍", rating: 5, location: [-1.2906, 36.7888] },
  { title: "Awesome!", content: "Very helpful tip. Thanks! 😊", rating: 4, location: [-1.2910, 36.7890] },
  { title: "Fantastic!", content: "I will definitely use this tip. 🌟", rating: 5, location: [-1.2915, 36.7895] }
];

// Add Community Reviews to Map and Grid
communityReviews.forEach(review => {
  const { title, content, rating, location } = review;
  const [lat, lng] = location;

  // Add Review to Map
  L.marker([lat, lng]).addTo(map).bindPopup(`<strong>${title}</strong><p>${content}</p><p>Rating: ${'★'.repeat(rating)}</p>`);

  // Add Review to Community Grid
  const reviewCard = document.createElement("div");
  reviewCard.className = "community-card";
  reviewCard.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
    <div class="rating">
      ${'★'.repeat(rating)}
      ${'☆'.repeat(5 - rating)}
    </div>
  `;
  document.getElementById("community-grid").appendChild(reviewCard);
});
