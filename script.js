document.querySelectorAll('.card[data-popup]').forEach(card => {
    card.addEventListener('click', () => {
        const popupId = card.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        
        // Calculate scroll position to center popup in viewport
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        // Add active class and prevent body scroll
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.popup-close').forEach(close => {
    close.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = close.closest('.popup');
        popup.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
