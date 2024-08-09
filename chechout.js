document.addEventListener("DOMContentLoaded", function () {
    // Declaring global variables for form elements
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const town = document.getElementById("town");
    const zip = document.getElementById("zip");
    const recoveryAddress = document.getElementById("recoveryAddress");
    const paymentType = document.getElementById("paymentType");
    const cardName = document.getElementById("cardName");
    const expiryDate = document.getElementById("expiryDate");
    const cvv = document.getElementById("cvv");

    const checkBtn = document.getElementById('check');

    // Attach the submitOrder function to the form submission event
    document.getElementById("checkout-form").addEventListener("submit", submitOrder);

    // Populate the order details on the checkout page when it loads
    populateOrderDetails();

    // Attach a click event listener to the 'check' button
    checkBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default button click behavior
        
        // Calculate the delivery date (assuming delivery takes 5 days)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);

        // Format the delivery date to a readable string
        const formattedDate = deliveryDate.toLocaleDateString("en-US", {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });

        // Prepare the order details for the alert message
        const orderDetails = `Name: ${name.value}\nEmail: ${email.value}\nPhone: ${phone.value}\nAddress: ${address.value}\nDelivery Date: ${formattedDate}`;
        
        // Display the alert with order details and delivery date
        alert(`Thank you for purchasing the order!\n${orderDetails}`);
    });

    // Function to handle order submission
    function submitOrder(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Retrieve values from form inputs
        const nameValue = name.value;
        const emailValue = email.value;
        const phoneValue = phone.value;
        const addressValue = address.value;
        const townValue = town.value;
        const zipValue = zip.value;
        const paymentTypeValue = paymentType.value;
        const cardNameValue = cardName.value;
        const expiryDateValue = expiryDate.value;
        const cvvValue = cvv.value;

        // Basic validation to check if all required fields are filled
        if (nameValue && emailValue && phoneValue && addressValue && townValue && zipValue && paymentTypeValue && cardNameValue && expiryDateValue && cvvValue) {
            // Calculate the delivery date (assuming delivery takes 5 days)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5);

            // Format the delivery date to a readable string
            const formattedDate = deliveryDate.toLocaleDateString("en-US", {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });

            // Retrieve the order details from localStorage
            const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
            let totalPrice = 0;

            // Generate the order summary HTML
            const orderSummary = orderDetails.map(detail => {
                const priceValue = parseFloat(detail.price.replace('Rs', ''));
                totalPrice += priceValue;

                return `
                    <tr>
                        <td>${detail.itemName}</td>
                        <td>${detail.category}</td>
                        <td>${detail.quantity}</td>
                        <td>${detail.price}</td>
                    </tr>
                `;
            }).join('');

            // Email parameters for sending order confirmation
            const emailParams = {
                name: nameValue,
                email: emailValue,
                phone: phoneValue,
                address: `${addressValue}, ${townValue}, ${zipValue}`,
                deliveryDate: formattedDate,
                orderSummary: orderSummary,
                totalPrice: `Rs${totalPrice.toFixed(2)}`
            };

            // Simulate sending the email (replace this with actual email sending logic)
            console.log('Sending email with the following parameters:', emailParams);

            // Alert the user with the delivery details
            alert(`Thank you for your purchase, ${nameValue}! Your order will be delivered to ${addressValue}, ${townValue}, ${zipValue} by ${formattedDate}.`);
        } else {
            alert("Please fill in all required fields.");
        }
    }

    // Function to populate order details on the checkout page
    function populateOrderDetails() {
        // Retrieve the order details from localStorage
        const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
        const tableBody = document.querySelector('#checkout-order-table tbody');
        let totalPrice = 0;

        // Loop through each order detail and create a table row
        orderDetails.forEach(detail => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${detail.itemName}</td>
                <td>${detail.category}</td>
                <td>${detail.quantity}</td>
                <td>${detail.price}</td>
            `;
            tableBody.appendChild(row);

            // Extract price from the string, remove 'Rs', and convert to a number
            const priceValue = parseFloat(detail.price.replace('Rs', ''));
            totalPrice += priceValue;
        });

        // Update the total price in the document
        document.getElementById('total-price').textContent = `Rs${totalPrice.toFixed(2)}`;
    }
});
