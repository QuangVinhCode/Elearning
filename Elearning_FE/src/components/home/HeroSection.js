import React from "react";
import "./HeroSection.css";
import { Button } from "./Button";
import "../../pages/User.css";
function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/public/videos/video-2.mp4" />
      <h1>TRI THỨC LÀ SỨC MẠNH</h1>
      <p>Kiểm soát tri thức, hướng tới thành công</p>
    </div>
  );
}

export default HeroSection;
