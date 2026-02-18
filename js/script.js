let root = document.documentElement;
let rem = window.getComputedStyle(root, null).getPropertyValue("--base-font-size");
console.log(rem);

let body = document.body;
let width = body.clientWidth;
console.log(width);


// Mobile Nav
const openButton = document.getElementById('open-mobile-nav');
const closeButton = document.getElementById('close-mobile-nav');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

// Open menu
openButton.addEventListener('click', function () {
    mobileNav.classList.add('active');
    document.body.classList.add('no-scroll');
});

// Close menu with close button
closeButton.addEventListener('click', function () {
    mobileNav.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

// Close menu when clicking nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});


// Image Lightbox
(function () {
    // Create lightbox modal element
    const lightboxHTML = `
        <div id="lightbox-modal">
            <button id="lightbox-close" aria-label="Close lightbox">
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="imgdiv"><img src="" alt="Enlarged image"></div>
        </div>
    `;

    // Add lightbox to body when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }

    function initLightbox() {
        // Insert lightbox modal into the page
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImg = lightboxModal.querySelector('img');
        const lightboxClose = document.getElementById('lightbox-close');

        // Zoom and pan variables
        let zoomLevel = 1;
        const zoomLevels = [1, 1.75];
        let currentZoomIndex = 0;
        let isPanning = false;
        let startX = 0;
        let startY = 0;
        let translateX = 0;
        let translateY = 0;
        let currentTranslateX = 0;
        let currentTranslateY = 0;

        // Get all images inside .imgdiv elements
        const clickableImages = document.querySelectorAll('.clickable img');

        // Add click event to each image
        clickableImages.forEach(img => {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                openLightbox(this.src, this.alt);
            });
        });

        // Open lightbox function
        function openLightbox(src, alt) {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightboxModal.classList.add('active');
            document.body.classList.add('no-scroll');
            resetZoom();
        }

        // Close lightbox function
        function closeLightbox() {
            lightboxModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            resetZoom();
        }

        // Reset zoom function
        function resetZoom() {
            currentZoomIndex = 0;
            zoomLevel = zoomLevels[currentZoomIndex];
            translateX = 0;
            translateY = 0;
            currentTranslateX = 0;
            currentTranslateY = 0;
            updateImageTransform();
            lightboxImg.classList.remove('zoomed');
            // lightboxImg.style.cursor = 'zoom-in';
        }

        // Update image transform
        function updateImageTransform() {
            lightboxImg.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
        }

        // Toggle zoom on image click
        lightboxImg.addEventListener('click', function (e) {
            e.stopPropagation();

            if (zoomLevel === 1) {
                // Calculate click position relative to image
                const rect = lightboxImg.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                // Move to center the clicked point
                currentZoomIndex = (currentZoomIndex + 1) % zoomLevels.length;
                if (currentZoomIndex === 0) currentZoomIndex = 1;

                zoomLevel = zoomLevels[currentZoomIndex];

                // Center on click point
                const moveX = (0.5 - x) * rect.width * (zoomLevel - 1);
                const moveY = (0.5 - y) * rect.height * (zoomLevel - 1);
                translateX = moveX / zoomLevel;
                translateY = moveY / zoomLevel;
                currentTranslateX = translateX;
                currentTranslateY = translateY;

                lightboxImg.classList.add('zoomed');
            } else {
                // Cycle through zoom levels or reset
                currentZoomIndex = (currentZoomIndex + 1) % zoomLevels.length;
                if (currentZoomIndex === 0) {
                    resetZoom();
                } else {
                    zoomLevel = zoomLevels[currentZoomIndex];
                }
            }

            updateImageTransform();
        });

        // Pan functionality
        lightboxImg.addEventListener('mousedown', function (e) {
            if (zoomLevel > 1) {
                e.preventDefault();
                isPanning = true;
                startX = e.clientX;
                startY = e.clientY;
                lightboxImg.classList.add('panning');
            }
        });

        document.addEventListener('mousemove', function (e) {
            if (isPanning && zoomLevel > 1) {
                e.preventDefault();
                const deltaX = (e.clientX - startX) / zoomLevel;
                const deltaY = (e.clientY - startY) / zoomLevel;
                translateX = currentTranslateX + deltaX;
                translateY = currentTranslateY + deltaY;
                updateImageTransform();
            }
        });

        document.addEventListener('mouseup', function () {
            if (isPanning) {
                isPanning = false;
                currentTranslateX = translateX;
                currentTranslateY = translateY;
                lightboxImg.classList.remove('panning');
            }
        });

        // Mouse wheel zoom
        lightboxModal.addEventListener('wheel', function (e) {
            if (lightboxModal.classList.contains('active')) {
                e.preventDefault();

                if (e.deltaY < 0) {
                    // Zoom in
                    if (currentZoomIndex < zoomLevels.length - 1) {
                        currentZoomIndex++;
                        zoomLevel = zoomLevels[currentZoomIndex];
                        if (zoomLevel > 1) lightboxImg.classList.add('zoomed');
                        updateImageTransform();
                    }
                } else {
                    // Zoom out
                    if (currentZoomIndex > 0) {
                        currentZoomIndex--;
                        zoomLevel = zoomLevels[currentZoomIndex];
                        if (zoomLevel === 1) {
                            resetZoom();
                        } else {
                            updateImageTransform();
                        }
                    }
                }
            }
        }, { passive: false });

        // Close button click
        lightboxClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeLightbox();
        });

        // Click outside image to close
        lightboxModal.addEventListener('click', function (e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Press Escape key to close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
})();
