const express = require('express');
const client = require('twilio')('ACa84acedb4869f922ee9165fbfcd0a264', '055a4b55623929289576b9dded4bc3fb');


module.exports = function(app) {

    app.post("/twilio" , (req, res) => {

        
         //console.log(req.body);
        
            const farmer = req.body.bookingDetails;
           
            // const phone = req.body.phone;
            // const paymentDetails = req.body.paymentDetails;
            // const BookedStalls = req.body.BookedStalls;
            // const stallsBooked = req.body.stallsBooked;
            // const totalAmount = req.body.totalAmount;
            //address: ${farmer['address']},

            console.log("details --> ",farmer)
            const details = `Your Booking Details\n
                            Name: ${farmer['farmer']} ,
                            phone: ${farmer['phone']} ,
                            paymentDetails: ${farmer['paymentDetails']} ,
                            BookedStalls: ${farmer['BookedStalls']} ,
                            stallsBooked: ${farmer['stallsBooked']} ,
                            totalAmount: ${farmer['totalAmount']}
                            `;
            // console.log(details, farmer['phone']);
            
         //var details = "heelloooo";
          
        client.messages.create({
            // $body : "farmer " . $farmer  ,
            
            body : details ,
            to: '+918888643025',
            from: '+15005550006'
          }).then(message => console.log(message))
           // here you can implement your fallback code
           .catch(error => console.log("error:::::::",error.message))
    });
};


// 