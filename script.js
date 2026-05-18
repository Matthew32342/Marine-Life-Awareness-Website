// PAGE TRANSITION
const links = document.querySelectorAll(".transition-link");
const transition = document.querySelector(".page-transition");

links.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = this.href;

    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = target;
    }, 600);
  });
});

window.addEventListener("pageshow", () => {
  transition.classList.remove("active");
  transition.classList.add("exit");

  setTimeout(() => {
    transition.classList.remove("exit");
  }, 700);
});


// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } 
    
    else {
      entry.target.classList.remove("show");
    }

  });
});

const hiddenElements = document.querySelectorAll(
  ".fade-left, .zoom-in"
);

hiddenElements.forEach((el) => observer.observe(el));