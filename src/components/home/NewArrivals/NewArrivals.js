import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        <div className="px-2">
          <Product
            _id="100001"
            img={newArrOne}
            productName="Key Holder"
            price="44.00"
            //color="Black"
            badge={true}
            des="This handcrafted key holder combines traditional artistry with practical design.  
Made from durable materials, it adds charm and organization to any space."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100002"
            img={newArrTwo}
            productName="Home Decor"
            price="250.00"
            //color="Black"
            badge={true}
            des="Enhance your space with this unique handcrafted home décor piece.  
Expertly made with artistic flair, it brings warmth and character to any room."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100003"
            img={newArrThree}
            productName="Wall Craft"
            price="80.00"
            //color="Mixed"
            badge={true}
            des="This handcrafted wall craft adds a touch of elegance and tradition to your walls.  
Designed with intricate details, it brings life and personality to your décor."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100004"
            img={newArrFour}
            productName="Hanging Craft"
            price="60.00"
            //color="Mixed"
            badge={false}
            des="Add charm to your space with this beautifully handcrafted hanging craft.  
Made with care and creativity, it’s perfect for enhancing any corner or wall."
          />
        </div>
        {/* <div className="px-2">
          <Product
            _id="100005"
            img={newArrTwo}
            productName="Funny toys for babies"
            price="60.00"
            color="Mixed"
            badge={false}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div> */}
      </Slider>
    </div>
  );
};

export default NewArrivals;
