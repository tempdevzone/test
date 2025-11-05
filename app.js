// Initialize jsPDF
const { jsPDF } = window.jspdf;

function generateAndPrintPDF() {
    // Create new jsPDF instance
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Add content to PDF
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text('Your Document Title', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('This is a sample PDF document generated with jsPDF.', 20, 40);
    doc.text('It will open directly in Chrome print preview.', 20, 50);

    // Convert PDF to blob
    const pdfBlob = doc.output('blob');

    // Create blob URL
    const blobUrl = URL.createObjectURL(pdfBlob);
    return blobUrl;
}

function generateAndPrintPDFFile() {
    // Create new jsPDF instance
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Add content to PDF
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text('Your Document Title', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('This is a sample PDF document generated with jsPDF.', 20, 40);
    doc.text('It will open directly in Chrome print preview.', 20, 50);

    // Convert PDF to blob
    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, "download.pdf");
    // Create blob URL
    const blobUrl = URL.createObjectURL(pdfBlob);
    return blobUrl;
}

function printPdfIframeInNewWindow() {
    // Open blob in new tab (this solves CORS error)
    const blobUrl = generateAndPrintPDF();

    const printWindow = window.open(blobUrl, '_blank');
    if (printWindow) {
        printWindow.addEventListener('load', function () {
            try {
                printWindow.print();
            } catch (e) {
                console.error('Print Failed', e);
            }
        }, true);
    }
}

function printPdfIframeBlobInSameWindow() {
    // This can cause a CORS issue
    const blobUrl = generateAndPrintPDF();
    // Create hidden iframe
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);
    printFrame.src = blobUrl;

    printFrame.onload = function () {
        try {
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();

            setTimeout(() => {
                document.body.removeChild(printFrame);
                URL.revokeObjectURL(blobUrl);
            }, 10000);
        } catch (e) {
            console.error('Error printing:', e);
        }
    };
}

function printPdfIframeInSameWindowPost() {
    // To fix CORS error
    const blobUrl = generateAndPrintPDF();
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    printFrame.src = blobUrl;

    printFrame.contentWindow.postMessage('print', '*');
    printFrame.contentWindow.addEventListener('message', (event) => {
        if (event.data === 'print') {
            printFrame.contentWindow.print();
        }
    });
}

function printPdfIframeFileInSameWindow() {
    // This can cause CORS issue
    const blobUrl = generateAndPrintPDFFile();
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);
    printFrame.src = "https://example.com/7a24da83-2c61-425d-bb5e-c57a2d04c75f.pdf";

    printFrame.onload = function () {
        try {
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();

            setTimeout(() => {
                document.body.removeChild(printFrame);
                URL.revokeObjectURL(blobUrl);
            }, 10000);
        } catch (e) {
            console.error('Error printing:', e);
        }
    };
}
