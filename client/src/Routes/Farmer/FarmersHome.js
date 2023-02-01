import React, { useState, useEffect } from "react";
import "../../styles/Farmer.css";
import FarmerService from "../../services/farmer.service";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const FarmersHome = () => {
  const [InwardData, setInwardData] = useState();
  const [OutwardData, setOutwardData] = useState();

  useEffect(() => {
    FarmerService.getInward().then((res) => {
      setInwardData(res.data);
    });

    FarmerService.getOutward().then((res) => {
      setOutwardData(res.data);
      // console.log(res.data)
    });
  }, []);

  // const getInward = (InwardData) => {
  //   let sum = 0
  //   for (let i = 0; i < InwardData.length; i++) {
  //     sum += InwardData[i].purchase_quantity
  //   }
  //   return sum / InwardData.length
  // }

  // console.log(getInward())
  return (



    <>

<div className="inOutData">

</div>

        <div className="farmers_page">
        <Link style={{ marginTop: '10px' }} className="backbtn green" to="/farmers" >
          Back
        </Link>

      {InwardData && OutwardData && (
        <div className="farmers_data">
          {InwardData.length !== 0 && (
            <div className="inwardData">
              <h3 style={{ padding: "1rem 0" }}>Inward Data</h3>
              <div className="farmersdata_container">
                {InwardData.map((e, i) => {
                  return (
                    <div key={i} className="farmerdata_items">
                      <p>Commodity : {e.commodity}</p>
                      <p>Market : {e.market}</p>
                      <p>Purchase Rate : {e.purchase_rate}</p>
                      <p>Purchase Quantity : {e.purchase_quantity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {InwardData.length === 0 && (
            <div className="inwardData">
              <h3 style={{ padding: "1rem 0" }}>Inward Data</h3>
              <div className="farmersdata_container">
                No Inward Data available!
              </div>
            </div>
          )}

          {OutwardData.length !== 0 && (
            <div className="outwardData">
              <h3 style={{ padding: "1rem 0" }}>Outward Data</h3>
              <div className="farmersdata_container">
                {OutwardData.map((e, i) => {
                  return (
                    <div key={i} className="farmerdata_items">
                      <p>Commodity : {e.commodity}</p>
                      <p>Market : {e.market}</p>
                      <p>Sales Rate : {e.sales_rate}</p>
                      <p>Sales Quantity : {e.sales_quantity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {OutwardData.length === 0 && (
            <div className="outwardData">
              <h3 style={{ padding: "1rem 0" }}>Outward Data</h3>
              <div className="farmersdata_container">
                No Outward Data available!
              </div>
            </div>
          )}
        </div>
      )}
      {!InwardData && !OutwardData && <Spinner />}
    </div>
    </>

    
  );
};

export default FarmersHome;
