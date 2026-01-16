// Calculate EMI and store data
function submitForm() {
    const loan = parseFloat(document.getElementById("loanAmount").value);
    const rate = parseFloat(document.getElementById("interestRate").value);
    const years = parseInt(document.getElementById("loanTerm").value);
    const result = document.getElementById("result");
    const benefitsBtn = document.getElementById("benefitsBtn");

    if (!loan || !rate || !years) {
        result.innerHTML = "Please enter valid values.";
        return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const monthlyPayment =
        loan * monthlyRate * Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loan;

    // Store data for benefits page
    localStorage.setItem("loanAmount", loan.toFixed(2));
    localStorage.setItem("totalInterest", totalInterest.toFixed(2));
    localStorage.setItem("totalPayment", totalPayment.toFixed(2));

    result.innerHTML = `Monthly EMI: <b>$${monthlyPayment.toFixed(2)}</b>`;
    benefitsBtn.style.display = "block";
}

// Navigate to benefits page
function goToBenefits() {
    window.location.href = "./benefits.html";
}

// Load data on benefits page
window.onload = function () {
    if (document.getElementById("loan")) {
        document.getElementById("loan").innerText =
            localStorage.getItem("loanAmount");

        document.getElementById("interest").innerText =
            localStorage.getItem("totalInterest");

        document.getElementById("total").innerText =
            localStorage.getItem("totalPayment");
    }
};

// Go back to calculator
function goBack() {
    window.location.href = "./home.html";
}
