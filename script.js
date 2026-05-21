// PAGE TRANSITION
const links = document.querySelectorAll(".transition-link");

const transition = document.querySelector(".page-transition");

links.forEach(link => {

  link.addEventListener("click", function (e) {

    e.preventDefault();

    const target = this.href;

    // START BLUE SLIDE
    transition.classList.add("active");

    // WAIT BEFORE CHANGING PAGE
    setTimeout(() => {

      window.location.href = target;

    }, 400);

  });

});

// RESET ANIMATION ON LOAD
window.addEventListener("pageshow", () => {

  transition.classList.remove("active");

});

// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    } else {

      entry.target.classList.remove("show");

    }

  });

}, {
  threshold: 0.15
});

const hiddenElements = document.querySelectorAll(
  ".fade-left, .zoom-in"
);

hiddenElements.forEach((el) => observer.observe(el));