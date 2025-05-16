import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
} from "../../../assets/images/index";

const SpecialOffers = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="1101"
          img={spfOne}
          productName="Wooden Craft"
          price="35.00"
          //color="Blank and White"
          badge={true}
          des="This handcrafted wooden craft showcases timeless beauty and skilled workmanship.  
Made from quality wood, it adds a rustic and natural touch to your décor."
        />
        <Product
          _id="1102"
          img={spfTwo}
          productName="Folk Doll"
          price="30.00"
          //color="Gray"
          badge={true}
          des="This handcrafted folk doll reflects rich cultural heritage and traditional artistry.  
Carefully made with vibrant fabrics, it adds a colorful, ethnic charm to any space."
        />
        <Product
          _id="1103"
          img={spfThree}
          productName="Hat"
          price="25.00"
          //color="Mixed"
          badge={true}
          des="This handcrafted hat blends style with tradition, offering a unique, artisanal touch.  
Made with quality materials, it’s both fashionable and comfortable to wear."
        />
        <Product
          _id="1104"
          img={spfFour}
          productName="Coconut Shell Craft"
          price="220.00"
          //color="Black"
          badge={true}
          des="This handcrafted coconut shell craft transforms natural materials into stunning art.  
Eco-friendly and unique, it adds a tropical and earthy vibe to your décor."
        />
      </div>
    </div>
  );
};

export default SpecialOffers;