import React from "react";
import "../App.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./styles/Research.css";

export default function Research() {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [card1Ref, card1Visible] = useScrollAnimation({ threshold: 0.2 });
  const [card2Ref, card2Visible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="research" id="research">
      <h1 ref={titleRef} className={`fade-in-up ${titleVisible ? 'visible' : ''}`}>Research & Publications</h1>
      <p className="research-subtitle">Peer-reviewed contributions in AI and Machine Learning</p>

      <div className="research-container">
        <div ref={card1Ref} className={`research-card fade-in-up ${card1Visible ? 'visible' : ''}`}>
          <div className="research-badge first-author">First Author</div>
          <div className="research-venue">IEEE CICN 2025</div>
          <h3>Enhancing Web Document Recommendations with Generative AI</h3>
          <p>
            Designed an LLM-based recommendation pipeline optimizing metadata selection. 
            Improved scalability and personalization through efficient data handling techniques.
          </p>
          <div className="research-tags">
            <span className="tag">LLM</span>
            <span className="tag">Recommendations</span>
            <span className="tag">NLP</span>
          </div>
        </div>

        <div ref={card2Ref} className={`research-card fade-in-up ${card2Visible ? 'visible' : ''}`}>
          <div className="research-badge co-author">Co-Author</div>
          <div className="research-venue">Springer LNNS (Scopus)</div>
          <h3>Mitigation of Fire Disasters Using Computer Vision and ML</h3>
          <p>
            Developed real-time fire detection system using YOLOv5 and Raspberry Pi. 
            Achieved &gt;90% detection accuracy with &lt;2s response latency. 
            Integrated automated suppression mechanism with servo-controlled targeting.
          </p>
          <div className="research-tags">
            <span className="tag">YOLOv5</span>
            <span className="tag">Computer Vision</span>
            <span className="tag">IoT</span>
          </div>
        </div>
      </div>
    </div>
  );
}