document.addEventListener('DOMContentLoaded', () => {
  // Function to manage burger button dropdown menu/list
  const burger = document.querySelector(".burger-btn");
  const navMenu = document.querySelector(".navbar-menu");

  const hideMenu = () => {
    navMenu.classList.remove("active");
    document.removeEventListener("click", handleOutsideClick);
  };

  const handleOutsideClick = (event) => {
    if (!navMenu.contains(event.target)) {
      hideMenu();
    }
  };

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      document.addEventListener("click", handleOutsideClick);
    }
  });

  // Educational background data
  const formalEducation = [
    { year: '2013 - 2015', description: 'Competency in Computer and Network Engineering at SMKN 2 Baleendah' },
    { year: 'Since 2024', description: "Associate's Degree in Taxation at Indonesia Open University" },
    { year: 'Since 2024', description: 'Bachelor of Science in Computer Science Online Degree at University of The People' }
  ];

  const informalEducation = [
    { year: 'Since 2021', description: 'Kelas Fullstack at Codepolitan' },
    { year: 'Since 2023', description: 'React Developer Learning Path at Dicoding' },
    { year: 'Since 2024', description: 'Google Digital Marketing & E-commerce Professional Certificate at Coursera' }
  ];

  // Former career data
  const formerCareer = [
    { year: '2014', description: 'Computer Technician at School Internship Program' },
    { year: '2015 - 2018', description: 'Network Administrator di Bambu Net' },
    { year: '2018', description: 'Administration Staff at SMK Al-Barq' },
    { year: '2018 - 2020', description: 'Administration Staff at PT Leskatmelin' },
    { year: '2020 - 2021', description: 'IT Staff at PT Leskatmelin and PT AKMEI' },
    { year: '2021 - 2024', description: 'Maintenance and Administration Staff at PT Haleyora Power UL Depok' },
    { year: '2024 - Now', description: 'Accounting and Tax Manager at PT Saikindo Surya Gumiwang' }
  ];

  // Function to create slider
  function createSlider(data, sliderId) {
    const slider = document.getElementById(sliderId);
    const container = slider.querySelector('.slider-container');
    const prevButton = slider.querySelector('.prev');
    const nextButton = slider.querySelector('.next');
    let currentIndex = 0;

    // Populate slider
    data.forEach(item => {
      const slide = document.createElement('div');
      slide.className = 'slider-item';
      slide.innerHTML = `
        <h4>${item.year}</h4>
        <p>${item.description}</p>
      `;
      container.appendChild(slide);
    });

    // Slider navigation
    function showSlide(index) {
      container.style.transform = `translateX(-${index * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
      showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % data.length;
      showSlide(currentIndex);
    });

    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);

    function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
        // Swipe left
        currentIndex = (currentIndex + 1) % data.length;
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right
        currentIndex = (currentIndex - 1 + data.length) % data.length;
      }
      showSlide(currentIndex);
    }

    showSlide(0);  // Show initial slide
  }

  // Function to create timeline
  function createTimeline(data, containerId) {
    const container = document.getElementById(containerId);
    data.forEach((item, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      timelineItem.innerHTML = `
      <div class="timeline-content">
        <h4>${item.year}</h4>
        <p>${item.description}</p>
      </div>
    `;
      container.appendChild(timelineItem);
    });
  }

  // Create education sliders
  createSlider(formalEducation, 'formal-education-slider');
  createSlider(informalEducation, 'informal-education-slider');

  // Create career timeline
  createTimeline(formerCareer, 'career-timeline');

  // Function to format number with periods
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Born date counter with formatting
  const bornDay = document.getElementById("bornDay");
  const bornDate = new Date('1998-01-31');
  const ageSpan = document.querySelector('.age');

  let currentUnit = 'seconds';
  const units = ['seconds', 'minutes', 'hours', 'days'];

  function updateCounter() {
    const now = new Date();
    const diff = now - bornDate;
    let value;

    switch(currentUnit) {
      case 'seconds':
        value = Math.floor(diff / 1000);
        break;
      case 'minutes':
        value = Math.floor(diff / (1000 * 60));
        break;
      case 'hours':
        value = Math.floor(diff / (1000 * 60 * 60));
        break;
      case 'days':
        value = Math.floor(diff / (1000 * 60 * 60 * 24));
        break;
    }

    bornDay.textContent = `${formatNumber(value)} ${currentUnit}`;

    // Update age in years
    const ageYears = Math.floor((now - bornDate) / (365.25 * 24 * 60 * 60 * 1000));
    ageSpan.textContent = `${ageYears} years old`;
  }

  bornDay.addEventListener('click', () => {
    const currentIndex = units.indexOf(currentUnit);
    currentUnit = units[(currentIndex + 1) % units.length];
    updateCounter();
  });

  setInterval(updateCounter, 1000);
  updateCounter();  // Initial call

  // Function to hide header when scrolling down
  // and show it when scrolling up
  const HIDE_HEADER_THRESHOLD = -80;
  let prevScrollPosition = window["pageYOffset"];

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window["pageYOffset"];
    const mainHeader = document.querySelector(".main-header");

    if (prevScrollPosition > currentScrollPosition) {
      mainHeader.style.top = "0";
    } else {
      mainHeader.style.top = `${HIDE_HEADER_THRESHOLD}px`;
    }

    prevScrollPosition = currentScrollPosition;
  });

  // Social media data
  const socialMediaData = [
    { icon: 'fab fa-github-square', link: 'https://github.com/ranggarosa', name: 'GitHub' },
    { icon: 'fab fa-linkedin', link: 'https://www.linkedin.com/in/ranggarosa/', name: 'LinkedIn' },
    { icon: 'fab fa-twitter-square', link: 'https://twitter.com/ranggarosa_', name: 'Twitter' },
    { icon: 'fab fa-instagram-square', link: 'https://www.instagram.com/ranggarosa/', name: 'Instagram' }
  ];

  // Function to create social media links
  function createSocialMediaLinks(container) {
    socialMediaData.forEach(item => {
      const link = document.createElement('a');
      link.href = item.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = `<i class="${item.icon}" aria-label="${item.name}"></i>`;
      container.appendChild(link);
    });
  }

  // Create social media links in footer
  const footerSocialLinks = document.querySelector('.social-link ul');
  footerSocialLinks.innerHTML = '';  // Clear existing links
  createSocialMediaLinks(footerSocialLinks);

  // Modal functionality
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2 class="modal-header">Connect with me</h2>
      <div class="modal-social-links"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalSocialLinks = modal.querySelector('.modal-social-links');
  createSocialMediaLinks(modalSocialLinks);

  const moreInfoButton = document.querySelector('.its-me button');
  const closeButton = modal.querySelector('.close');
  const connectWithMe = document.querySelector('.connect-with-me');

  moreInfoButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  connectWithMe.addEventListener('click', () => {
    modal.style.display = 'block';
  })

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});