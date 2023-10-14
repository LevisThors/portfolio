import { useState, useEffect, lazy } from "react";
import { useIsMobile } from "../../util/useIsMobile";

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
    const { isMobile } = useIsMobile();

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

        const handleTouchStart = (event: TouchEvent) => {
            const startY = event.touches[0].clientY;

            const handleTouchMove = (event: TouchEvent) => {
                const deltaY = event.touches[0].clientY - startY;

                if (!showModal) {
                    if (deltaY > 50) {
                        currentAnchorIndex = Math.max(
                            currentAnchorIndex - 1,
                            0
                        );
                    } else if (deltaY < -50) {
                        currentAnchorIndex = Math.min(
                            currentAnchorIndex + 1,
                            anchors.length - 1
                        );
                    }

                    setActiveAnchor(anchors[currentAnchorIndex]);
                }
            };

            const handleTouchEnd = () => {
                document.removeEventListener("touchmove", handleTouchMove);
                document.removeEventListener("touchend", handleTouchEnd);
            };

            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleTouchEnd);
        };

        document.addEventListener("wheel", handleWheel);
        document.addEventListener("touchstart", handleTouchStart);

        return () => {
            document.removeEventListener("wheel", handleWheel);
            document.removeEventListener("touchstart", handleTouchStart);
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
            {!isMobile && (
                <div className="navbar-container">
                    <ul className="navbar">
                        <li>
                            <span
                                className={
                                    activeAnchor === "about" ? "active" : ""
                                }
                                onClick={() => handleAnchorClick("about")}
                            >
                                About Me
                            </span>
                        </li>
                        <li>
                            <span
                                className={
                                    activeAnchor === "skills" ? "active" : ""
                                }
                                onClick={() => handleAnchorClick("skills")}
                            >
                                Skills
                            </span>
                        </li>
                        <li>
                            <span
                                className={
                                    activeAnchor === "projects" ? "active" : ""
                                }
                                onClick={() => handleAnchorClick("projects")}
                            >
                                Projects
                            </span>
                        </li>
                        <li>
                            <span
                                className={
                                    activeAnchor === "contact" ? "active" : ""
                                }
                                onClick={() => handleAnchorClick("contact")}
                            >
                                Contact
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
