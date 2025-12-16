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

// ... (previous code remains the same) ...

function openPdfInModalNonPdf(htmlPath) { // Renamed for clarity as we're treating it as HTML
    // Show loading state initially
    modalWin.ShowURL('about:blank', 600, 850, 'Loading HTML Content...');

    fetch(htmlPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob(); // Get the response as a Blob
        })
        .then(htmlBlob => {
            // Create a new Blob explicitly setting the Content-Type to text/html
            const typedHtmlBlob = new Blob([htmlBlob], { type: 'text/html' }); // <-- THIS IS THE CHANGE
            
            // Create an Object URL for the Blob
            const objectURL = URL.createObjectURL(typedHtmlBlob);
            
            // Store the objectURL to revoke later
            modalWin.currentObjectURL = objectURL; // Add this property to modalWin instance

            // Now, set the iframe's src to the Object URL
            modalWin.ShowURL(objectURL, 600, 850, 'HTML Content View');
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
            // Display an error message in the modal
            modalWin.ShowURL(
                `data:text/html;charset=utf-8,<p style="padding: 20px; color:red;">Error loading HTML: ${error.message}. Please try again.</p>`,
                600, 850, 'Error Loading HTML'
            );
        });
}
