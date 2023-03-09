// Get the values from the App page
// Start or controller function
function getValues(){

    // Get values from the page
    let loanAmount = document.getElementById("loanAmount").value;
    let numberOfPayments =  document.getElementById("numberOfPayments").value;
    let interestRate =  document.getElementById("interestRate").value;

    // We need to validate our input
    // parse into integers
    loanAmount = parseFloat(loanAmount);
    numberOfPayments = parseFloat(numberOfPayments);
    interestRate = parseFloat(interestRate);
        
    if(Number.isInteger(loanAmount) && Number.isInteger(numberOfPayments) && Number.isInteger(interestRate)){
        // Call generateResult
        let result = generateResult(loanAmount, numberOfPayments, interestRate);

        // Call displayNumbers
        displayResult(result);
    }else{
        alert("You must enter integers");
    }
}

// Generate result all payments
// Logic function(s)
function generateResult(loanAmount, numberOfPayments, interestRate){
    
    let results = [];
    let totalMontlyPayment = Math.round(((loanAmount) * (interestRate / 1200) / (1 - (1 + interestRate / 1200)**(-numberOfPayments))) * 100) / 100;
    let remainingBalance = loanAmount;
    let runingInterest = 0.00;

    // Genenate all 
    for (let i = 1; i <= numberOfPayments; i++) {
        let payment = {};
        payment.Month = i;
        payment.Payment = totalMontlyPayment;
        payment.Interest = Math.round((remainingBalance * interestRate / 1200) * 100) / 100;
        payment.TotalInterest = Math.round((runingInterest + payment.Interest) * 100) / 100;
        runingInterest = Math.round(payment.TotalInterest * 100) / 100;
        payment.Principal = Math.round((totalMontlyPayment - payment.Interest) * 100) / 100;

        if (i == numberOfPayments){
            payment.Payment = Math.round((remainingBalance + payment.Interest) * 100) / 100;
            payment.Principal = Math.round((payment.Payment - payment.Interest) * 100) / 100;
            payment.Balance = 0;
        }else{
            remainingBalance = Math.round((remainingBalance - payment.Principal) * 100) / 100;
            payment.Balance = remainingBalance;
        }
        results.push(payment);
    }
    return results;
}

// Display or view function
function displayResult(result){
    
    let totalInterest = 0.00;
    let totalCost = 0.00;
    let templateRows = "";

    for (let i = 0; i < result.length; i++){
        templateRows += `<tr>`;
        templateRows += `<td>${result[i].Month}</td>`;
        templateRows += `<td style="text-align:right;">${result[i].Payment.toFixed(2)} $</td>`;
        templateRows += `<td style="text-align:right;">${result[i].Principal.toFixed(2)} $</td>`;
        templateRows += `<td style="text-align:right;">${result[i].Interest.toFixed(2)} $</td>`;
        templateRows += `<td style="text-align:right;">${result[i].TotalInterest.toFixed(2)} $</td>`;
        templateRows += `<td style="text-align:right;">${result[i].Balance.toFixed(2)} $</td>`;
        templateRows += `</tr>`;
        totalInterest += Math.round(result[i].Interest * 100) / 100;
        totalCost += Math.round(result[i].Payment *100) / 100;
    }
    document.getElementById("results").innerHTML = templateRows;

    document.getElementById("TotalPrincipal").innerHTML = `${parseFloat(document.getElementById("loanAmount").value).toFixed(2)} $`
    document.getElementById("TotalInterest").innerHTML = `${totalInterest.toFixed(2)} $`
    document.getElementById("TotalCost").innerHTML = `${totalCost.toFixed(2)} $`
}