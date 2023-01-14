import React ,{useState,useEffect}from 'react'
import '../styles/Home.css'
import Location from '../components/Location';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import useWindowDimensions from '../components/useWindowDimensions'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [mobile, setmobile] = useState(false)
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, [])

  const {width} = useWindowDimensions()
  
  useEffect(() => {
    if(width<800){
      setmobile(true)
    }else{
      setmobile(false)
    }
  }, [width])

  const navigate = useNavigate()
  return (
    <div className='home_container'>

      <div className='first_section'>
        <div className='first_section_component'>
          <img src="./images/imgbook.png" alt='stall_logo' className='first_image_section'/> 
          <h1 data-aos="fade-right" className="first_section_header">
                <span>REVOLUTIONIZING THE STALL </span>
                <span>BOOKING FOR DIRECT SELL</span>
          </h1>
          <div data-aos="fade-up" className="first_section_btn">
                <button onClick={()=>{navigate('/farmers/')}} className="bookstall_btn">
                    Book Stall
                </button>
            </div>
        </div>
        <div className="first_section_image">
            <img className="image_header" alt="hero" src="./images/centerimagenew.png"/>
        </div>
      </div>

      {!mobile?
      <div className='second_section_wrapper'>
        <div className='second_section_aboutus'>
            <h2 className='h2_style'>About Us</h2>
            <p className='p_style'>We at Wingrow Agritech facilitate direct interaction between consumers and farmers. Consumers get access to produce direct from farms which is much fresher and lasts longer, at reasonable prices.</p>
          </div>
          <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/FPO.webp' alt='img' className='second_section_img'/>
              
            </div>

              <div data-aos="fade-down" className='second_section_component_arrow'>
                <img src='https://cdn-icons-png.flaticon.com/512/664/664866.png' alt='img' className='second_section_img'/>
              </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/WIN.webp' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
            <img src='https://cdn-icons-png.flaticon.com/512/3183/3183354.png' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/CONS.webp' alt='img' className='second_section_img'/>
            </div>
        </div>
        </div>
        :
        <div className='second_section_wrapper'>
          <div className='second_section_aboutus'>
            <h2 className='h2_style'>About Us</h2>
            <p className='p_style'>We at Wingrow Agritech facilitate direct interaction between consumers and farmers. Consumers get access to produce direct from farms which is much fresher and lasts longer, at reasonable prices.</p>
          </div>
        <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/FPO.webp' alt='img' className='second_section_img'/>
            </div>

              <div data-aos="fade-down" className='second_section_component_arrow'>
                <img src='https://cdn-icons-png.flaticon.com/512/545/545678.png ' alt='img' className='second_section_img'/>
              </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/WIN.webp' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='img' className='second_section_img'/>
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
            <img src='./images/CONS.webp' alt='img' className='second_section_img'/>
            </div>
        </div>
        </div>
      }
      

         <div className='third_section'>
            <div className="third_section_details">
                          <h1 className="third_section_header">Our Markets</h1>
                          <p className="third_section_p">We organize weekly markets at key locations in Pune, which allows farmers to sell fresh produce directly to the customers, cutting out middlemen in the process. This allows customers to buy farm fresh produce at affordable rates, while the farmers who grow the produce get a fair price for it.</p>
                      </div>
          <div className='location_component'>
              <Location/>
          </div>     
          
        </div>
        <div className='forth_section'>
            <div className="forth_section_details">
                          <h1 className="forth_section_header">Cutting the middleman out</h1>
                          <div className="info_scroll">
                          <img className="product-img" data-aos="fade-right" alt="XYZ" src="https://tse2.mm.bing.net/th?id=OIP.iuhGfvfRBRnDncgSElRm2wHaE8&pid=Api&P=0&w=272&h=181" />
                          <p className="pinfo" data-aos="fade-left">We at Wingrow Agritech facilitate direct interaction between consumers and farmers.</p>
                          </div>
                      </div>
        
          {/* <h1 className='heading_tertiary'>Cutting the middleman out</h1>
          <div className="info_scroll">
          <img className="product-img" data-aos="fade-right" alt="XYZ" src="https://tse2.mm.bing.net/th?id=OIP.iuhGfvfRBRnDncgSElRm2wHaE8&pid=Api&P=0&w=272&h=181" />
          <p className="pinfo" data-aos="fade-left">We at Wingrow Agritech facilitate direct interaction between consumers and farmers.</p> */}
        
        </div>
        <Footer/>
      </div>  
    )
}

export default Home