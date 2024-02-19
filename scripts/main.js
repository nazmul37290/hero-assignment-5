// calling all the seats

const seats = document.getElementsByClassName("seat");
let ticketCount = 0;

// looping all the seats
for (const seat of seats) {
  seat.addEventListener("click", function (event) {
    // 4 tickets enable coupon button
    ticketCount++;
    if (ticketCount === 4) {
      const couponBtn = document.getElementById("coupon-btn");
      couponBtn.removeAttribute("disabled");
    }

    // cannot buy more that 4 tickets
    if (ticketCount > 4) {
      alert("you cant buy more than 4");
      return;
    }
    // disable multiple click on same seat
    event.target.disabled = "true";

    //  enabled next button when condition are true
    const nextBtn = document.getElementById("next-btn");
    const phoneNumber = document.getElementById("phone-number");
    phoneNumber.addEventListener("keyup", function (e) {
      if (ticketCount > 0 && phoneNumber.value.length > 0) {
        nextBtn.removeAttribute("disabled");
      } else {
        nextBtn.setAttribute("disabled", "true");
      }
    });

    // adding ticket details in ticket container
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

    // calculating total price
    const totalPrice = document.getElementById("total-price");
    const calculatedTotalPrice = parseInt(totalPrice.innerText) + 550;
    totalPrice.innerText = calculatedTotalPrice;

    // set grand total
    const grandTotal = getInnerText("grand-total");
    setInnerText("grand-total", calculatedTotalPrice);

    // set selected seat count
    setInnerText("selected-seat-count", ticketCount);

    // set tickets left
    const ticketLeft = document.getElementById("ticket-left");
    ticketLeft.innerText = ticketLeft.innerText - 1;
    seat.classList.add("bg-primary", "text-white");
  });
}

// calculating grand total and coupon conditions

function grandTotal() {
  const grandTotal = getInnerText("grand-total");
  convertedGrandTotal = parseInt(grandTotal);
  const couponText = getInputValue("coupon-text");

  // coupon code 1
  if (couponText === "NEW15") {
    const discount = (convertedGrandTotal * 15) / 100;
    const calculatedGrandTotal = convertedGrandTotal - discount;
    setInnerText("grand-total", calculatedGrandTotal);
    //   creating discounted price section
    const parent = document.getElementById("container");
    const child = document.getElementById("total-container");
    const div = document.createElement("div");
    const p1 = document.createElement("p");
    p1.innerText = "Discount";
    const p2 = document.createElement("p");
    p2.innerText = discount;

    div.appendChild(p1);
    div.appendChild(p2);
    div.classList.add("flex", "justify-around", "font-bold", "text-xl");

    parent.insertBefore(div, child);

    const couponContainer = document.getElementById("coupon-container");
    couponContainer.classList.add("hidden");
  }
  // coupon 2
  else if (couponText === "Couple 20") {
    const discount = (convertedGrandTotal * 20) / 100;
    const calculatedGrandTotal = convertedGrandTotal - discount;
    setInnerText("grand-total", calculatedGrandTotal);
    //   creating discounted price section
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
  }
  // invalid coupon code condition
  else {
    alert("Coupon Code is not correct");
    document.getElementById("coupon-text").value = "";
  }
}

// show modal after buying tickets

function successfulPurchase() {
  hideElementById("header");
  hideElementById("main");
  hideElementById("footer");
  showElementById("confirm-modal");
}

//_____________ utility functions ___________________
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

function showElementById(elemenId) {
  const element = document.getElementById(elemenId);
  element.classList.remove("hidden");
}
function hideElementById(elemenId) {
  const element = document.getElementById(elemenId);
  element.classList.add("hidden");
}
