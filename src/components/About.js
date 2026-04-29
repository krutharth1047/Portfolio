import React from 'react'
import "../App.css";
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './styles/About.css';

function About() {
    const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
    const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        <div className="about" id="about">
            <h1 ref={titleRef} className={`fade-in-up ${titleVisible ? 'visible' : ''}`}>About Me</h1>

            <div ref={contentRef} className={`about-container fade-in-up ${contentVisible ? 'visible' : ''}`}>
                <div className="about-left">
                    <div className="about-image-wrapper">
                        <img 
                            src="images/me.png" 
                            alt="Krutharth R Kumar - Profile" 
                            className="about-profile-img"
                        />
                        <div className="about-image-glow"></div>
                    </div>
                    <div className="about-quick-info">
                        <div className="quick-info-item">
                            <span className="quick-icon">📍</span>
                            <span>Bangalore, India</span>
                        </div>
                        <div className="quick-info-item">
                            <span className="quick-icon">✉️</span>
                            <span>krutharth07@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="about-right">
                    <div className="about-bio">
                        <p className="about-intro">
                            Hi, I'm <span className="highlight-name">Krutharth R Kumar</span>, a Computer Science 
                            Engineering student at <strong>BMS Institute of Technology and Management</strong>, graduating in 2026.
                        </p>

                        <p>
                            I'm passionate about <strong>Data Engineering</strong> and <strong>Machine Learning</strong>, 
                            with published research in <strong>IEEE</strong> and <strong>Springer</strong> (Scopus-indexed). 
                            I'm currently preparing for my <strong>MSc in Big Data Engineering</strong> at  
<strong>University of Amsterdam & Vrije Universiteit Amsterdam</strong> (2026–2028).
                        </p>

                        <p>
                            I've gained hands-on experience through internships at <strong>Deloai</strong> and 
                            <strong>Igeek Technologies</strong>, building data analytics pipelines and ML systems. 
                            I also enjoy mentoring peers in Data Structures, Machine Learning, and Database Systems.
                        </p>

                        <p className="about-closing">
                            I'm always eager to grow my problem-solving, technical, and leadership skills. 
                            If you're interested in discussing emerging technologies, innovative products, 
                            fitness, or anything related to the tech world, I'd love to connect!
                        </p>
                    </div>

                    <div className="about-skills-preview">
                        <span className="skill-pill">Python</span>
                        <span className="skill-pill">Machine Learning</span>
                        <span className="skill-pill">Data Engineering</span>
                        <span className="skill-pill">Deep Learning</span>
                        <span className="skill-pill">SQL</span>
                        <span className="skill-pill">Computer Vision</span>
                    </div>
                </div>
            </div>

            <div className="education-section">
                <h2>Education</h2>
                <div className="education-cards">
                    <div className="edu-card">
                        <div className="edu-icon">🎓</div>
                        <h3>University of Amsterdam & VU Amsterdam</h3>
                        <p className="edu-degree">MSc Big Data Engineering</p>
                        <p className="edu-year">2026 – 2028 | Netherlands</p>
                    </div>
                    <div className="edu-card">
                        <div className="edu-icon">🏫</div>
                        <h3>BMS Institute of Technology</h3>
                        <p className="edu-degree">B.E. Computer Science & Engineering</p>
                        <p className="edu-year">2022 – 2026 | Bangalore, India</p>
                        <p className="edu-cgpa">CGPA: 8.42/10</p>
                    </div>
                    <div className="edu-card yonsei-card">
                        <div className="edu-icon">
                            <img src="images/yonsei-logo.png" alt="Yonsei University" className="yonsei-logo" 
                                onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML='🌏';}} />
                        </div>
                        <h3>Yonsei University</h3>
                        <p className="edu-degree">Yonsei International Summer School (YISS)</p>
                        <p className="edu-year">Jun 2026 – Aug 2026 | Seoul, South Korea</p>
                        <p className="edu-course">Course: Machine Learning</p>
                        <span className="yonsei-badge">Currently Attending</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About