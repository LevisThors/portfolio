import { useState, useEffect, lazy } from "react";
import "./FirstPageComponent.scss";

const SkillsComponentContainer = lazy(
    () => import("../SkillsComponent/SkillsComponentContainer")
);
const ProjectsComponent = lazy(
    () => import("../ProjectsComponent/ProjectsComponent")
);
const AboutMeComponent = lazy(
    () => import("../AboutMeComponent/AboutMeComponent")
);
const ContactComponent = lazy(
    () => import("../ContactComponent/ContactComponent")
);

type Anchor = "about" | "skills" | "projects" | "contact";

export default function FirstPageComponent() {
    const [activeAnchor, setActiveAnchor] = useState<Anchor>("about");
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleAnchorClick = (anchor: Anchor) => {
        setActiveAnchor(anchor);
    };

    useEffect(() => {
        const anchors: Anchor[] = ["about", "skills", "projects", "contact"];
        let currentAnchorIndex = 0;

        const handleWheel = (event: WheelEvent) => {
            if (!showModal) {
                const delta = event.deltaY;

                if (delta > 0) {
                    currentAnchorIndex = Math.min(
                        currentAnchorIndex + 1,
                        anchors.length - 1
                    );
                } else {
                    currentAnchorIndex = Math.max(currentAnchorIndex - 1, 0);
                }

                setActiveAnchor(anchors[currentAnchorIndex]);
            }
        };

        document.addEventListener("wheel", handleWheel);

        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, [showModal]);

    return (
        <>
            <div className="intro-container">
                {activeAnchor === "about" && <AboutMeComponent />}
                {activeAnchor === "skills" && <SkillsComponentContainer />}
                {activeAnchor === "projects" && (
                    <ProjectsComponent
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}
                {activeAnchor === "contact" && <ContactComponent />}
            </div>
            <div className="navbar-container">
                <ul className="navbar">
                    <li>
                        <a
                            href="#about"
                            className={activeAnchor === "about" ? "active" : ""}
                            onClick={() => handleAnchorClick("about")}
                        >
                            About Me
                        </a>
                    </li>
                    <li>
                        <a
                            href="#skills"
                            className={
                                activeAnchor === "skills" ? "active" : ""
                            }
                            onClick={() => handleAnchorClick("skills")}
                        >
                            Skills
                        </a>
                    </li>
                    <li>
                        <a
                            href="#projects"
                            className={
                                activeAnchor === "projects" ? "active" : ""
                            }
                            onClick={() => handleAnchorClick("projects")}
                        >
                            Projects
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className={
                                activeAnchor === "contact" ? "active" : ""
                            }
                            onClick={() => handleAnchorClick("contact")}
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
