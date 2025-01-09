document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const menuButton = document.querySelector('.menu-button');
    const navUl = document.querySelector('nav ul');

    menuButton.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '0';
            setTimeout(() => {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.transition = 'opacity 0.3s';
            }, 10);
        });

        dropdown.addEventListener('mouseleave', () => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            dropdownContent.style.opacity = '0';
            setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 300);
        });
    });
});