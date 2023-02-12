import React from 'react'
import { Link } from "react-router-dom";

function FarmerNavigation() {
  return (
    <div>
          <div className="farmerScreen">
              <Link className="links_farmersdata red" to="./stallplaces">
                  Book Stall
              </Link>
              <Link className="links_farmersdata green" to="./mybookings">
                  My Bookings
              </Link>
              <Link className="links_farmersdata red" to="./inward">
                  Fill Inward
              </Link>
              <Link className="links_farmersdata green" to="./outward">
                  Fill Outward
              </Link>
              <Link className="links_farmersdata red" to="./farmershome">
                  Data
              </Link>
          </div>
    </div>
  )
}

export default FarmerNavigation
