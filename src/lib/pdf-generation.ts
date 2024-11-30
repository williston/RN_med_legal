import PDFDocument from 'pdfkit'

export async function generatePDF(data: Record<string, unknown>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Add content to the PDF based on the template
    // This is a simple example; you'd want to create more sophisticated templates
    doc.fontSize(18).text('Clinical Report', { align: 'center' })
    doc.moveDown()
    Object.entries(data).forEach(([key, value]) => {
      doc.fontSize(14).text(`${key}:`, { continued: true }).fontSize(12).text(` ${value}`)
      doc.moveDown()
    })

    doc.end()
  })
}