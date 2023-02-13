import "../../styles/Test.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Stall from "./Stall";
import authHeader from "../../services/auth.headers";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
import dayjs from "dayjs";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectSeatModal from "../../components/SelectSeatModal";
import { Button, Typography } from "@mui/material";
// Added
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

const userCurr = AuthService.getCurrentUser();

function Test({ setbookingDetails , setValue }) {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [Loading, setLoading] = useState();
  const { Id } = useParams();
  const [value, setvalue] = useState();
  const [alreadyBooked, setAlreadyBooked] = useState();
  const[alreadyBookedLocataion,setAlreadyBookedLocation] = useState(0);
  const [open, setOpen] = useState();
  const[cashOnDelivery,setCashOnDelivery] = useState(false);
  const[totalStall,setTotalStalls] = useState(0);
  const[available,setAvailable] = useState(0);

  useEffect(() => {
    setLoading(true);
    FarmerService.getMyStalls().then((response) => {
      setLoading(false);
      setdata(response.data);
    });

    FarmerService.getBookedStalls().then((response) => {
     const res = response.data && response.data.filter((e) => e.location === `${Id}`);
     setAlreadyBooked(response.data);
     setAlreadyBookedLocation(res.length-1);
     
      console.log("already booked",res.length-1);
    
    });
    handleOpen(true);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const res = data && data.filter((e) => e.location === `${Id}`);
    setUpdatedData(res);
    console.log("Data--->",data);

    if(UpdatedData)
    {
      //setAvailable(UpdatedData.length);
      setTotalStalls(UpdatedData.length)
      
      setAvailable(Math.abs(totalStall-alreadyBookedLocataion))
    }
    
    
  }, [Id, data]);
  
  const confirmBookingCash = async(e) =>{
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );
    console.log(bookedStalls.length);
    console.log("price" ,price)
    if (bookedStalls.length === 0) {
      toast.warn("Failed to book stalls!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let bookedStats = bookedStalls.toString();
    const responseData = {
      location: Id,
      bookedStalls: bookedStalls,
      bookedBy: userCurr.id,
      bookedAt: dayjs(Date.now()).format("YYYY-MM-DD"),
      isBooked: true,
    };

    const stallsBooked = [];
    bookedStalls.forEach((e) => {
      stallsBooked.push(e.stallName);
    });

    // const price = bookedStalls.reduce(
    //   (total, item) => item.stallPrice + total,
    //   0
    // );
    const Url = "https://wingrowmarket.onrender.com/bookedstalls";
    const orderId="123"
    axios
      .post(Url, responseData, { headers: authHeader() })
      .then((response) => {
        const { data } = response;
        if (data) {
          setbookingDetails({
            farmer: userCurr.firstname + " " + userCurr.lastname,
            phone: userCurr.phone,
            paymentDetails: orderId,
            BookedStalls: stallsBooked,
            stallsBooked: bookedStalls.length,
            totalAmount: price,
            address :bookedStalls[0].address
          });
        }
        toast.success("stalls booked successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("../ticket");
        }, 1000);
      })
      .catch((error) => {
        toast.warn("Failed to book stalls!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setBookedStalls([]);
        setNumberOfSeats(0);
      });

  }

  const confirmBooking = async (e) => {
    if(cashOnDelivery){
      confirmBookingCash();
    }
    else{
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );
    
    console.log(bookedStalls.length);
    console.log("price" ,price)
    if (bookedStalls.length === 0) {
      toast.warn("Failed to book stalls!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const orderUrl = "https://wingrowmarket.onrender.com/order";
      const { data } = await axios.post(
        orderUrl,
        { amount: price * 100 },
        { headers: authHeader() }
      );
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  };

  const initPayment = (data) => {
    let bookedStats = bookedStalls.toString();
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      bookedStalls: bookedStats,
      description: "Wingrow Agritech",
      
      handler: async (response) => {
        
        try {

          var orderId;
          if(!cashOnDelivery){
            const verifyUrl = "https://wingrowmarket.onrender.com/verify";
            const { data } = await axios.post(verifyUrl, response, {
            headers: authHeader(),
          });
           orderId = data.orderId;
          }else{
            orderId = "123"
          }
          

          const responseData = {
            location: Id,
            bookedStalls: bookedStalls,
            bookedBy: userCurr.id,
            bookedAt: dayjs(Date.now()).format("YYYY-MM-DD"),
            isBooked: true,
          };

          const stallsBooked = [];
          bookedStalls.forEach((e) => {
            stallsBooked.push(e.stallName);
          });

          const price = bookedStalls.reduce(
            (total, item) => item.stallPrice + total,
            0
          );
          const Url = "https://wingrowmarket.onrender.com/bookedstalls";

          axios
            .post(Url, responseData, { headers: authHeader() })
            .then((response) => {
              const { data } = response;
              if (data) {
                setbookingDetails({
                  farmer: userCurr.firstname + " " + userCurr.lastname,
                  phone: userCurr.phone,
                  paymentDetails: orderId,
                  BookedStalls: stallsBooked,
                  stallsBooked: bookedStalls.length,
                  totalAmount: price,
                  address :bookedStalls[0].address
                });
              }
              toast.success("stalls booked successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                navigate("../ticket");
              }, 1000);
            })
            .catch((error) => {
              toast.warn("Failed to book stalls!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setBookedStalls([]);
              setNumberOfSeats(0);
            });
        } catch (error) {
          console.log(error);
          setBookedStalls([]);
          setNumberOfSeats(0);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleClick = (ev) => {
    console.log("already ", alreadyBookedLocataion)
    //console.log(userCurr)

    console.log("booked " ,bookedStalls);
    console.log("number of seats ",numberOfSeats);
    console.log(ev.target)
    if (numberOfSeats && ev.target.className !== "booked") {
      console.log("available:", (available))
      const seatsToBook = parseInt(numberOfSeats, 20);
      if (bookedStalls.length <= seatsToBook) {
        
        if (bookedStalls.includes(ev.target.id)) {
          console.log('hello')
          //if already selected then remove it
          const newAvailable = Math.abs(bookedStalls.filter(
            (seat) => seat !== ev.target.id
          ));
          console.log("newavailable:",newAvailable)
          
          setBookedStalls(newAvailable);
          setAvailable(Math.abs(available + 1));
        } else if (bookedStalls.length < numberOfSeats) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          console.log("here booked");
          setAvailable(Math.abs(available - 1));
          //console.log(userCurr)
          setBookedStalls([...bookedStalls, item[0]]);
        } else if (bookedStalls.length === seatsToBook) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          bookedStalls.shift();
          setBookedStalls([...bookedStalls, item[0]]);
        }
      }
    }
    //console.log(bookedStalls.map(function(v,i){return v.stallPrice}));
    
  };

  const lengthofUpdatedData = UpdatedData?.length;
  //UpdatedData?.length
  const handleChange = (e , newValue) => {
    // console.log(e.target);
    setNumberOfSeats(e.target.value);
    console.log(numberOfSeats)
    setValue(e.target.value);
  };


// const up=()=>{
//   setValue1(value1 + 1)
//   setNumberOfSeats( value1+1)
//   //console.log("number of seats:",numberOfSeats);
//   //  console.log(value1) 
//   // console.log("numderofseats on up:", numberOfSeats) 
// }
// const down=()=>{
//   setValue1(value1 - 1)
//   setNumberOfSeats( value1-1)
//   //console.log("number of seats:", numberOfSeats);
//   //  console.log(value1) 
//   //  console.log("numderofseats on down:", numberOfSeats) 
// }
  return (
    <>
      {/* <Link style={{ marginTop: '10px' }} className="backbtn green" to="/farmers" >
        Back
      </Link> */}
      {!Loading ? (
        
        <div className="Test">
        
          <h2 className="market-name">{Id}</h2>
          <div className="main_container_stalls">
            <Grid className="input-div-holder" container spacing={2}>
              <Grid style={{margin:"auto"}} item xs={12} sm={6}>
                <InputLabel className="stall-booking-lable">
                  Number Of Stall Required
                </InputLabel>
                <TextField 
                // className="stall-booking-input"
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  name="number-of-stalls-req"
                  required
                  placeholder="00"
                  fullWidth
                  type="number"
                  id="number-of-stalls-req"
                  autoFocus
                  color="success"
                  className="textfield"
                  onChange={handleChange}
                  // margin="normal"
                  
                />

                {/* <input type="text" value={value1} onChange={(event) => setValue1(event.target.value)}  />
                <button onClick={up}>+</button>
                <button onClick={down}>-</button> */}
                
               
              </Grid>
            </Grid>
            <Grid className="advance-booking">
            <Link to="../advancebookings" className='advancebookinglink'>Advance booking !</Link>
            </Grid>
            <Grid className="stall-position-grid">
              <InputLabel className="stall-booking-lable">
                Select Stall Position
              </InputLabel>
              <Grid className="stalls-count-cantainer">
                <Grid>
                  <div className="stalls-count-div">
                    <Typography className="count">Total Stalls :{totalStall}</Typography>
                    <Typography className="count">
                      Available Stalls :{available}
                    </Typography>
                  </div>
                </Grid>
                <Grid>
                  {UpdatedData && Id ? (
                    <div className="stall_wrapper">
                      {lengthofUpdatedData === 34 && (
                        <div className="StallsContainer">
                          <Stall
                            data={UpdatedData.slice(0, 16)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(16, 17)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(17, 18)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(18, 34)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                        </div>
                      )}
                      {lengthofUpdatedData === 50 && (
                        <div className="StallsContainer">
                          <Stall
                            data={UpdatedData.slice(0, 24)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(24, 25)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(25, 26)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(26, 50)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="select_market">
                      <h2>Please select the market</h2>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid className="stall-pricing-grid">
                <div className="stall-pricing-main-div">
                  <div className="price-holder">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#AACE48",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">100/-</div>
                  </div>
                  <div className="price-holder">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#3AA54B",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">300/-</div>
                  </div>
                  <div className="price-holder">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#A42A56",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">500/-</div>
                  </div>
                  <div className="price-holder">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#B3B3B3",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">Booked</div>
                  </div>
                </div>
                <Divider className="divider" />
                <div className="stall-total-amount-holder">
                  <div className="total-amount">Total Amount</div>
                  <div className="total-amount">Rs.{bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    )}/-</div>
                </div>
              </Grid>
            </Grid>
            {numberOfSeats !== 0 && bookedStalls.length !== 0 ? (
              <div className="modalbtn">
                <ConfirmModal setCashOnDelivery={setCashOnDelivery} confirmBooking={confirmBooking} />
              </div>
            ) : (
              <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={6}>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <Button 
                style={{ width: "110px", height: "40px",paddingLeft:'5rem', paddingRight:'5rem', margin:'1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                PAY
                </Button>
                <Button style={{ width: "110px", height: "40px",paddingLeft:'5rem', paddingRight:'5rem', margin:'1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                PAY ON DELIVERY
                </Button>
                </div>
              </Grid>  
              </Grid>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Test;


