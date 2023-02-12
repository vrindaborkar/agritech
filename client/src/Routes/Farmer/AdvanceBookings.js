import React, { useState, useEffect } from "react";
import Datepicker from "../../components/Datepicker";
import "../../styles/AdvanceBookings.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Stall from "./Stall";
import authHeader from "../../services/auth.headers";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { TextField, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import SelectSeatModal from "../../components/SelectSeatModal";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
// import Spinner from '../../components/Spinner';
const userCurr = AuthService.getCurrentUser();
const today = new Date();
const todayFormatted = today.toISOString().slice(0, 10);
const locations = [
  { location: "Hadapsar" },
  { location: "Karve Nagar" },
  { location: "Kharadi" },
  { location: "Wanawadi" },
  { location: "Magarpatta" },
  { location: "Amanora City" },
  { location: "Bramhasun City" },
];

const AdvanceBookings = ({ setbookingDetails,setValue }) => {
  const [location, setlocation] = useState("");
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [value, setvalue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const [alreadyBooked, setAlreadyBooked] = useState();
  const [open, setOpen] = useState();
  const [date,setdate] = useState(0);
  const [totalStall, setTotalStalls] = useState(0);
  const [available, setAvailable] = useState(0);
  const [Loading, setLoading] = useState();
  const [alreadyBookedLocataion, setAlreadyBookedLocation] = useState(0);
  const { Id } = useParams();
  const currentDate=0
  const lengthofUpdatedData = UpdatedData?.length;
  //UpdatedData?.length
  const handleChange = (e, newValue) => {
    if (e.target.value <= -1) {
      setNumberOfSeats(0);
      setvalue(0);
    }
    else if (e.target.value <= available) {
      setNumberOfSeats(e.target.value);
      setvalue(e.target.value);
    } else {
      setNumberOfSeats(available);
      setvalue(available);
    }
  };


  useEffect(() => {
    setLoading(true);
    FarmerService.getMyStalls().then((response) => {
      setLoading(false);
      setdata(response.data);
    });

    FarmerService.getBookedStalls().then((response) => {
      const res = response.data && response.data.filter((e) => e.location === `${Id}`);
      setAlreadyBooked(response.data);
      setAlreadyBookedLocation(res.length);

      console.log("already booked", res.length);

    });
    handleOpen(true);
  }, []);

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
    const res = data && data.filter((e) => e.location === `${location}`);
    setUpdatedData(res);
  }, [location, data, value]);


  // useEffect(() => {
  //   const res = data && data.filter((e) => e.location === `${Id}`);
  //   setUpdatedData(res);
  //   console.log("Data--->", UpdatedData);
  // }, [Id, data]);

  useEffect(() => {
    if (UpdatedData) {
      setTotalStalls(UpdatedData.length)
      console.log(totalStall)
      setAvailable(totalStall - alreadyBookedLocataion)
    }
  }, [UpdatedData,totalStall]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmBooking = async (e) => {
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );

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
      // const orderUrl = "https://wingrowagritech.herokuapp.com/order";
      const orderUrl = "http://localhost:4000/order";
      const { data } = await axios.post(
        orderUrl,
        { amount: price * 100 },
        { headers: authHeader() }
      );
      initPayment(data.data);
    } catch (error) {
      console.log(error);
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
          const verifyUrl = "http://localhost:4000/verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: authHeader(),
          });
          const orderId = data.orderId;
          console.log('tot')
          const responseData = {
            location: location,
            bookedStalls: bookedStalls,
            bookedBy: userCurr.id,
            bookedAt: dayjs(value).format("YYYY-MM-DD" ),
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
          const Url = "http://localhost:4000/bookedstalls";

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
    const handlechange1 = (event) => {
      if (dayjs(event.target.value).format("YYYY-MM-DD") <=  todayFormatted){
        setdate(todayFormatted)
        toast.warn("Please select a date after today\'s date", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       // alert('here')
       // alert(dayjs(event.target.value).format("YYYY-MM-DD") + " " + todayFormatted)
      }
      else{
        //alert(dayjs(event.target.value).format("YYYY-MM-DD") + " " + todayFormatted)
      setdate(dayjs(event.target.value).format("YYYY-MM-DD"));
      
      }
  };

  const handleClick = (ev) => {
    console.log("already ", alreadyBooked)
    //console.log(userCurr)

    console.log("booked ", bookedStalls);
    console.log("number of seats ", numberOfSeats);
    console.log(ev.target)
    if (numberOfSeats && ev.target.className !== "booked") {
      const seatsToBook = parseInt(numberOfSeats, 20);
      if (bookedStalls.length <= seatsToBook) {

        if (bookedStalls.includes(ev.target.id)) {

          //if already selected then remove it
          const newAvailable = bookedStalls.filter(
            (seat) => seat !== ev.target.id
          );
          setBookedStalls(newAvailable);
          setAvailable(available + 1);
        } else if (bookedStalls.length < numberOfSeats) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          console.log("here booked");
          setAvailable(available - 1);
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

  const alertStyles = {
    backgroundColor: '#f2dede',
    border: '1px solid #ebccd1',
    color: '#a94442',
    padding: '15px',
    textAlign: 'center',
    marginBottom: '15px'
  };
  

  return (
    
    <div className="Test">
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Link to="../" className="advancebookinglinkback">
        Go Back to stalls!
      </Link>
      <div className="main_container_stalls">
        <Grid className="input-div-holder" container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="stall-booking-lable">
              Enter Booking Date
            </InputLabel>
            <TextField
              inputlabelprops={{
                style: { fontSize: 14, fontFamily: "monospace" },
              }}
              name="booking-date"
              required
              fullWidth
              type="date"
              id="booking-date"
              autoFocus
              value={date}
              // setValue={(e)=>{setvalue(e.nativeEvent.value)}}
              onChange={handlechange1}
              color="success"
              className="textfield"
            />
            {console.log(date)}
          </Grid>
          <Grid  className="select-market-grid" item xs={12} sm={6}>
            <FormControl className="formcontrol" sx={{ width: "100%", fontSize: 14 }}>
              <InputLabel color="success" className="stall-booking-lable">
                Market
              </InputLabel>
              <Select
                className="textfield"
                id="demo-simple-select-autowidth"
                value={location}
                color="success"
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                label="address"
                name="address"
                required
              >
                {locations.map((e, i) => {
                  return (
                    <MenuItem key={i} value={e.location}>
                      {e.location}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
                <InputLabel className="stall-booking-lable">
                  Number Of Stall Required
                </InputLabel>
                <TextField
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
                  value={value}
                  onChange={handleChange}
                />
              </Grid>
        </Grid>
        

        <div className="secondary_container_stalls">
          {UpdatedData && location !== "" ? (
            <Grid className="stalls-count-cantainer">
            
            <div className="stall_wrapper">
                     
                        <div className="StallsContainer">
                  <Grid>
                    <div className="stalls-count-div">
                      <Typography className="count">Total Stalls :{totalStall}</Typography>
                      <Typography className="count">
                        Available Stalls :{available}
                      </Typography>
                    </div>
                  </Grid>
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
                    </div>
            </Grid>
           ) : (
            <div className="select_market">
              <h2>Please select the market</h2>
            </div>
          )}
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
          <div className="modal_btn">
            <ConfirmModal confirmBooking={confirmBooking} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdvanceBookings;
