import { Link } from 'react-scroll';
import "./styles/Footer.css";

function Footer({ listThing, year }) {
  const subject = "Interested in Resume";
  const body = `Hi Krutharth,

I was on your personal website and I would love for you to send me your resume. Hope to connect!

Thank you!`;

  return (
    <footer className="footer-container">

      {/* footer link section */}
      <div className="footer-link-wrapper">

        <div className="footer-link-item" id="about-card">
          <h2>About</h2>

          <Link className="footer-link" to="home" spy={true} smooth={true} duration={1250}>
            Home
          </Link>

          <Link className="footer-link" to="about" spy={true} smooth={true} offset={-70} duration={1250}>
            About Me
          </Link>

          <Link className="footer-link" to="experience" spy={true} smooth={true} offset={-70} duration={1250}>
            Experience
          </Link>

          <Link className="footer-link" to="research" spy={true} smooth={true} offset={-70} duration={1250}>
            Research
          </Link>

          <Link className="footer-link" to="projects" spy={true} smooth={true} offset={-70} duration={1250}>
            Projects
          </Link>

          {/* Fixed Resume Link */}
          <a
            className="footer-link"
            href={`mailto:krutharth07@gmail.com?subject=${subject}&body=${body}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        <div className="footer-link-item" id="dev-card">
          <h2>Projects</h2>

          <a
            className="footer-link"
            href="https://github.com/krutharth1047"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>

          <a
            className="footer-link"
            href="https://portfolio-two-topaz-96.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
        </div>

      </div>
      {/* end footer link wrapper */}

      {/* social media section */}
      <section className="social-media">
        <div className="social-media-wrap">

          <div className="social-icons">

            <a
              href="mailto:krutharth07@gmail.com"
              className="social-icons-link email"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
            >
              <i className="far fa-envelope"></i>
            </a>

            <a
              href="https://github.com/krutharth1047"
              className="social-icons-link github"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/krutharth1047/"
              className="social-icons-link linkedin"
              target="_blank"
              rel="noreferrer"
              aria-label="Linkedin"
            >
              <i className="fab fa-linkedin"></i>
            </a>

          </div>

          <small className="website-rights">
            Created using React &copy; {year} <br />
            Krutharth R Kumar
          </small>

        </div>
      </section>

    </footer>
  );
}

export default Footer;