const express = require('express');
const client = require('twilio')('ACa84acedb4869f922ee9165fbfcd0a264', '5032f1b952a021c751e2042037fa6b14');


module.exports = function(app) {
    app.post("/twilio" , (req, res) => {

        // console.log(req.body);
        
            const farmer = req.body.bookingDetails;
            // const phone = req.body.phone;
            // const paymentDetails = req.body.paymentDetails;
            // const BookedStalls = req.body.BookedStalls;
            // const stallsBooked = req.body.stallsBooked;
            // const totalAmount = req.body.totalAmount;

            console.log(farmer,"details")
            const details = `Your Booking Details\n
                            Name: ${farmer['farmer']} ,
                            phone: ${farmer['phone']} ,
                            paymentDetails: ${farmer['paymentDetails']} ,
                            BookedStalls: ${farmer['BookedStalls']} ,
                            stallsBooked: ${farmer['stallsBooked']} ,
                            address: ${farmer['address']}
                            totalAmount: ${farmer['totalAmount']}
                            `;
            console.log(details, farmer['phone']);
            

          
        client.messages.create({
            // $body : "farmer " . $farmer  ,
            
            body : details ,
            to: '+917498102556',
            from: '+15139023836'
          }).then(message => console.log(message))
           // here you can implement your fallback code
           .catch(error => console.log(error))
    });
};


