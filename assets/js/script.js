const burger = document.querySelector('.burger-btn');
const navMenu = document.querySelector('.navbar-menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
