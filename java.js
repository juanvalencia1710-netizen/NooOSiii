/**
 * Premium Interactive Invitation Logic
 * Handles view transitions and the "No" button runaway effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const viewInvitation = document.getElementById('view-invitation');
    const viewThanks = document.getElementById('view-thanks');
    const viewFinal = document.getElementById('view-final');

    const btnAceptar = document.getElementById('btn-aceptar');
    const btnNo = document.getElementById('btn-no');
    const btnContinuar = document.getElementById('btn-continuar');

    /**
     * Smoothly transitions between two views
     * @param {HTMLElement} currentView 
     * @param {HTMLElement} nextView 
     */
    const transitionViews = (currentView, nextView) => {
        // Add fade-out effect to current view
        currentView.classList.add('fade-out');

        setTimeout(() => {
            currentView.classList.remove('active', 'fade-out');
            currentView.classList.add('hidden');

            // Prepare and show next view
            nextView.classList.remove('hidden');
            // Small timeout to ensure scale(0.9) is applied before adding active
            setTimeout(() => {
                nextView.classList.add('active');
            }, 50);
        }, 500); // Matches CSS transition duration
    };

    /**
     * Logic for the "No" button runaway interaction
     */
    const moveNoButton = () => {
        // Get container dimensions to keep button inside
        const cardRect = btnNo.closest('.card').getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();

        // Calculate maximum ranges
        // We stay within the card padding mostly
        const maxX = cardRect.width - btnRect.width - 40;
        const maxY = cardRect.height - btnRect.height - 40;

        // Generate random positions
        let randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
        let randomY = Math.floor(Math.random() * maxY) - (maxY / 2);

        // Apply transformation
        btnNo.style.transition = 'all 0.3s ease';
        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };

    // --- Event Listeners ---

    // Accept Invitation
    btnAceptar.addEventListener('click', () => {
        transitionViews(viewInvitation, viewThanks);
    });

    // Runaway "No" button logic
    // Mouse interaction
    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('mouseover', moveNoButton);

    // Touch interaction
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent accidental click on mobile
        moveNoButton();
    });

    // Continue to final view
    btnContinuar.addEventListener('click', () => {
        transitionViews(viewThanks, viewFinal);
    });
});
