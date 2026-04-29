import React from "react";
import "../App.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./styles/Experience.css";

export default function Experience() {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [exp1Ref, exp1Visible] = useScrollAnimation({ threshold: 0.2 });
  const [exp2Ref, exp2Visible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="experience" id="experience">
      <h1 ref={titleRef} className={`fade-in-up ${titleVisible ? 'visible' : ''}`}>Experience</h1>

      {/* Deloai Internship */}
      <div ref={exp1Ref} className={`experience-card fade-in-up ${exp1Visible ? 'visible' : ''}`}>
        <div className="exp-header">
          <div className="exp-title-section">
            <h3>Data Analyst Intern</h3>
            <span className="exp-company">Deloai Private Limited</span>
          </div>
          <span className="exp-date">Jan 2026 – Apr 2026</span>
        </div>
        <ul className="exp-details">
          <li>Designed and implemented an end-to-end data analytics pipeline for a SaaS-based EdTech platform</li>
          <li>Generated and processed large-scale synthetic datasets using Python for user behavior simulation</li>
          <li>Designed relational database schema in MySQL and performed SQL-based KPI analysis (DAU, retention, placement rate)</li>
          <li>Built interactive Tableau dashboards to visualize user engagement and business metrics</li>
          <li>Applied advanced analytics including user segmentation, cohort analysis, and churn prediction using logistic regression</li>
        </ul>
        <div className="exp-tags">
          <span className="exp-tag">Python</span>
          <span className="exp-tag">SQL</span>
          <span className="exp-tag">MySQL</span>
          <span className="exp-tag">Tableau</span>
          <span className="exp-tag">Data Analytics</span>
        </div>
      </div>

      {/* Igeek Technologies Internship */}
      <div ref={exp2Ref} className={`experience-card fade-in-up ${exp2Visible ? 'visible' : ''}`}>
        <div className="exp-header">
          <div className="exp-title-section">
            <h3>Data Science Intern</h3>
            <span className="exp-company">Igeek Technologies</span>
          </div>
          <span className="exp-date">Oct 2024 – Dec 2024</span>
        </div>
        <ul className="exp-details">
          <li>Performed exploratory data analysis on image datasets using Python (NumPy, Pandas, Matplotlib)</li>
          <li>Executed data preprocessing and feature extraction for machine learning workflows</li>
          <li>Worked on end-to-end ML pipeline design including data preparation and evaluation</li>
        </ul>
        <div className="exp-tags">
          <span className="exp-tag">Python</span>
          <span className="exp-tag">NumPy</span>
          <span className="exp-tag">Pandas</span>
          <span className="exp-tag">Scikit-learn</span>
        </div>
      </div>
    </div>
  );
}