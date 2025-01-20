document.querySelectorAll('.card[data-popup]').forEach(card => {
    card.addEventListener('click', (event) => {
        const popupId = card.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        console.log('Opening popup:', popupId);
        
        if (!popup) {
            console.error('Popup not found:', popupId);
            return;
        }

        // Get cursor position
        const x = event.clientX;
        const y = event.clientY;
        
        // Position popup content at cursor
        const popupContent = popup.querySelector('.popup-content');
        if (popupContent) {
            // Make the popup visible but not displayed to measure its dimensions
            popup.style.visibility = 'hidden';
            popup.classList.add('active');
            
            // Get popup dimensions
            const popupRect = popupContent.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate positions
            let finalX = x;
            let finalY = y;
            let transform = 'translate(-50%, -50%)';
            
            // Check horizontal boundaries
            if (x + (popupRect.width / 2) > viewportWidth) {
                // Too far right
                finalX = viewportWidth - 20;
                transform = 'translate(-100%, -50%)';
            } else if (x - (popupRect.width / 2) < 0) {
                // Too far left
                finalX = 20;
                transform = 'translate(0, -50%)';
            }
            
            // Check vertical boundaries
            if (y + (popupRect.height / 2) > viewportHeight) {
                // Too far down
                finalY = viewportHeight - 20;
                transform = transform.replace('-50%)', '-100%)');
            } else if (y - (popupRect.height / 2) < 0) {
                // Too far up
                finalY = 20;
                transform = transform.replace('-50%)', '0)');
            }
            
            // Apply final position
            popupContent.style.left = finalX + 'px';
            popupContent.style.top = finalY + 'px';
            popupContent.style.transform = transform;
            
            // Make popup visible again
            popup.style.visibility = 'visible';
        }
        
        // Force popup to be visible
        popup.style.display = 'flex';
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Popup activated at:', x, y);
    });
});

// Ensure popup close functionality works
document.querySelectorAll('.popup-close').forEach(close => {
    close.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = close.closest('.popup');
        if (popup) {
            popup.classList.remove('active');
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
            document.body.style.overflow = '';
            console.log('Popup closed');
        }
    });
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
            document.body.style.overflow = '';
            console.log('Popup closed by background click');
        }
    });
});
