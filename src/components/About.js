import React from "react"
import "./styles/About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function About() {
    const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
    const [socialsRef, socialsVisible] = useScrollAnimation({ threshold: 0.3 });
    const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <div className="about" id="about">
        <h1 ref={titleRef} className={`fade-in-up ${titleVisible ? 'visible' : ''}`}>About Me</h1>

      {/*social media section*/}
      <section className="experience-socials">
          <div className="social-media-wrap">
            <div ref={socialsRef} className={`social-icons fade-in ${socialsVisible ? 'visible' : ''}`}>

              <a href="https://github.com/krutharth1047"
                className="social-icons-link github"
                target="_blank"
                rel="noreferrer"
                aria-label="Github"
              >
                <i className="fab fa-github"></i>
              </a>

              <a href="https://www.linkedin.com/in/krk2004/"
                className="social-icons-link linkedin"
                target="_blank"
                rel="noreferrer"
                aria-label="Linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>

              <a href="mailto:krutharth07@gmail.com.ca"
                className="social-icons-link email"
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
              >
                <i className="far fa-envelope"></i>
              </a>

            </div>
          </div>
        </section>

        <div className="page-content">
        <p ref={contentRef} className={`fade-in-up ${contentVisible ? 'visible' : ''}`}>
          <img
            id="profile"
            src="images/me.png"
            alt="Krutharth R Kumar."
          />
          Hi, I'm Krutharth R Kumar, a Computer Science Engineering student graduating in 2026. I'm passionate about Data Science and Business Analytics, and I'm preparing for a master's starting Fall 2026. I've completed certifications with hands-on projects to build practical skills and am now looking for opportunities to apply my problem-solving and analytical abilities in real-world settings.
          <br /> <br />
          I'm always eager to grow my problem-solving, technical, and leadership skills. If you're interested in discussing emerging technologies, innovative products, fitness, or anything related to the tech world, I'd love to connect over a coffee chat!
        </p>
            </div>
        </div>
    );
}
