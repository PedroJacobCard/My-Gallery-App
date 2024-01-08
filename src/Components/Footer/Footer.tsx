import './Footer.css';

import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="separator">
        <div className="line"></div>
      </div>
      <div className="social-media">
        <a href="https://github.com/PedroJacobCard">
          <DiGithubBadge />
        </a>
        <a href="https://www.linkedin.com/in/pedro-jacob-82374bb3/">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com/pedrojacob05">
          <FaSquareXTwitter/>
        </a>
      </div>
      <div className="copyright">
        <span>
          &copy; Copyright - Pedro Jacob | My Gallery {year}
        </span>
      </div>
      <p>All rights reserved</p>
    </div>
  );
}

export default Footer;