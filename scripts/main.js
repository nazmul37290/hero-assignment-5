const seats = document.getElementsByClassName("seat");
let ticketCount = 0;

for (const seat of seats) {
  seat.addEventListener("click", function (event) {
    ticketCount++;
    if (ticketCount === 4) {
      const couponBtn = document.getElementById("coupon-btn");
      couponBtn.removeAttribute("disabled");
    }
    if (ticketCount > 4) {
      alert("you cant buy more than 4");
      return;
    }
    event.target.disabled = "true";
    const nextBtn = document.getElementById("next-btn");
    const phoneNumber = document.getElementById("phone-number");
    phoneNumber.addEventListener("keyup", function (e) {
      if (ticketCount > 0 && phoneNumber.value.length > 0) {
        nextBtn.removeAttribute("disabled");
      } else {
        nextBtn.setAttribute("disabled", "true");
      }
    });

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = seat.innerText;
    const td2 = document.createElement("td");
    td2.innerText = "Economy";

    const td3 = document.createElement("td");
    td3.innerText = 550;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    const ticketListContainer = document.querySelector("table");
    ticketListContainer.appendChild(tr);

    const totalPrice = document.getElementById("total-price");
    const calculatedTotalPrice = parseInt(totalPrice.innerText) + 550;
    totalPrice.innerText = calculatedTotalPrice;

    const grandTotal = getInnerText("grand-total");
    setInnerText("grand-total", calculatedTotalPrice);

    // ___________
    setInnerText("selected-seat-count", ticketCount);

    const ticketLeft = document.getElementById("ticket-left");
    ticketLeft.innerText = ticketLeft.innerText - 1;
    seat.classList.add("bg-primary", "text-white");
  });
}

// ____________________
function setInnerText(elemenId, value) {
  const element = document.getElementById(elemenId);
  element.innerText = value;
}
function getInnerText(elemenId) {
  const element = document.getElementById(elemenId);
  const text = element.innerText;
  return text;
}
function getInputValue(elemenId) {
  const element = document.getElementById(elemenId);
  const text = element.value;
  return text;
}

function grandTotal() {
  const grandTotal = getInnerText("grand-total");
  convertedGrandTotal = parseInt(grandTotal);
  const couponText = getInputValue("coupon-text");

  if (couponText === "NEW15") {
    const discount = (convertedGrandTotal * 15) / 100;
    const calculatedGrandTotal = convertedGrandTotal - discount;
    setInnerText("grand-total", calculatedGrandTotal);
    //   _________
    const parent = document.getElementById("container");
    const child = document.getElementById("total-container");
    const div = document.createElement("div");
    const p1 = document.createElement("div");
    p1.innerText = "Discount";
    const p2 = document.createElement("div");
    p2.innerText = discount;

    div.appendChild(p1);
    div.appendChild(p2);
    div.classList.add("flex", "justify-around", "font-bold", "text-xl");

    parent.insertBefore(div, child);

    const couponContainer = document.getElementById("coupon-container");
    couponContainer.classList.add("hidden");
  } else if (couponText === "Couple 20") {
    const discount = (convertedGrandTotal * 20) / 100;
    const calculatedGrandTotal = convertedGrandTotal - discount;
    setInnerText("grand-total", calculatedGrandTotal);
    //   _________
    const parent = document.getElementById("container");
    const child = document.getElementById("total-container");
    const div = document.createElement("div");
    const p1 = document.createElement("div");
    p1.innerText = "Discount";
    const p2 = document.createElement("div");
    p2.innerText = discount;

    div.appendChild(p1);
    div.appendChild(p2);
    div.classList.add("flex", "justify-around", "font-bold", "text-xl");

    parent.insertBefore(div, child);

    const couponContainer = document.getElementById("coupon-container");
    couponContainer.classList.add("hidden");
  } else {
    alert("Coupon Code is not correct");
    document.getElementById("coupon-text").value = "";
  }
}

const nextBtn = document.getElementById("next-btn");
const phoneNumber = document.getElementById("phone-number").value;
console.log(phoneNumber);

if (ticketCount > 0 && phoneNumber.length > 0) {
  nextBtn.removeAttribute("disabled");
}

function successfulPurchase() {
  hideElementById("header");
  hideElementById("main");
  hideElementById("footer");
  showElementById("confirm-modal");
}

function showElementById(elemenId) {
  const element = document.getElementById(elemenId);
  element.classList.remove("hidden");
}
function hideElementById(elemenId) {
  const element = document.getElementById(elemenId);
  element.classList.add("hidden");
}
