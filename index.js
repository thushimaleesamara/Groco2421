/*const prices = {
    'Apple':500,
    'Banana':350,
    'Orange':400,
    'Grapes':850,
    'Mango':450,
    'Pomegranate':1000,
    'Carrot': 200,
    'Beans':300,
    'beet-root':250,
    'Potato': 600,
    'Tomato':320,
    'bell-pepper':640,
    'milk-powder':2000,
    'Cheese': 1000,
    'Yogurt':80,
    'Ice-Cream':1500,
    'Wip Cream': 1200,
    'Eggs': 800,
    'Chicken':1200,
    'Salmon':1500,
    'Beef':1400,
    'Shrimp':2000,
    'Pork':890,
    'Lamb':950,
    'Flour':600,
    'Sugar':800,
    'Baking Powder':200,
    'salt':450,
    'Condanced Milk':1200,
    'chocolate-powder':560,
};

function addItem(name, category) {
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(' ', '-')}-quantity`);
    const quantity = parseFloat(quantityInput.value);
    if (quantity > 0) {
        const price = prices[name] * quantity;
        const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;
        
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.cells[0].textContent === name) {
                const existingQuantity = parseFloat(row.cells[2].textContent);
                row.cells[2].textContent = (existingQuantity + quantity).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + price).toFixed(2);
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = name;
            row.insertCell(1).textContent = category;
            row.insertCell(2).textContent = quantity.toFixed(1);
            row.insertCell(3).textContent = price.toFixed(2);
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
        updateTotalPrice();
        alert(`Added ${quantity.toFixed(1)} kg of ${name} to your order.`);
    } else {
        alert(`Please enter a quantity greater than 0 for ${name}.`);
    }
}

function removeItem(button) {
    const row = button.parentNode.parentNode;
    const price = parseFloat(row.cells[3].textContent);
    const quantity = parseFloat(row.cells[2].textContent);
    row.parentNode.removeChild(row);
    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    let totalPrice = 0;
    const rows = document.querySelectorAll('#order-table tbody tr');
    rows.forEach(row => {
        const price = parseFloat(row.children[3].textContent);
        totalPrice += price;
    });
    document.getElementById('total-price').textContent = `Rs${totalPrice.toFixed(2)}`;
}

function navigateToCheckout() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const orderDetails = [];
    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;
        orderDetails.push({ itemName, category, quantity, price });
    });
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = './checkout.html'; // Redirect to checkout page
}

function addToFavourites() {
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');
    let favourites = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const item = row.cells[0].textContent;
        const category = row.cells[1].textContent;
        const quantity = parseInt(row.cells[2].textContent);
        const price = parseFloat(row.cells[3].textContent);
        favourites.push({ item, category, quantity, price });
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Your selected items have been added to favourites!\nYou can Apply your order after order the products! ');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    favourites.forEach(fav => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = fav.item;
        row.insertCell(1).textContent = fav.category;
        row.insertCell(2).textContent = fav.quantity;
        row.insertCell(3).textContent = fav.price.toFixed(2);
        row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
    });
    alert('Your Choose products added to the Order!....');
    updateTotalPrice();
}

function clearLocalStorage() {
    localStorage.removeItem('favourites');
    alert('Your favourites have been cleared!\nYou can choose products again...');
}*/

// Define an object with prices for various items
const prices = {
    'Apple': 500,
    'Banana': 350,
    'Orange': 400,
    'Grapes': 850,
    'Mango': 450,
    'Pomegranate': 1000,
    'Carrot': 200,
    'Beans': 300,
    'beet-root': 250,
    'Potato': 600,
    'Tomato': 320,
    'bell-pepper': 640,
    'milk-powder': 2000,
    'Cheese': 1000,
    'Yogurt': 80,
    'Ice-Cream': 1500,
    'Wip Cream': 1200,
    'Eggs': 800,
    'Chicken': 1200,
    'Salmon': 1500,
    'Beef': 1400,
    'Shrimp': 2000,
    'Pork': 890,
    'Lamb': 950,
    'Flour': 600,
    'Sugar': 800,
    'Baking Powder': 200,
    'salt': 450,
    'Condanced Milk': 1200,
    'chocolate-powder': 560,
};

