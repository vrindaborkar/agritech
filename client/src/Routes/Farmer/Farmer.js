import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdvanceBookings from "./AdvanceBookings";
import FarmersHome from "./FarmersHome";
import FarmersMain from "./FarmersMain";
import InwardData from "./InwardData";
import MyBookings from "./MyBookings";
import OutwardData from "./OutwardData";
import StallsPlaces from "./StallsPlaces";
import Test from "./Test";
import Ticket from "./Ticket";
import FarmerNav from "./FarmerNav";
import FarmerNavigation from "./FarmerNavigation";

const Farmer = () => {
  const [bookingDetails, setbookingDetails] = useState({
    farmer: "",
    phone: "",
    paymentDetails: "",
    BookedStalls: null,
    stallsBooked: null,
    totalAmount: null,
    address :"",
  });

  return (
    <Routes>
      <Route path="/" element={<FarmersMain />}>
        <Route index element={<FarmerNavigation />} />
        <Route path="/stallplaces" element={<StallsPlaces />} />
        <Route
          path="stallplaces/stalls/:Id"
          element={<Test setbookingDetails={setbookingDetails} />}
        />
        <Route path="/farmershome" element={<FarmersHome />} />
        <Route path="/inward" element={<InwardData />} />
        <Route
          path="/advancebookings"
          element={<AdvanceBookings setbookingDetails={setbookingDetails} />}
        />
        <Route path="/outward" element={<OutwardData />} />
        <Route
          path="/ticket"
          element={<Ticket bookingDetails={bookingDetails} />}
        />
        <Route path="/mybookings" element={<MyBookings />} />
      </Route>
    </Routes>
  );
};

export default Farmer;
