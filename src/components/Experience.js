import React from "react";
import "../App.css";

export default function Experience() {
  const subject = "Interested in Resume";
  const body = `Hi Krutharth,
	%0D%0A%0D%0A  I was on your personal website and I'm would love for you to send me your resume. Hope to connect!
	%0D%0A%0D%0A  Thank you!`;

  return (
    <div className="experience">
      <h1>Experience</h1>
      <p>
      I gained practical exposure as a <b>Data Science Intern</b> at IgeekS Technologies, 
  where I worked on data preprocessing, model development, and evaluation using Python tools. 
  The internship gave me hands-on experience applying machine learning techniques to real datasets 
  and strengthened my skills in data analysis and problem-solving.If you'd like to see my resume, please&nbsp;
        <a
          id = "experience"
          href={`mailto:krutharth07@gmail.com?subject=${subject}&body=${body}`}
          target="_blank"
        >
          email
        </a>
        &nbsp;me.
  </p>
    </div>
  );
}
