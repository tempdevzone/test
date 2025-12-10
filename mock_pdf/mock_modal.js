/**
 * A simplified mock of the CreateModalPopUpObject from the original page.
 */
function CreateModalPopUpObject() {
    // Get references to the modal elements from the DOM
    const overlay = document.getElementById('bailwal_div_overlay');
    const modalParent = document.getElementById('bailwal_div_frame_parent');
    const modalTitle = document.getElementById('bailwal_span_title');
    const modalFrame = document.getElementById('bailwal_overlay_frame');
    const modalTd = document.getElementById('bailwal_td_overlay');

    /**
     * Displays the modal window with content from a given URL.
     * @param {string} url - The URL of the content to load in the iframe.
     * @param {number} height - The desired height of the modal.
     * @param {number} width - The desired width of the modal.
     * @param {string} title - The title to display in the modal's header.
     */
    this.ShowURL = function(url, height, width, title) {
        // Set modal dimensions
        modalParent.style.height = height + 'px';
        modalParent.style.width = width + 'px';
        
        // The iframe needs to fit inside the parent, accounting for the title bar height
        const titleBarHeight = 30; 
        modalTd.style.height = (height - titleBarHeight) + 'px';
        modalFrame.style.height = (height - titleBarHeight) + 'px';
        modalFrame.style.width = width + 'px';

        // Set the title and the iframe source
        modalTitle.textContent = title;
        modalFrame.src = url;

        // Make the modal and overlay visible
        overlay.style.display = 'block';
        modalParent.style.display = 'block';
    };

    /**
     * Hides the modal pop-up and clears the iframe content.
     */
    this.HideModalPopUp = function() {
        overlay.style.display = 'none';
        modalParent.style.display = 'none';
        modalFrame.src = 'about:blank'; // Clear the iframe to stop content (e.g., video/audio)
    };
}

// Instantiate the modal object, similar to the original page
var modalWin = new CreateModalPopUpObject();

// Wrapper function to call the modal with predefined settings
function openPdfInModal(pdfPath) {
    modalWin.ShowURL(pdfPath, 600, 850, 'Applicant Data View');
}