// import React from "react";
import React,{useEffect} from "react";
import '../../styles/Ticket.css'
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from '../../services/auth.headers';

function Ticket ({bookingDetails}) {
    useEffect(() => {
        twilioMsg();
        
    });
  
    const twilioMsg = async() => {
        console.log(bookingDetails)
        const orderUrl = "http://localhost:4000/twilio"; 
        const {data} = await axios.post(orderUrl,{bookingDetails:bookingDetails},{headers:authHeader()});
        console.log(data)
    }
    const {BookedStalls} = bookingDetails
    const navigate = useNavigate()
    const bookStr = BookedStalls?.toString();
    return (
        <>
        {bookingDetails ? <div className="invoice-box">
            <h2 className="thanks">Stall booking details</h2>
            <br/>
            <div className="invoice_details">
                <div>Farmer Name : {bookingDetails.farmer}</div>
                <br/>
                <div>Phone : {bookingDetails.phone}</div>
                <br/>
                <div>No. of Stalls Booked :{bookingDetails.stallsBooked}</div>
                <br/>
                <div>Stalls Booked : {bookStr}</div>
                <br/>
                <div>Payment Id : {bookingDetails.paymentDetails}</div>
                <br/>
                <div>Addess : {bookingDetails.address}</div>
                <br/>
                <div>Total Amount : {bookingDetails.totalAmount}</div>
                <br/>
            </div>
            <h2 className="thanks">Thank You !</h2>
            <div className="bookings_buttons">
                <button onClick={()=>{navigate('/farmers')}} className="btns_bookings">Continue Booking</button>
                <button onClick={()=>{navigate('../mybookings')}} className="btns_bookings">Check booked stalls</button>
            </div>
        </div> : <Spinner/>}
        </> 
     );
}

export default Ticket  ;