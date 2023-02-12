import "../../styles/Admin.css";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import FilterModal from "../../components/FilterModal";
import { Link } from "react-router-dom";
import { Divider, Grid } from "@mui/material";

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
const AdminHome = ({
  handleChangeMarket,
  fromDate,
  setfromDate,
  toDate,
  settoDate,
  value,
  setValue,
  handleSearch,
  market,
  farmersMarket,
  open,
  setOpen,
  handleClose,
  handleOpen,
  handleSearchmarkets,
  handleSearchDate,
  filteredInData,
  filteredOutData,
  purchaseQty,
  purchaseAmount,
  salesQty,
  salesAmount,
  noOfBookedStalls,
  totalFarmers,
  farmers,
  Farmers,
  Customer,
}) => {
  const FarmersObj = [];
  const farmersData = new Map();
  Farmers &&
    Farmers.forEach((e) => {
      if (farmersData.has(e.farmertype)) {
        farmersData.set(e.farmertype, farmersData.get(e.farmertype) + 1);
      } else {
        farmersData.set(e.farmertype, 1);
      }
    });
    //this is for how many farmers of each type
    // no need to go through this
  farmersData.forEach((value, key) => {
    FarmersObj.push({ farmertype: key, count: value });
  });
  let maxmarkets = 100;
    let maxStalls = 10000;
    let maxPurchaseQty = 10000;
    let maxPurchaseAmount = 500000;
    let maxSalesAmount = 500000;
    let maxSalesQty = 10000;
    const colors = {
      green: '#4CAF50',
      red: '#DB190C',
      purple: '#8624DB',
      white: '#fff',
      orange: '#FF9066'
    }
  const data1 = {
    summary: [
        {
            title: 'Farmers Markets',
            subtitle: 'Total Farmers Markets',
            value: totalFarmers.size, 
            percent: (totalFarmers.size*100)/maxmarkets
            
        },
        {
          title: 'Stalls',
          subtitle: 'Stalls of farmers',
          value: noOfBookedStalls, 
          percent: (noOfBookedStalls*100)/maxStalls
          
      }
    ]}
    const data2={
      summary: [
        {
          title: 'Purched Quantity',
          subtitle: 'Total Quantity Purched',
          value: purchaseQty,
          percent: (purchaseQty*100)/maxPurchaseQty
      },
      {
          title: 'Purchase',
          subtitle: 'Total Purchase Amount',
          value: purchaseAmount,
          percent: (purchaseAmount*100)/maxPurchaseAmount
      },
    ]
    }
    const data3 ={
      summary: [
        {
          title: 'Sales Quantity',
          subtitle: 'Total Sales Quantity',
          value: salesQty,
          percent: (salesQty*100)/maxSalesQty
      },
      {
          title: 'Sales',
          subtitle: 'Total Sales Amount',
          value: salesAmount,
          percent: (salesAmount*100)/maxSalesAmount
      }
    ]
    }
  return (
    <>
      <div className="admin_main_component">
      <FilterModal 
          handleChangeMarket={handleChangeMarket}
          fromDate={fromDate}
          setfromDate={setfromDate}
          toDate={toDate}
          settoDate={settoDate}
          value={value}
          setValue={setValue}
          handleSearch={handleSearch}
          market={market}
          farmersMarket={farmersMarket}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSearchmarkets={handleSearchmarkets}
          handleSearchDate={handleSearchDate}
          />
{/* 
        sales quantity = purchaes vs sales
        sales amount = purchase vs sales
          this means number of item bought and sold
          and amount of those quantity 
        
          */}
        <div className="farmers-stats-main">
          <h2 className="overalldata_header stats">Farmers Statistics</h2>
          <div className="farmers-stats-holder">
            {filteredInData && filteredOutData && (
              <div className="total-stall-market">
                {/* <Card header={"Total Market"} value={totalFarmers.size} />
                <Card header={"Stalls Booked"} value={noOfBookedStalls} /> */}
                {
          data1.summary.map((item, index) => {
            return(<div key={`summary-${index}`}  >
                {
                  <>
                  <span>{item.title} </span>
                  
                  
                  <CircularProgressbarWithChildren
                       className='circularbar'
                        value={item.percent}
                        strokeWidth={6}
                        text={`${item.percent}%`}
                        styles={buildStyles({
                            pathColor: item.percent < 50 ? colors.green : colors.green,
                            trailColor: '#d3d3d3',
                            strokeLinecap: 'round'
                        })}
                    >
                      <br/>
                        {/* <div className="summary-box__chart__value">
                            {item.percent}%
                        </div> */}
                    </CircularProgressbarWithChildren>
                  </>
                }
            </div>)
})
        } 
              </div>

            )}
              <div className="quantity">
            <h2>Quantity</h2>
            {filteredInData && filteredOutData && (
              <div >
               
                {/* <Card header={"Purchase:"} value={purchaseQty} />
                <Card header={"Sales:"} value={salesQty} /> */}
                {
          data2.summary.map((item, index) => {
            return(<div key={`summary-${index}`}  >
                {
                  <>
                  <span>{item.title} </span>
                  
                  
                  <CircularProgressbarWithChildren
                       className='circularbar'
                        value={item.percent}
                        strokeWidth={6}
                        text={`${item.percent}%`}
                        styles={buildStyles({
                            pathColor: item.percent < 50 ? colors.green : colors.green,
                            trailColor: '#d3d3d3',
                            strokeLinecap: 'round'
                        })}
                    >
                      <br/>
                        {/* <div className="summary-box__chart__value">
                            {item.percent}%
                        </div> */}
                    </CircularProgressbarWithChildren>
                  </>
                }
            </div>)
})
        } 
              </div>
            )}
            </div>
            <div className="amount">
                <h2>Amount</h2>
            {filteredInData && filteredOutData && (
              <div className="total-amount">
                {/* <Card header={"Purchase:"} value={purchaseAmount} />
                <Card header={"Sales:"} value={salesAmount} /> */}
                {
          data3.summary.map((item, index) => {
            return(<div key={`summary-${index}`} className="sub_overalldata" >
                {
                  <>
                  <span>{item.title} </span>
                  
                  
                  <CircularProgressbarWithChildren
                       className='circularbar'
                        value={item.percent}
                        strokeWidth={6}
                        text={`${item.percent}%`}
                        styles={buildStyles({
                            pathColor: item.percent < 50 ? colors.green : colors.green,
                            trailColor: '#d3d3d3',
                            strokeLinecap: 'round'
                        })}
                    >
                      <br/>
                        {/* <div >
                            {item.percent}%
                        </div> */}
                    </CircularProgressbarWithChildren>
                  </>
                }
            </div>)
})
        } 
              </div>
            )}
            </div>
          </div>
        </div>

        <div className="farmers-stats-main">
          <h2 className="overalldata_header farmers-type">Types of Farmers</h2>
          {FarmersObj && (
            <div className="cards_container">
              {FarmersObj.map((e, i) => {
                return <Card key={i} header={e.farmertype} value={e.count} />;
              })}
            </div>
          )}
        </div>
        <div className="total-customers">
          <h2 className="overalldata_header no-consumers">
            Total No. Of Customers
          </h2>
          {Customer && <div className="customers_count">{Customer.length}</div>}
        </div>

        <div className='admin_links'>
          <div className="two">
            <Link className="admin_links_details" to="../listoffarmers">
              Farmers List
            </Link>
            <Link className='admin_links_details' to="../listofCustomers">Customers List</Link>
          </div>
          <div className="one">
          <Link className='admin_link' to="../cancelledstalls">Cancelled Stalls List</Link>
          </div>
          </div>
      </div>
      {!filteredInData && !filteredOutData && !Farmers && <Spinner />}
    </>
  );
};

export default AdminHome;
