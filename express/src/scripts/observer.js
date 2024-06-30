/* global document IntersectionObserver */

// Callback function to execute when entries change
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
};

// Options for the observer (which parts of the element to observe)
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px',
  threshold: 0.25, // Trigger when 100% of the element is in view
};

// Create an observer instance
const observer = new IntersectionObserver(callback, options);

// Target the element to be observed
const targets = document.querySelectorAll('.animation');
targets.forEach((target) => observer.observe(target));
