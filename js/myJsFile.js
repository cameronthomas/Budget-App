const serverUrl = "http://159.65.75.194:8080"
//const serverUrl = "http://localhost:8080"
//self.location.hostname
/**
 * Add Budget
 */
function addBudget() {
  //const url = "http://localhost:3000/createBudget"
  let url = serverUrl + "/createBudget"
  let budgetNameList = getlocalBudgetNameList()
  let budgetNameValid = $("#budgetName").val().length > 0 && $.inArray($("#budgetName").val(), budgetNameList) == -1
  let budgetAmountValid = $.isNumeric($("#budgetAmount").val())

  // Make fields red if invalid
  budgetNameValid ? $('#budgetName').css('border-color', '#ced4da') : $('#budgetName').css('border-color', 'red')
  budgetAmountValid ? $('#budgetAmount').css('border-color', '#ced4da') : $('#budgetAmount').css('border-color', 'red')

  if (budgetNameValid && budgetAmountValid) {
    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        'budgetName': $.trim($("#budgetName").val()),
        'budgetAmount': $("#budgetAmount").val()
      }),
      success: function(msg) {
        $("#budgetsTableBody").append($(msg))
        $('#addBudgetModal').modal('hide');
        clearAddBudgetModal()
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
  let url = serverUrl + "/createTransaction"
  let merchantValid = $("#merchant").val().length > 0
  let purchaseAmountVald = $.isNumeric($("#purchaseAmount").val())
  let budgetName = $.trim($('#addTransactionNameLabel').text())

  // Make fields red if invalid
  merchantValid ? $('#merchant').css('border-color', '#ced4da') : $('#merchant').css('border-color', 'red')
  purchaseAmountVald ? $('#purchaseAmount').css('border-color', '#ced4da') : $('#purchaseAmount').css('border-color', 'red')

  if (merchantValid && purchaseAmountVald) {
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        'merchant': $.trim($("#merchant").val()),
        'purchaseAmount': $("#purchaseAmount").val(),
        'budgetName': budgetName,
        'notes': $.trim($("#notes").val())
      },
      success: function(msg) {
        console.log(msg)
        $('#' + budgetName + "AmountUsed").html(msg[0].budget_amount_used)
        $('#' + budgetName + "AmountLeft").html(msg[0].budget_amount_left)
        $('#addTransactionModal').modal('hide');
        clearAddTransactionModal()
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
  let url = serverUrl + "/budgetTransactions"
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
  let budgetNameList = []

  $('#budgetsTableBody>tr').map(
    function() {
      var budgetName = $(this).find('td:first').text()
      budgetNameList.push(budgetName)
    })

  return budgetNameList
}

/**
 * Download and display transactoins pdf
 */
function downloadPdf(budgetName) {
  let url = serverUrl + "/transactionPdf?budgetName=" + budgetName
  window.open(url, '_blank');
}

/**
 * Clear values from add budgetModal
 */
function clearAddBudgetModal() {
  $('#budgetName').val('')
  $('#budgetAmount').val('')
}

/**
 * Clear values from add budgetModal
 */
function clearAddTransactionModal() {
  $('#merchant').val('')
  $('#purchaseAmount').val('')
  $('#notes').val('')
}
