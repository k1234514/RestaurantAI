import { jsPDF } from "jspdf";

function PDFButton({ title, content }) {
  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 20, 20);

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(content, 170);

    doc.text(lines, 20, 35);

    doc.save(`${title}.pdf`);
  }

  return (
    <button onClick={downloadPDF}>
      📄 Download PDF
    </button>
  );
}

export default PDFButton;