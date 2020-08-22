const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
let amountEl_one = document.getElementById("amount-one");
let amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swapButton = document.getElementById("swap");

// fetch exchange rates and update the DOM
const calculate = async () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  let res = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${currency_one}`
  );
  res = await res.json();
  const rate = res.rates[currency_two];
  rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
};

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swapButton.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();

// Event Listeners
