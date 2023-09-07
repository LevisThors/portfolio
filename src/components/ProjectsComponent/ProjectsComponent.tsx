import { useState } from "react";
import iswavleBanner from "../../assets/iswavle-banners.png";
import iswavleAdd from "../../assets/iswavle-add.png";
import iswavleAuth from "../../assets/iswavle-auth.png";
import iswavleEp from "../../assets/iswavle-ep.png";
import iswavleMain from "../../assets/iswavle-main.png";
import iswavleOverview from "../../assets/iswavle-overview.png";

import "./ProjectsComponent.scss";

interface ProjectsProps {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export default function ProjectsComponent({
    showModal,
    setShowModal,
}: ProjectsProps) {
    const images = [
        "https://i.pinimg.com/564x/0f/76/34/0f76345516e0cbcb82783c85c15ce622.jpg",
        "https://i.pinimg.com/564x/6b/aa/37/6baa378ac29a94c9d0e4b55bfe840d02.jpg",
        "https://i.pinimg.com/564x/49/f0/8c/49f08c882cad61e385b2bb3e7e1d9334.jpg",
        "https://i.pinimg.com/564x/0f/76/34/0f76345516e0cbcb82783c85c15ce622.jpg",
    ];

    const projectNames = ["Iswavle", "Quizzy", "Whale", "The Gaming Maniacs"];

    const [activeImage, setActiveImage] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [modal, setModal] = useState("");

    const nextImage = () => {
        setActiveImage((prevActive) => (prevActive + 1) % images.length);
    };

    const prevImage = () => {
        setActiveImage((prevActive) =>
            prevActive === 0 ? images.length - 1 : prevActive - 1
        );
    };

    const imagePosition = (index: number) => {
        if (index === activeImage) {
            return "wheel-image-active";
        } else if (index === (activeImage + 1) % images.length) {
            return "wheel-image-inactive-right";
        } else if (
            index ===
            (activeImage - 1 + images.length) % images.length
        ) {
            return "wheel-image-inactive-left";
        } else {
            return "wheel-image-hidden";
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            const offsetX = e.clientX - dragStartX;
            const threshold = 50;
            if (offsetX > threshold) {
                nextImage();
                setIsDragging(false);
            } else if (offsetX < -threshold) {
                prevImage();
                setIsDragging(false);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleClick = (currentProject: string) => {
        setModal(currentProject);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    console.log(modal);
    return (
        <>
            {showModal && (
                <ProjectModal currentProject={modal} closeModal={closeModal} />
            )}
            <div className="wheel-container">
                <div className="wheel-left-arrow" onClick={nextImage}></div>
                <div className="wheel-images">
                    {images.map((image, index) => (
                        <div
                            className={`wheel-image ${imagePosition(index)}`}
                            key={index}
                        >
                            <div
                                className="wheel-image-overlay"
                                onClick={() => handleClick(projectNames[index])}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                style={{
                                    cursor: isDragging ? "grabbing" : "grab",
                                }}
                            >
                                <span className="wheel-image-overlay-text">
                                    {projectNames[index]}
                                </span>
                            </div>
                            <img
                                src={image}
                                alt="Main"
                                width={700}
                                height={500}
                            />
                        </div>
                    ))}
                </div>
                <div className="wheel-right-arrow" onClick={prevImage}></div>
            </div>
        </>
    );
}

const ProjectModal: React.FC<{
    currentProject: string;
    closeModal: () => void;
}> = ({ currentProject, closeModal }) => {
    console.log(currentProject);
    return (
        <>
            <div className="project-overlay" onClick={closeModal}></div>
            <div className="project-modal">
                <div>
                    <h1>{currentProject}</h1>
                </div>

                <p>
                    Iswavle is an e-learning platform, where users can create
                    courses or watch courses created by other people. In this
                    project I focused on making everything dynamic and marketing
                    ready. You can fire events, change or add banners, change
                    courses on the display, add or remove categories, create
                    discounts etc. This project utilizes: Laravel, React,
                    GraphQL, MySQL database, Vimeo API. Iswavle is in it's last
                    phase and will be deployed soon, until then I will provide
                    you screenshots and description of it's main functionality.
                </p>

                <div className="project-modal-image-container">
                    <img src={iswavleMain} />
                </div>
                <p>
                    Everything displayed on the main page is fully dynamic and
                    can be customized from admin panel.
                </p>
                <div className="project-modal-image-container">
                    <img src={iswavleBanner} />
                </div>
                <p>
                    Login and registration of the user is done by either filling
                    in the form or using Social Login (Facebook, Google)
                </p>
                <div className="project-modal-image-container">
                    <img src={iswavleAuth} />
                </div>
                <p>
                    <strong>
                        Videos / Episodes are added and displayed using Vimeo
                        API:
                    </strong>
                    <ul>
                        <li>
                            <p>
                                Intro episode - it's displayed on the course
                                overview page and contains information about
                                course content.
                            </p>
                            <div className="project-modal-image-container">
                                <img src={iswavleOverview} />
                            </div>
                        </li>
                        <li>
                            <p>
                                Courses are cut into sections, which by
                                themselves contain episodes. It makes navigating
                                much easier and overall improves use experience.
                            </p>
                        </li>
                        <li>
                            <p>
                                Episodes are shown in the similar manner, video
                                using Vimeo and description underneath. Also,
                                whereas in courses users can leave ratings,
                                episodes only contain comments.
                            </p>
                            <div className="project-modal-image-container">
                                <img src={iswavleEp} />
                            </div>
                        </li>
                        <li>
                            <p>
                                You might ask, how is this all added? everything
                                is done with one form, where you can add as many
                                sections and episodes as you want. Controller
                                automatically uploads videos on vimeo and sets
                                thumbnail.
                            </p>
                            <div className="project-modal-image-container">
                                <img src={iswavleAdd} />
                            </div>
                        </li>
                    </ul>
                </p>
                <p>
                    This project is quite a giant, that's why you might've
                    noticed, that many things need polishing.
                </p>
            </div>
        </>
    );
};
