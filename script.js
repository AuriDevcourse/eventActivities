document.querySelectorAll('.card[data-popup]').forEach(card => {
    card.addEventListener('click', () => {
        const popupId = card.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        console.log('Opening popup:', popupId);
        
        if (!popup) {
            console.error('Popup not found:', popupId);
            return;
        }

        // Get parent window's scroll position and viewport height
        const parentWindow = window.parent;
        const parentScroll = parentWindow.scrollY || 0;
        const parentViewportHeight = parentWindow.innerHeight || window.innerHeight;
        
        // Calculate the position relative to parent window's viewport
        const cardRect = card.getBoundingClientRect();
        const iframeRect = window.frameElement ? window.frameElement.getBoundingClientRect() : { top: 0 };
        const cardPositionInParent = cardRect.top + iframeRect.top;
        
        // Position popup content relative to the clicked card
        const popupContent = popup.querySelector('.popup-content');
        if (popupContent) {
            const offset = Math.max(0, (cardPositionInParent - parentViewportHeight / 4));
            popupContent.style.marginTop = `-${offset}px`;
            console.log('Setting popup margin-top:', -offset);
        }
        
        // Force popup to be visible
        popup.style.display = 'flex';
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Popup activated');
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
