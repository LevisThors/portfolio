import "./ContactComponent.scss";

import mailIcon from "../../assets/email-icon.webp";
import linkedInIcon from "../../assets/linkedin-icon.png";

export default function AboutMeComponent() {
    return (
        <div className="contact">
            <h1>SHUKRI MAMATSASHVILI</h1>
            <h2>Contact me</h2>
            <div className="contact-body">
                <span className="contact-email">
                    <a href="mailto:mamatsashvili.shukri@gmail.com">
                        <img src={mailIcon} />
                    </a>
                </span>
                <span>
                    <a
                        href="https://www.linkedin.com/in/shukri-mamatsashvili-26a198238/"
                        target="_blank"
                    >
                        <img src={linkedInIcon} />
                    </a>
                </span>
            </div>
        </div>
    );
}
