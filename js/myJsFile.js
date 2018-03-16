function addBudget() {
  var url = "http://localhost:3000/createBudget"
  var validInput = true

  // Validate budget name
  if($("#budgetName").val().length > 0) {
    validInput = true
    $('#budgetName').css('border-color', '#ced4da');
  } else {
    validInput = false
    $('#budgetName').css('border-color', 'red');
  }

  // Valiate budget amount
  if($.isNumeric($("#budgetAmount").val()) && validInput ) {
      $('#budgetAmount').css('border-color', '#ced4da');
  } else {
    validInput = false
    $('#budgetAmount').css('border-color', 'red');
  }

  if(validInput) {
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

function addTransaction() {
  var validInput = true

  // Validate merchant
  if($("#merchant").val().length > 0) {
    validInput = true
    $('#merchant').css('border-color', '#ced4da');
  } else {
    validInput = false
    $('#merchant').css('border-color', 'red');
  }

  // Validate purchase amount
  if($.isNumeric($("#purchaseAmount").val()) && validInput ) {
      $('#purchaseAmount').css('border-color', '#ced4da');
  } else {
    validInput = false
    $('#purchaseAmount').css('border-color', 'red');
  }

  // need to finish

}

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
