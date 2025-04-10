import { Link } from "react-router";
import interiorImg from "../../assets/pexels-interior.jpg";

export const Banner = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="relative border-r">
        <Link to={"/products"} className="group transition-all duration-300 ease-in-out">
          <img src={interiorImg} alt="modern-interior"></img>
          <p className="absolute bottom-[50%] text-3xl left-[16px] text-[var(--primary-btn-text)] bg-left-bottom bg-gradient-to-r from-[var(--primary-bg-color)] to-black bg-[length:0%_0.7px] bg-no-repeat group-hover:bg-[length:100%_0.7px] transition-all duration-600 ease-out">
            OUR PRODUCTS
          </p>
        </Link>
      </div>
      <div className="bg-[var(--purple)] relative">
        <p className="absolute bottom-[80%] text-4xl right-[55%] font-semibold text-[var(--primary-bg-color)] font-Dela">WELCOME</p>
        <p className="absolute bottom-[70%] text-4xl right-[40%] text-[var(--primary-bg-color)] font-Dela">TO</p>
        <p className="absolute bottom-[65%] text-4xl right-[40%] text-[var(--primary-bg-color)] font-Dela">DISCOVER</p>
        <p className="absolute bottom-[55%] text-4xl right-[20%] text-[var(--primary-bg-color)] font-Dela">WORLD</p>
        <p className="absolute bottom-[50%] text-4xl right-[20%] text-[var(--primary-bg-color)] font-Dela">OF</p>
        <p className="absolute bottom-[40%] text-4xl right-[50%] font-semibold text-[var(--primary-bg-color)] underline font-Dela">
          MOOD STUDIO
        </p>
      </div>
    </div>
  );
};
