
// The price of the item for sale.
let price = 19.5;

// The cash-in-drawer (cid): a 2D array listing available currency.
// These values may be changed by tests.
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// DOM elements for interaction.
const cashInput = document.getElementById('cash');
const changeDueEl = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');

/**
 * Denominations in descending order, stored in cents to avoid floating point issues.
 */
const DENOMS = [
  { name: "ONE HUNDRED", val: 10000 },
  { name: "TWENTY", val: 2000 },
  { name: "TEN", val: 1000 },
  { name: "FIVE", val: 500 },
  { name: "ONE", val: 100 },
  { name: "QUARTER", val: 25 },
  { name: "DIME", val: 10 },
  { name: "NICKEL", val: 5 },
  { name: "PENNY", val: 1 }
];

/**
 * Formats a dollar amount exactly like the tests expect.
 * Examples: 60    -> "$60"
 *           0.5   -> "$0.5"
 *           0.04  -> "$0.04"
 */
function formatAmountJSStyle(amount) {
  const s = amount.toFixed(2); // "60.00", "0.50", "0.04"
  if (s.endsWith(".00")) return `$${s.slice(0, -3)}`;
  if (s.endsWith("0")) return `$${s.slice(0, -1)}`;
  return `$${s}`;
}

/**
 * Handles the purchase transaction when the purchase button is clicked.
 */
const handlePurchase = () => {
  const cash = parseFloat(cashInput.value) || 0;
  const priceCents = Math.round(price * 100);
  const cashCents = Math.round(cash * 100);

  // 1) Customer doesn't have enough
  if (cashCents < priceCents) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // 2) Exact cash -> no change
  if (cashCents === priceCents) {
    changeDueEl.textContent = "No change due - customer paid with exact cash";
    return;
  }

  // 3) Compute change needed and total in drawer in cents
  let changeNeededCents = cashCents - priceCents;
  const totalCIDcents = cid.reduce((sum, [, amt]) => sum + Math.round(amt * 100), 0);

  // 4) Not enough in drawer
  if (totalCIDcents < changeNeededCents) {
    changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // 5) Exact equal -> CLOSED (return the whole drawer, highest -> lowest)
  if (totalCIDcents === changeNeededCents) {
    const closedParts = [...cid]
      .reverse() // Highest to lowest
      .filter(([, amt]) => Math.round(amt * 100) > 0)
      .map(([name, amt]) => `${name}: ${formatAmountJSStyle(amt)}`)
      .join(" ");
    changeDueEl.textContent = `Status: CLOSED ${closedParts}`;
    return;
  }

  // 6) Attempt to make change (greedy), using cents
  const cidMap = new Map(cid.map(([name, amt]) => [name, Math.round(amt * 100)]));
  const changeParts = [];

  for (const { name, val } of DENOMS) {
    if (changeNeededCents <= 0) break;
    const available = cidMap.get(name) || 0; // in cents
    const canTake = Math.min(Math.floor(changeNeededCents / val) * val, available);
    if (canTake > 0) {
      changeParts.push([name, canTake / 100]); // store in dollars for display
      changeNeededCents -= canTake;
    }
  }

  // 7) If we couldn't make exact change
  if (changeNeededCents > 0) {
    changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // 8) Otherwise OPEN + show change breakdown (highest -> lowest)
  const changeString = changeParts
    .map(([name, amt]) => `${name}: ${formatAmountJSStyle(amt)}`)
    .join(" ");
  changeDueEl.textContent = `Status: OPEN ${changeString}`;
};

// Attach the event listener to the purchase button.
purchaseBtn.addEventListener('click', handlePurchase);