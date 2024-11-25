const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit_booking', (req, res) => {
    const { name, email, service, date, payment } = req.body;
    const bookingDate = new Date();
    const formattedBookingDate = bookingDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    const newData = `Name: ${name}, Email: ${email}, Service: ${service}, Date: ${date}, Payment: ${payment}, Booking Date: ${formattedBookingDate}\n`;
    fs.appendFile('bookings.txt', newData, (err) => {
        if (err) {
            console.error('Error writing to bookings.txt:', err);
            res.status(500).send('Internal Server Error: Failed to write booking details');
            return;
        }

        console.log('Booking details saved:', newData);
        res.redirect('/success.html');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
