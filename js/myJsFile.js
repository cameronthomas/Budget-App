const serverUrl = "http://159.65.75.194:8080"
//const serverUrl = "http://localhost:8080"
//self.location.hostname
/**
 * Add Budget
 */
function addBudget() {
  //const url = "http://localhost:3000/createBudget"
  const url = serverUrl + "/createBudget"
  var budgetNameList = getlocalBudgetNameList()
  var budgetNameValid = $("#budgetName").val().length > 0 && $.inArray($("#budgetName").val(), budgetNameList) == -1
  var budgetAmountValid = $.isNumeric($("#budgetAmount").val())

  // Make fields red if invalid
  budgetNameValid ? $('#budgetName').css('border-color', '#ced4da') : $('#budgetName').css('border-color', 'red')
  budgetAmountValid ? $('#budgetAmount').css('border-color', '#ced4da') : $('#budgetAmount').css('border-color', 'red')

  if (budgetNameValid && budgetAmountValid) {
    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        'budgetName': $("#budgetName").val(),
        'budgetAmount': $("#budgetAmount").val()
      }),
      success: function(msg) {
        $("#budgetTable").find('tbody').append($(msg))
        $('#addBudgetModal').modal('hide');
        $('#budgetName').val('')
        $('#budgetAmount').val('')
      },
      error: function(msg) {
        console.log('error' + msg);
      }
    });
  }
}

/**
 * Prepare to load add transactions modal
 */
function prepAddTransactionsModal(budgetName) {
  $('#addTransactionNameLabel').text(budgetName)
  $('#addTransactionModal').modal('show');
}

/**
 * Add transaction
 */
function addTransaction() {
  //var url = "http://localhost:3000/createTransaction"
  const url = serverUrl + "/createTransaction"
  var merchantValid = $("#merchant").val().length > 0
  var purchaseAmountVald = $.isNumeric($("#purchaseAmount").val())
  var budgetName = $('#addTransactionNameLabel').text()


  // Make fields red if invalid
  merchantValid ? $('#merchant').css('border-color', '#ced4da') : $('#merchant').css('border-color', 'red')
  purchaseAmountVald ? $('#purchaseAmount').css('border-color', '#ced4da') : $('#purchaseAmount').css('border-color', 'red')

  if (merchantValid && purchaseAmountVald) {
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        'merchant': $("#merchant").val(),
        'purchaseAmount': $("#purchaseAmount").val(),
        'budgetName': budgetName,
        'notes': $("#notes").val()
      },
      success: function(msg) {
        console.log(msg)
        $('#' + budgetName + "AmountUsed").html(msg[0].budget_amount_used)
        $('#' + budgetName + "AmountLeft").html(msg[0].budget_amount_left)
        $('#addTransactionModal').modal('hide');
        $("#merchant").val('')
        $("#purchaseAmount").val('')
        $("#notes").val('')
      },
      error: function(msg) {
        console.log('error' + msg);
      }
    });
  }
}

/**
 * View Transactions
 */
function viewTransactions(name) {
  //var url = "http://localhost:3000/budgetTransactions"
  const url = serverUrl + "/budgetTransactions"
  $('#viewTransactionsModal').modal('show');

  $.ajax({
    type: 'GET',
    url: url,
    data: {
      'budgetName': name
    },
    success: function(msg) {
      console.log(msg);
      $('#transactionsTable').html(msg)
    },
    error: function(msg) {
      console.log('error' + msg);
    }
  });
}

/**
 * Get list of all budget names
 */
function getlocalBudgetNameList() {
  var budgetNameList = []

  $('#budgetTable>tbody>tr').map(
    function() {
      var budgetName = $(this).find('td:first').text()
      budgetNameList.push(budgetName)
    })

  return budgetNameList
}

function downloadPdf(budgetName) {
  //var url = "http://localhost:3000/budgetTransactions"
  const url = serverUrl + "/transactionPdf?budgetName=" + budgetName



  window.open(url, '_blank');
}
