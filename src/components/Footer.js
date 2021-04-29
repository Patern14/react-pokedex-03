import React from "react";
import github from "../images/github.svg";
import linkedin from "../images/linkedin.svg";

const Footer = () => {
    return (
        <footer id="footer">
            <a href="mailto:paternmalle@gmail.com" class="footer_link">paternmalle@gmail.com</a>

            <div id="social-icons-container">
                <a href="https://github.com/Patern14"><img src={github} alt="github icon" className="social-icon footer_link" id="github-icon"/></a>
                <a href="https://www.linkedin.com/in/paterne-malle-57bb4818a/"><img src={linkedin} alt="linkedin icon" className="social-icon footer_link" id="linkedin-icon"/></a>
            </div>
        </footer>
    )
}

export default Footer;