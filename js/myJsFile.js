/**
* Add Budget
*/
function addBudget() {
  var url = "http://localhost:3000/createBudget"
  var budgetNameList = getlocalBudgetNameList()
  var budgetNameValid = $("#budgetName").val().length > 0 && $.inArray($("#budgetName").val(), budgetNameList) == -1
  var budgetAmountValid = $.isNumeric($("#budgetAmount").val())

  // Make fields red if invalid
  budgetNameValid ? $('#budgetName').css('border-color', '#ced4da') : $('#budgetName').css('border-color', 'red')
  budgetAmountValid ? $('#budgetAmount').css('border-color', '#ced4da') : $('#budgetAmount').css('border-color', 'red')

  if(budgetNameValid && budgetAmountValid) {
    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify({
            'budgetName': $("#budgetName").val(),
            'budgetAmount': $("#budgetAmount").val()
        }),
        success: function(msg){
            console.log(msg);
            $('#budgetsTableDiv').html(msg)
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
  var url = "http://localhost:3000/createTransaction"
  var merchantValid = $("#merchant").val().length > 0
  var purchaseAmountVald = $.isNumeric($("#purchaseAmount").val())

  // Make fields red if invalid
  merchantValid ? $('#merchant').css('border-color', '#ced4da') : $('#merchant').css('border-color', 'red')
  purchaseAmountVald ? $('#purchaseAmount').css('border-color', '#ced4da') : $('#purchaseAmount').css('border-color', 'red')

  if(merchantValid && purchaseAmountVald) {
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        'merchant': $("#merchant").val(),
        'purchaseAmount' : $("#purchaseAmount").val(),
        'budgetName' : $('#addTransactionNameLabel').text(),
        'notes' : $("#notes").val()
      },
      success: function(msg){
          console.log(msg);
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
    var url = "http://localhost:3000/budgetTransactions"
    $('#viewTransactionsModal').modal('show');

    $.ajax({
      type: 'GET',
      url: url,
      data: {
        'budgetName': name
      },
      success: function(msg){
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