// Function to add an item to the order
function addItem(name, category) {
    // Get the quantity input element for the specific item by its name, converting to lowercase and replacing spaces with hyphens
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(' ', '-')}-quantity`);

    // Parse the input value to a float (decimal number)
    const quantity = parseFloat(quantityInput.value);

    // Check if the quantity is greater than 0
    if (quantity > 0) {
        // Calculate the total price for the selected quantity of the item
        const price = prices[name] * quantity;

        // Get the table body where order items will be listed
        const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];

        // Get all existing rows in the table body
        const rows = tableBody.getElementsByTagName('tr');

        // Initialize a flag to check if the item already exists in the order
        let itemExists = false;

        // Loop through all rows to see if the item is already in the order
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i]; // Get the current row

            // Check if the item name matches the current row's first cell (name column)
            if (row.cells[0].textContent === name) {
                // If the item exists, update the quantity and price
                    // Get the existing quantity
                const existingQuantity = parseFloat(row.cells[2].textContent);
                // Update the quantity
                row.cells[2].textContent = (existingQuantity + quantity).toFixed(1); 
                 // Update the price
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + price).toFixed(2);
                // Set the flag to true
                itemExists = true; 
                // Exit the loop
                break; 
            }
        }

        // If the item does not exist, add a new row to the table
        if (!itemExists) {
            // Insert a new row at the end of the table body
            const row = tableBody.insertRow(); 
            // Add the item name to the first cell
            row.insertCell(0).textContent = name; 
            // Add the item category to the second cell
            row.insertCell(1).textContent = category; 
            // Add the quantity to the third cell
            row.insertCell(2).textContent = quantity.toFixed(1); 
            // Add the total price to the fourth cell
            row.insertCell(3).textContent = price.toFixed(2); 
            // Add a remove button to the fifth cell
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>'; 
        }

         // Update the total price of the order
        updateTotalPrice();
        alert(`Added ${quantity.toFixed(1)} kg of ${name} to your order.`); // Show an alert to confirm the item was added
    } else {
        alert(`Please enter a quantity greater than 0 for ${name}.`); // Show an alert if the quantity is not greater than 0
    }
}

// Function to remove an item from the order
function removeItem(button) {
    // Get the row containing the clicked remove button
    const row = button.parentNode.parentNode; 
    // Remove the row from the table body
    row.parentNode.removeChild(row); 
    // Update the total price of the order after removing the item
    updateTotalPrice(); 
}

// Function to update the total price of the order
function updateTotalPrice() {
    let totalPrice = 0; // Initialize the total price to 0

    // Get all rows in the table body
    const rows = document.querySelectorAll('#order-table tbody tr');

    // Loop through each row to calculate the total price
    rows.forEach(row => {
         // Get the price from the fourth cell of the row
        const price = parseFloat(row.children[3].textContent);
        // Add the price to the total
        totalPrice += price; 
    });

    // Update the total price in the document (in the element with id 'total-price')
    document.getElementById('total-price').textContent = `Rs${totalPrice.toFixed(2)}`;
}

// Function to navigate to the checkout page
function navigateToCheckout() {
    // Get all rows in the table body
    const rows = document.querySelectorAll('#order-table tbody tr'); 

    // Initialize an array to hold the order details
    const orderDetails = [];

    // Loop through each row to get the order details
    rows.forEach(row => {
        const itemName = row.children[0].textContent; // Get the item name from the first cell
        const category = row.children[1].textContent; // Get the category from the second cell
        const quantity = row.children[2].textContent; // Get the quantity from the third cell
        const price = row.children[3].textContent; // Get the price from the fourth cell
        orderDetails.push({ itemName, category, quantity, price }); // Add the order details to the array
    });

    // Save the order details to local storage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Redirect to the checkout page
    window.location.href = './checkout.html';
}

// Function to add selected items to favourites
function addToFavourites() {
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0]; // Get the table body
    const rows = tableBody.getElementsByTagName('tr'); // Get all rows in the table body

    // Initialize an array to hold favourite items
    let favourites = [];

    // Loop through each row to get the favourite items
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]; // Get the current row
        const item = row.cells[0].textContent; // Get the item name from the first cell
        const category = row.cells[1].textContent; // Get the category from the second cell
        const quantity = parseInt(row.cells[2].textContent); // Get the quantity from the third cell
        const price = parseFloat(row.cells[3].textContent); // Get the price from the fourth cell
        favourites.push({ item, category, quantity, price }); // Add the item details to the favourites array
    }

    // Save the favourites to local storage
    localStorage.setItem('favourites', JSON.stringify(favourites));

    // Show an alert to confirm the items were added to favourites
    alert('Your selected items have been added to favourites!\nYou can Apply your order after ordering the products!');
}

// Function to apply favourite items to the current order
function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Get favourites from local storage or an empty array
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0]; // Get the table body

    // Loop through each favourite item and add it to the order table
    favourites.forEach(fav => {
        const row = tableBody.insertRow(); // Insert a new row at the end of the table body
        row.insertCell(0).textContent = fav.item; // Add the item name to the first cell
        row.insertCell(1).textContent = fav.category; // Add the item category to the second cell
        row.insertCell(2).textContent = fav.quantity; // Add the quantity to the third cell
        row.insertCell(3).textContent = fav.price.toFixed(2); // Add the price to the fourth cell
        row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>'; // Add a remove button to the fifth cell
    });

    // Show an alert to confirm the favourite items were added to the order
    alert('Your chosen products have been added to the order!');

    updateTotalPrice(); // Update the total price of the order after adding favourites
}

// Function to clear favourites from local storage
function clearLocalStorage() {
    localStorage.removeItem('favourites'); // Remove favourites from local
}
