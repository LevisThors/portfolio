import "./ContactComponent.scss";

export default function AboutMeComponent() {
    return (
        <div className="contact">
            <h1>SHUKRI MAMATSASHVILI</h1>
            <div className="contact-body">
                <span className="contact-email">
                    E-mail:{" "}
                    <a href="mailto:mamatsashvili.shukri@gmail.com">
                        mamatsashvili.shukri@gmail.com
                    </a>
                </span>
                <span>
                    LinkedIn:{" "}
                    <a
                        href="https://www.linkedin.com/in/shukri-mamatsashvili-26a198238/"
                        target="_blank"
                    >
                        Shukri Mamatsashvili
                    </a>
                </span>
            </div>
        </div>
    );
}
