// This script will add menu items and total amount to the menu list container
const menuList = document.getElementById('menuList');
const totalAmount = document.getElementById('totalAmount');

// Sample data for menu items
const menuItems = [
  { name: '주문한 메뉴 1', price: 10000 },
  { name: '주문한 메뉴 2', price: 12000 },
  { name: '주문한 메뉴 3', price: 15000 },
  { name: '주문한 메뉴 4', price: 17000 },
  { name: '주문한 메뉴 5', price: 19000 },
  { name: '주문한 메뉴 6', price: 22000 },
  { name: '주문한 메뉴 7', price: 24000 },
  { name: '주문한 메뉴 8', price: 27000 },
  { name: '주문한 메뉴 9', price: 30000 },
  { name: '주문한 메뉴 10', price: 35000 },
  // Add more items as needed
];

// Function to add a menu item to the list
function addMenuItem(item) {
  const div = document.createElement('div');
  div.className = 'menu-item';
  div.innerHTML = `<span>${
    item.name
  }</span><span>${item.price.toLocaleString()}원</span>`;
  menuList.appendChild(div);
}

// Function to calculate and add the total amount at the end of the list
function calculateAndShowTotalAmount() {
  const total = menuItems.reduce((acc, item) => acc + item.price, 0);
  totalAmount.innerHTML =
    '<span>총 금액:</span><span>' + total.toLocaleString() + '원</span>';
}

// Add each menu item to the list
menuItems.forEach(addMenuItem);

// Calculate and show total amount
calculateAndShowTotalAmount();
