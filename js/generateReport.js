var PdfDocument = require('pdfkit')
var fs = require('file-system')
var PdfTable = require('voilab-pdf-table')
//const chartjsNode = require('chartjs-node');


function createTransactionTableDataList(dataList, index) {
  var spaces = ""

  for(i = 0; i < index; i++) {
    spaces += " "
  }

  if (index == dataList.length) {
    console.log(spaces + "end of recursion")
    return []
  }

  return [{
    merchantName: dataList[index].merchant_name,
    purchaseAmount: dataList[index].purchase_amount,
    notes: dataList[index].notes
  }].concat(createTransactionTableDataList(dataList, index + 1))

//   console.log(spaces + "before function call")
// //  console.log("datalist:", dataList)
//   console.log(spaces + "index:", index)
//   console.log()
//
//   var list = [row] + createTransactionTableDataList(dataList, index + 1)
//
//   console.log(spaces + "after function call")
//   console.log(spaces + "list:", list)
//   console.log()
//   return list
}

module.exports = {
  expenseReport: function(data) {
    console.log(data)
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

    // if no page already exists in your PDF, do not forget to add one
    pdf.addPage();

    var newDataList = createTransactionTableDataList(data, 0)

    console.log("New:", newDataList)

    // draw content, by passing data to the addBody method
    table.addBody(newDataList);

    pdf.pipe(fs.createWriteStream('./js/output.pdf'))

    pdf.end()
    console.log("report generated")
  }
}
