let totalDebit = 0;
let totalCredit = 0;
let invoiceData = [];

document.getElementById('addButton').addEventListener('click', function () {
  
  const date = document.getElementById('date').value;
  const customerName = document.getElementById('customerName').value;
  const paymentMode = document.getElementById('paymentMode').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const transactionType = document.querySelector(
    'input[name="transaction"]:checked'
  );


  if (!date || !customerName || isNaN(amount) || !transactionType) {
    alert(
      'Please fill in all fields correctly and select either debit or credit.'
    );
    return;
  }

  
  const tableBody = document.getElementById('invoiceTableBody');

  
  const newRow = document.createElement('tr');

  // Create cells and append to the row
  const snCell = document.createElement('td');
  snCell.innerText = tableBody.rows.length + 1;
  newRow.appendChild(snCell);

  const dateCell = document.createElement('td');
  dateCell.innerText = date;
  newRow.appendChild(dateCell);

  const customerNameCell = document.createElement('td');
  customerNameCell.innerText = customerName;
  newRow.appendChild(customerNameCell);

  const paymentModeCell = document.createElement('td');
  paymentModeCell.innerText = paymentMode;
  newRow.appendChild(paymentModeCell);

  const transactionTypeCell = document.createElement('td');
  transactionTypeCell.innerText =
    transactionType.value.charAt(0).toUpperCase() +
    transactionType.value.slice(1);
  newRow.appendChild(transactionTypeCell);

  const amountCell = document.createElement('td');
  amountCell.innerText = `$${amount.toFixed(2)}`;
  newRow.appendChild(amountCell);


  tableBody.appendChild(newRow);


  invoiceData.push({
    sn: tableBody.rows.length,
    date: date,
    customerName: customerName,
    paymentMode: paymentMode,
    transactionType: transactionType.value,
    amount: amount,
  });


  if (transactionType.value === 'credit') {
    totalCredit += amount;
  } else {
    totalDebit += amount;
  }
});

document.getElementById('submitButton').addEventListener('click', function () {

  localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  localStorage.setItem('totalDebit', totalDebit);
  localStorage.setItem('totalCredit', totalCredit);
  window.location.href = 'submit.html';
});
