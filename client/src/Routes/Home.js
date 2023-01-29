import React, { useState, useEffect } from 'react'
import '../styles/Home.css'
import Location from '../components/Location';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import useWindowDimensions from '../components/useWindowDimensions'
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//import { useTranslation } from "react-i18next";
import { FaLeaf } from 'react-icons/fa';

const Home = () => {
  const [mobile, setmobile] = useState(false)
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, [])

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width < 800) {
      setmobile(true)
    } else {
      setmobile(false)
    }
  }, [width])

  // const languages = [
  //   {
  //     code: 'mr',
  //     name: 'मराठी',
  //   },
  //   {
  //     code: 'hi',
  //     name: 'हिंदी'
  //   },
  //   {
  //     code: 'en',
  //     name: 'English'
  //   },
  // ]
  const navigate = useNavigate()
  return (
    <div className='home_container'>
      <div className='first_section'>
        <Carousel infiniteLoop>
          <div className='image image1'>

            <img src='./images/centerimagenew.png' alt='hero' />
            <div className="image-text1"><p>EVOLUTIONIZING THE STALL </p>
              <p>BOOKING FOR DIRECT SELL </p>
              <div data-aos="fade-up" className="first_section_btn" style={{ marginTop: '2rem' }}>
                <button onClick={() => { navigate('/farmers/') }} className="bookstall_btn">
                  Book Stall
                </button>
              </div>
            </div>
          </div>
          <div className='image image2'>
            <img src='./images/farming.jpg' alt='hero' />
            <div ><p className="image-text2">Fruits and Vegetables are provided directly from farmers</p></div>
          </div>
          <div className='image image3'>
            <img src='./images/middleman.jpg' alt='hero' />
            <div className='image-text3'>Middlemen offer lower prices to farmers and charge higher prices from the consumers, our aim is to remove middleman</div>
          </div>
          <div className='image image4'>
            <img src='./images/harvested.webp' alt='hero' />
            <div className='image-text4'>Helping farmers to sell their produces at right prices!</div>
          </div>
          <div className='image image5'>
            <img src='./images/farmers-street-market-city.webp' alt='hero' />
            <div className='image-text5'><span>Fresh and natural ingredients straight from farm <FaLeaf /></span></div>
          </div>
        </Carousel>

      </div>

      {!mobile ?
        <div className='second_section_wrapper'>
          <div className='second_section_aboutus'>
            <h2 className='h2_style'>About Us </h2>
            <p className='p_style'>We offer nutrient rich, toxin free food to our customers, while enriching the lives of farmers and helping them to live in a better lifestyle. We strive to help farmers with helping them to use good agricultural practices for increasing productivity resulting in a better revenue. </p>
          </div>
          <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/FPO.webp' alt='img' className='second_section_img' />


            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/664/664866.png' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/WIN.webp' alt='img' className='second_section_img' />
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/3183/3183354.png' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/CONS.webp' alt='img' className='second_section_img' />
            </div>
          </div>
        </div>
        :
        <div className='second_section_wrapper'>
          <div className='second_section_aboutus'>
            <h2 className='h2_style'>About Us </h2>
            <p className='p_style'>We offer nutrient rich, toxin free food to our customers, while enriching the lives of farmers and helping them to live in a better lifestyle. We strive to help farmers with helping them to use good agricultural practices for increasing productivity resulting in a better revenue. </p>
          </div>
          <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/FPO.webp' alt='img' className='second_section_img' />
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/545/545678.png ' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/WIN.webp' alt='img' className='second_section_img' />
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/CONS.webp' alt='img' className='second_section_img' />
            </div>
          </div>
        </div>
      }


      <div className='third_section'>
        <div className="third_section_details">
          <h1 className="third_section_header">Our Markets </h1>
          <p className="third_section_p">We organize weekly markets at key locations in Pune, which allows farmers to sell fresh produce directly to the customers, cutting out middlemen in the process. This allows customers to buy farm fresh produce at affordable rates, while the farmers who grow the produce get a fair price for it. </p>
        </div>
        <div className='location_component'>
        
          <Location
          // t={t}
          // languages={languages}
          />
        </div>

      </div>

      


      <div className='fourth_section'>
        <div className='fourth_section_layout'>
          <h1 className='fourth_section_header' style={{ color: "black" }}>Cutting the middleman out </h1>
          <div className='fourth_section_details'>
            <p className='fourth_section_para'>At Wingro Agritech, we facilitate direct interaction between consumers and farmers.</p>
            
              <img className='wood_img' src='https://images.pling.com/img/00/00/33/91/33/1227673/faa811fa12c56bd35832775490ecffe5d07c.jpg' alt='wood'></img>
              {/* <img className='fruit_vegetable_img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnEmpujnghuBa7zG1RW3n69TNb5WlKtMdKE3nGGkGVjsxKfTxZaI7WE3YjxY7iMvr-7g&usqp=CAU" alt='fruits & vegetable'></img> */}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home