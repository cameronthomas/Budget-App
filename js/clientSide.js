const serverUrl = "http://" + document.domain + ":8080"

/**
 * Add Budget
 */
function addBudget() {
  let url = serverUrl + "/createBudget"
  let budgetNameList = getlocalBudgetNameList()
  let budgetNameValid = $("#budgetName").val().length > 0 && $.inArray($("#budgetName").val(), budgetNameList) == -1
  let budgetAmountValid = $.isNumeric($("#budgetAmount").val())

  // Make fields red if invalid
  budgetNameValid ? $('#budgetName').css('border-color', '#ced4da') : $('#budgetName').css('border-color', 'red')
  budgetAmountValid ? $('#budgetAmount').css('border-color', '#ced4da') : $('#budgetAmount').css('border-color', 'red')

  // Add budget
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
function prepAddTransactionsModal(budgetNameHtmlId) {
  $('#addTransactionNameLabel').text(unescape(budgetNameHtmlId))
  $('#addTransactionEscaped').text(budgetNameHtmlId)
  $('#addTransactionModal').modal('show');
}

/**
 * Add transaction
 */
function addTransaction() {
  let url = serverUrl + "/createTransaction"
  let merchantValid = $("#merchant").val().length > 0
  let purchaseAmountVald = $.isNumeric($("#purchaseAmount").val())
  let budgetName = $.trim($('#addTransactionNameLabel').text())
  let budgetNameHtmlId = $.trim($('#addTransactionEscaped').text())

  // Make fields red if invalid
  merchantValid ? $('#merchant').css('border-color', '#ced4da') : $('#merchant').css('border-color', 'red')
  purchaseAmountVald ? $('#purchaseAmount').css('border-color', '#ced4da') : $('#purchaseAmount').css('border-color', 'red')

  // Add transaction
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
        document.getElementById(budgetNameHtmlId + 'AmountUsed'). innerHTML = msg[0].budget_amount_used
        document.getElementById(budgetNameHtmlId + 'AmountLeft'). innerHTML = msg[0].budget_amount_left
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
  console.log(name)
  let url = serverUrl + "/budgetTransactions"
  $('#viewTransactionsModal').modal('show');

  // Get transactions
  $.ajax({
    type: 'GET',
    url: url,
    data: {
      'budgetName': unescape(name)
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

  // Fill list with budget names from html budets table
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
  let url = serverUrl + "/transactionPdf?budgetName=" + unescape(budgetName)
  window.open(url, '_blank');
}

/**
 * Download and display transactoins CSV
 */
function downloadCsv(budgetName) {
  let url = serverUrl + "/transactionCsv.csv?budgetName=" + unescape(budgetName)
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
