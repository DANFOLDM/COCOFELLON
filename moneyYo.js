document.addEventListener("DOMContentLoaded", () => {
    const featureBoxes = document.querySelectorAll(".feature-box");

    // Animate feature boxes on scroll
    window.addEventListener("scroll", () => {
        featureBoxes.forEach((box) => {
            const boxTop = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (boxTop < windowHeight - 100) {
                box.style.opacity = 1;
                box.style.transform = "translateY(0)";
                box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
            }
        });
    });

    // Smooth scroll to features on 'Learn More' button click
    const learnMoreButton = document.querySelector(".main-button");
    learnMoreButton.addEventListener("click", () => {
        document.querySelector(".features").scrollIntoView({ behavior: "smooth" });
    });

    // Slideshow functionality
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
        showSlide(currentIndex);
    }

    // Show the first slide
    showSlide(currentIndex);

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Floating window on the hero section
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");

    // Switch to Sign-Up Form
    showSignup.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
    });

    // Switch to Login Form
    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
    });
});
