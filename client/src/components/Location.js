import React from 'react';
import '../styles/Home.css'

function Location() {
    const locations = [
    {
        name:"Wanwadi",
        day:"Saturday",
        address:"https://maps.app.goo.gl/54qsT1zcGPEv6gMx7",
        time:"3PM-9PM"
    },
    {
        name:"Karvenagar",
        day:"Thursday",
        address:"https://goo.gl/maps/5sETcJGzXWoXC5SG9",
        time:"3PM-9PM"
    },
    {
        name:"Amanora City",
        day:"Sunday",
        address:"https://goo.gl/maps/HHMD4DHv7RgUXGj8A",
        time:"3PM-9PM"
    },
    {
        name:"Magarpatta",
        day:"Sunday",
        address:"https://goo.gl/maps/vedWovkK1J3z5gkL6",
        time:"7AM-1PM"
    },
    {
        name:"Sadesataranali",
        day:"Wednesday",
        address:"https://goo.gl/maps/8jhcvdKvRVZghakF8",
        time:"3PM-9PM"
    },
    {
        name:"Bramhasun City",
        day:"Friday",
        address:"https://goo.gl/maps/w3xSJVLDc9cgdmxU9",
        time:"3PM-9PM"
    },
    {
        name:"Kharadi IT Park",
        day:"Thursday",
        address:"https://g.page/Forest-County-Kharadi?share",
        time:"3PM-9PM"
    },
]
  return <>
      {
          locations.map((e,i)=>{
            return(
                <div key={i} className="location_container">
                        <div className="location_component_main">
                            
                            <img alt="team" className="location_image_main" src="https://www.pngitem.com/pimgs/m/77-777258_green-location-icon-png-location-icon-png-hd.png"/>
                            
                            <div className="places_main_wrapper">
                                <a href={e.address}>
                                    <h2 className="location_markets">{e.name}</h2>
                                </a>
                                <p className="location_date">{e.day} at {e.time}</p>
                            </div>
                        </div>
                    </div>
            )
          })
      }

  </>;
}

export default Location;