const currencies = [
    { code: "USD", name: "United States Dollar"},
    { code: "EUR", name: "Euro"  },
    { code: "GBP", name: "British Pound"},
    { code: "INR", name: "Indian Rupee"},
    { code: "JPY", name: "Japanese Yen"},
    { code: "CAD", name: "Canadian Dollar"},
    { code: "AUD", name: "Australian Dollar" },
    { code: "CNY", name: "Chinese Yuan"},
    { code: "CHF", name: "Swiss Franc"},
    { code: "SGD", name: "Singapore Dollar"}
];
const currencyFrom = document.getElementById("from-currency");
const currencyTo = document.getElementById("to-currency");
const resultField = document.getElementById("result");
const rateInfo = document.getElementById("exchange-rate");



currencies.forEach(currency => {
    let option1 = document.createElement("option");
    option1.value = currency.code;
   option1.innerHTML =  currency.code+"-"+currency.name;
    currencyFrom.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = currency.code;
   option2.innerHTML =  currency.code+"-"+currency.name;
    currencyTo.appendChild(option2);
});

// Handle swap functionality
document.getElementById("swap-btn").addEventListener("click", function() {
    let temp = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;
});

    document.getElementById('start-btn').addEventListener('click', function() {
   
  
   document.getElementById('main-app').classList.remove('hidden');
});

// Convert currency
async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = currencyFrom.value;
    let toCurrency = currencyTo.value;
    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        let data = await response.json();
        let exchangeRate = data.rates[toCurrency];

        if (exchangeRate) {
            let convertedAmount = (amount * exchangeRate).toFixed(2);
            resultField.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            rateInfo.innerHTML = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;

          
        } else {
            resultField.innerHTML = "Conversion not available!";
            factsDiv.innerHTML = "";
        }
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        resultField.innerHTML = "Failed to fetch rates!";
        factsDiv.innerHTML = "";
    }
}
/*{
    "base": "USD",
    "date": "2025-03-25",
    "rates": {
        "USD": 1,
        "EUR": 0.85,
        "GBP": 0.75,
        "INR": 75.00,
        "JPY": 110.00,
        "CAD": 1.25,
        "AUD": 1.35,
        "CNY": 6.50,
        "CHF": 0.92,
        "SGD": 1.34
    }
}*/