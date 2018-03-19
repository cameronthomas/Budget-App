const PdfDocument = require('pdfkit')
const fs = require('file-system')
const PdfTable = require('voilab-pdf-table')
const transactionPdfFileName = './pdf/transaction.pdf'

/**
 * This doesn't require recursion, but I wanted to show some recursion
 */
function createTransactionTableDataList(dataList, index) {
  if (index == dataList.length) {
    return []
  }

  return list = [{
    merchantName: dataList[index].merchant_name,
    purchaseAmount: dataList[index].purchase_amount,
    notes: dataList[index].notes
  }].concat(createTransactionTableDataList(dataList, index + 1))
}

module.exports = {
  /**
   * Generate transactions report
   */
  expenseReport: function(data) {
    let pdf = new PdfDocument({
      autoFirstPage: false
    }).addPage();

    new PdfTable(pdf)
      // add some plugins (here, a 'fit-to-width' for a column)
      .addPlugin(new(require('voilab-pdf-table/plugins/fitcolumn'))({
        column: 'merchantName'
      }))
      // set defaults to your columns
      .setColumnsDefaults({
        headerBorder: 'B',
        align: 'right'
      })
      .addColumns([{
          id: 'merchantName',
          header: 'Merchant Name',
          align: 'left'
        }, {
          id: 'purchaseAmount',
          header: 'Purchase Amount',
          align: 'left',
          width: 120
        },
        {
          id: 'notes',
          header: 'Notes',
          align: 'left',
          width: 250
        }
      ])
      .addBody(createTransactionTableDataList(data, 0));

    pdf.end()
    return pdf
  },
  /**
   * Prepare list for csv
   */
  prepareListForCsv: function(data) {
    return createTransactionTableDataList(data, 0)
  }
}
