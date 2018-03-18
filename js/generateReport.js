var PdfDocument = require('pdfkit')
var fs = require('file-system')
var PdfTable = require('voilab-pdf-table')
//const chartjsNode = require('chartjs-node');

/**
 * This might have better to do with a mop function or a loop,
 * but I wanted to show somem recursion.
 */
function createTransactionTableDataList(dataList, index) {
  if (index == dataList.length) {
    return []
  }

  var list = [{
    merchantName: dataList[index].merchant_name,
    purchaseAmount: dataList[index].purchase_amount,
    notes: dataList[index].notes
  }]

  return list.concat(createTransactionTableDataList(dataList, index + 1))
}

module.exports = {
  /**
   * Generate transactions report
   */
  expenseReport: function(data) {
    var pdf = new PdfDocument({
      autoFirstPage: false
    })

    var table = new PdfTable(pdf, {
      bottomMargin: 30
    });

    table
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

    pdf.addPage();
    table.addBody(createTransactionTableDataList(data, 0));
    pdf.pipe(fs.createWriteStream('./js/output.pdf'))
    pdf.end()
    console.log("report generated")
  }
}
