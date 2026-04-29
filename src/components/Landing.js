import React, { useState, useEffect } from 'react'
import "../App.css";
import { Button } from './Button';
import { ButtonExt } from './ButtonExt';
import "./styles/Landing.css";

// ✅ moved outside (IMPORTANT FIX)
const phrases = ['Data Engineer'];

function Landing() {
    const subject = "Interested in Resume";
    const body = `Hi Krutharth,

I was on your personal website and I would love for you to send me your resume. Hope to connect!

Thank you!`;

    // Typewriter effect
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && displayText === currentPhrase) {
            setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
            const timeout = setTimeout(() => {
                setDisplayText(prev =>
                    isDeleting
                        ? prev.slice(0, -1)
                        : currentPhrase.slice(0, prev.length + 1)
                );
            }, typeSpeed);
            return () => clearTimeout(timeout);
        }
    }, [displayText, isDeleting, phraseIndex]); // ✅ removed 'phrases'

    return (
        <div className="landing-container">
            <img
                id="background"
                src="images/landing-img.jpg"
                alt="Welcome to my portfolio"
            />

            <h1 className="landing-title">Krutharth R Kumar</h1>

            <div className="typewriter-container">
                <span className="typewriter-text">{displayText}</span>
                <span className="typewriter-cursor">|</span>
            </div>

            <div className="landing-stats">
                <div className="stat-item">
                    <span className="stat-number">2</span>
                    <span className="stat-label">Publications</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">2</span>
                    <span className="stat-label">Internships</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="landing-btn">
                <ButtonExt
                    className="btns"
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                    path={`mailto:krutharth07@gmail.com?subject=${subject}&body=${body}`}
                >
                    Contact Me
                </ButtonExt>

                <Button
                    className="btns"
                    buttonSize="btn--large"
                    path="projects"
                >
                    Projects
                </Button>
            </div>
        </div>
    )
}

export default Landing;