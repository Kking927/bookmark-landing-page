// Open and Close Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const headerNav = document.getElementById('header-nav');

  // Function to open the menu
  const openMenu = () => {
    headerNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    // Optional: Prevent background scrolling when menu is open
    document.body.style.overflow = 'hidden'; 
  };

  // Function to close the menu
  const closeMenu = () => {
    headerNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    // Restore background scrolling
    document.body.style.overflow = ''; 
  };

  // Event Listeners
  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  // Close menu if a user clicks a nav link (great for single-page smooth scrolling)
  const navLinks = headerNav.querySelectorAll('.header__link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

// Hero Section: Button Active State Toggle
const heroButtons = document.querySelectorAll(".hero__btn");

heroButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    heroButtons.forEach((btn) => {
      // Strip old states
      btn.classList.remove("hero__btn--active", "hero__btn--inactive");

      // Assign new states relative to what was clicked
      if (btn === this) {
        btn.classList.add("hero__btn--active");
      } else {
        btn.classList.add("hero__btn--inactive");
      }
    });
  });
});

// Features Section: Tab Switching Functionality

// 1. Select all the features navigation links and all content panels
const tabs = document.querySelectorAll(".features__link");
const panels = document.querySelectorAll(".features__panel");

// 2. Loop through each tab and listen for a click event
tabs.forEach((tab) => {
  tab.addEventListener("click", function (event) {
    // Prevents the page from jumping when clicking the link anchors
    event.preventDefault();

    // 3. Reset all tabs: remove active class and set aria-selected to false
    tabs.forEach(t => {
      t.classList.remove("features__link--active");
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    });

    // 4. Reset all panels: remove active class and set hidden attribute
    panels.forEach(panel => {
      panel.classList.remove("features__panel--active");
      panel.setAttribute("hidden", "true");
    });

    // 5. Activate the clicked tab
    this.classList.add("features__link--active");
    this.setAttribute("aria-selected", "true");
    this.setAttribute("tabindex", "0");

    // 6. Activate the matching content panel using the link's href target (e.g., "#panel-1")
    const targetPanelId = this.getAttribute("href"); // Gets "#panel-1", "#panel-2", etc.
    const targetPanel = document.querySelector(targetPanelId);
    
    if (targetPanel) {
      targetPanel.classList.add("features__panel--active");
      targetPanel.removeAttribute("hidden");
    }
  });
});

// Newsletter Form Validation & Error State Handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.cta__form');
  const fieldGroup = document.querySelector('.cta__field-group');
  const emailInput = document.querySelector('.cta__input');
  const errorMessage = document.querySelector('.cta__error-message');

  form.addEventListener('submit', (e) => {
    // Prevent the default browser form submission refresh
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    
    // Regular expression for standard email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === '') {
      // Case 1: The input field is empty
      errorMessage.textContent = "Whoops, make sure the field isn't empty";
      fieldGroup.classList.add('cta__field-group--error');
    } else if (!emailPattern.test(emailValue)) {
      // Case 2: The email address is not formatted correctly
      errorMessage.textContent = "Whoops, make sure it's an email";
      fieldGroup.classList.add('cta__field-group--error');
    } else {
      // Case 3: Validation passes successfully
      fieldGroup.classList.remove('cta__field-group--error');
      alert('Thank you for subscribing!');
      form.reset();
    }
  });

  // Clear the error state when the user starts typing again
  emailInput.addEventListener('input', () => {
    if (fieldGroup.classList.contains('cta__field-group--error')) {
      fieldGroup.classList.remove('cta__field-group--error');
    }
  });
});
