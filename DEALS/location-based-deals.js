document.addEventListener("DOMContentLoaded", () => {
    // Static Deals Data
    const deals = [
        {
            name: "Deal 1",
            description: "Buy 1 Get 1 Free on Shoes!",
            image: "images/shoes.jpg",
            location: "Sarit Centre, Nairobi",
            latitude: -1.2911,
            longitude: 36.7839
        },
        {
            name: "Deal 2",
            description: "20% Off on Laptops!",
            image: "images/laptop.jpg",
            location: "Village Market, Nairobi",
            latitude: -1.2925,
            longitude: 36.7995
        },
        {
            name: "Deal 3",
            description: "Free Coffee with Breakfast Combo!",
            image: "images/coffee.jpg",
            location: "Java House, Nairobi",
            latitude: -1.2908,
            longitude: 36.7870
        },
        {
            name: "Deal 4",
            description: "Discounted Spa Packages!",
            image: "images/spa.jpg",
            location: "Westgate Mall, Nairobi",
            latitude: -1.2919,
            longitude: 36.7835
        },
        {
            name: "Deal 5",
            description: "Happy Hour Deals on Cocktails!",
            image: "images/cocktails.jpg",
            location: "K1 Klubhouse, Nairobi",
            latitude: -1.2833,
            longitude: 36.8219
        },
        {
            name: "Deal 6",
            description: "Special Offer on Electronics!",
            image: "images/electronics.jpg",
            location: "Lavington Mall, Nairobi",
            latitude: -1.2923,
            longitude: 36.7847
        },
        {
            name: "Deal 7",
            description: "Discount on Designer Clothing!",
            image: "images/clothing.jpg",
            location: "Two Rivers Mall, Nairobi",
            latitude: -1.2345,
            longitude: 36.8042
        },
        {
            name: "Deal 8",
            description: "Weekend Getaway Discounts!",
            image: "images/getaway.jpg",
            location: "Karura Forest, Nairobi",
            latitude: -1.2396,
            longitude: 36.8230
        },
        {
            name: "Deal 9",
            description: "Free Dessert with Dinner!",
            image: "images/dessert.jpg",
            location: "Artcafe, Nairobi",
            latitude: -1.2870,
            longitude: 36.7845
        },
        {
            name: "Deal 10",
            description: "Big Savings on Groceries!",
            image: "images/groceries.jpg",
            location: "Yaya Centre, Nairobi",
            latitude: -1.2926,
            longitude: 36.7839
        }
    ];

    const dealsContainer = document.querySelector(".deals-container");

    // Populate deals dynamically
    deals.forEach((deal) => {
        const dealCard = document.createElement("div");
        dealCard.classList.add("deal-card");
        dealCard.setAttribute('data-aos', 'zoom-in');

        dealCard.innerHTML = `
            <img src="${deal.image}" alt="${deal.name}" class="deal-image">
            <div class="deal-content">
                <h3>${deal.name}</h3>
                <p>${deal.description}</p>
                <p><strong>Location:</strong> ${deal.location}</p>
            </div>
            <div class="deal-buttons">
                <button class="favorite-btn">❤️ Favorite</button>
                <button class="alert-btn">🔔 Alert</button>
            </div>
        `;

        dealsContainer.appendChild(dealCard);
    });

    // Initialize Leaflet Map centered near Apple Street Walk, Lavington, Nairobi
    const map = L.map('map').setView([-1.2923, 36.7768], 15); // Coordinates near Apple Street Walk
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Initialize Marker Cluster Group
    const markers = L.markerClusterGroup();

    // Add Markers to Cluster Group
    deals.forEach((deal) => {
        const marker = L.marker([deal.latitude, deal.longitude]);
        marker.bindPopup(`<strong>${deal.name}</strong><br>${deal.description}<br><em>${deal.location}</em>`);
        markers.addLayer(marker);
    });

    // Add Marker Cluster Group to Map
    map.addLayer(markers);

    // Favorite and Alert Functionality
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains('favorite-btn')) {
            const card = event.target.closest('.deal-card');
            event.target.classList.toggle('active');
            if (event.target.classList.contains('active')) {
                event.target.textContent = '❤️ Favorited';
                // Add favorite functionality (e.g., save to localStorage)
            } else {
                event.target.textContent = '❤️ Favorite';
                // Remove favorite functionality
            }
        }

        if (event.target.classList.contains('alert-btn')) {
            const card = event.target.closest('.deal-card');
            event.target.classList.toggle('active');
            if (event.target.classList.contains('active')) {
                event.target.textContent = '🔔 Alert Set';
                // Add alert functionality (e.g., notifications)
            } else {
                event.target.textContent = '🔔 Alert';
                // Remove alert functionality
            }
        }
    });

    // Hero section slideshow
    const slideshow = document.querySelector('.floating-slideshow');
    const images = slideshow.querySelectorAll('img');
    let index = 0;

    setInterval(() => {
        images[index].style.opacity = '0';
        index = (index + 1) % images.length;
        images[index].style.opacity = '1';
    }, 3000);
});

// Alert functionality placeholder
function setAlert(dealId) {
    alert(`Alert set for ${dealId}!`);
}
