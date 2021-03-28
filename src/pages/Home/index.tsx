import React, { useEffect, useRef } from "react";
import lottie from "lottie-web"
import './index.css';

const Home: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if(container.current)
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/animation.json"),
    });
  }, []);

  return (
    <div className="flex justify-center wrapper">
        
      <div className="container " ref={container}>

      </div>
    </div>
  );
};

export default Home;
