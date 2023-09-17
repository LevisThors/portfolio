import { useState } from "react";
import iswavleBanner from "../../assets/iswavle-banners.png";
import iswavleAdd from "../../assets/iswavle-add.png";
import iswavleAuth from "../../assets/iswavle-auth.png";
import iswavleEp from "../../assets/iswavle-ep.png";
import iswavleMain from "../../assets/iswavle-main.png";
import iswavleOverview from "../../assets/iswavle-overview.png";
import quizzyAdd1 from "../../assets/quizzy-add-1.png";
import quizzyAdd2 from "../../assets/quizzy-add-2.png";
import quizzyApprove from "../../assets/quizzy-approve.png";
import quizzyFinished from "../../assets/quizzy-finished.png";
import quizzyMain from "../../assets/quizzy-main.png";
import quizzyQuizOpen from "../../assets/quizzy-quiz-open.png";
import quizzyQuiz from "../../assets/quizzy-quiz.png";
import tgmAdd from "../../assets/tgm-add.png";
import tgmMain from "../../assets/tgm-main.png";
import tgmPost from "../../assets/tgm-post.png";
import whaleAddCart from "../../assets/whale-add-to-cart.png";
import whaleCart from "../../assets/whale-cart.png";
import whaleMain from "../../assets/whale-main.png";
import whaleNotif from "../../assets/whale-notif.png";
import whalePending from "../../assets/whale-pending-trans.png";
import iswavleImage from "../../assets/iswavle.png";
import whaleImage from "../../assets/whale.png";
import tgmImage from "../../assets/tgm.png";
import quizzyImage from "../../assets/quizzy.png";
import museumMain from "../../assets/museum-main.png";
import museum from "../../assets/museum.png";
import { useIsMobile } from "../../util/useIsMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

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
        iswavleImage,
        quizzyImage,
        whaleImage,
        tgmImage,
        museumMain,
    ];

    const projectNames = [
        "Iswavle",
        "Quizzy",
        "Whale",
        "The Gaming Maniacs",
        "Museum",
    ];

    const [activeImage, setActiveImage] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [modal, setModal] = useState("");
    const { isMobile } = useIsMobile();

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

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setDragStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) {
            const offsetX = e.touches[0].clientX - dragStartX;
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

    const handleTouchEnd = () => {
        setIsDragging(false);
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

    const faFontSize = !isMobile ? "99px" : "40px";

    return (
        <>
            {showModal && (
                <ProjectModal currentProject={modal} closeModal={closeModal} />
            )}
            {isMobile && <h1 className="projects-tab">PROJECTS</h1>}

            <div className="wheel-container">
                <div className="wheel-left-arrow" onClick={nextImage}>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        style={{ color: "#ffffff", fontSize: faFontSize }}
                    />
                </div>
                <div className="wheel-images">
                    {images.map((image, index) => (
                        <div
                            className={`wheel-image ${imagePosition(index)}`}
                            key={index}
                        >
                            {index === activeImage && !isMobile && (
                                <>
                                    <div
                                        className="wheel-image-overlay"
                                        onClick={() =>
                                            handleClick(projectNames[index])
                                        }
                                    >
                                        <span className="wheel-image-overlay-text">
                                            {projectNames[index]}
                                        </span>
                                    </div>
                                </>
                            )}
                            <img
                                src={image}
                                alt="Main"
                                width={isMobile ? 260 : 700}
                                height={isMobile ? 170 : 500}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                style={{
                                    cursor: isDragging ? "grabbing" : "grab",
                                }}
                            />

                            {isMobile && (
                                <h2 className="wheel-project-name">
                                    {projectNames[index]}
                                </h2>
                            )}
                        </div>
                    ))}
                </div>
                <div className="wheel-right-arrow" onClick={prevImage}>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        style={{ color: "#ffffff", fontSize: faFontSize }}
                    />
                </div>
            </div>
        </>
    );
}

const ProjectModal: React.FC<{
    currentProject: string;
    closeModal: () => void;
}> = ({ currentProject, closeModal }) => {
    return (
        <>
            <div className="project-overlay" onClick={closeModal}></div>
            <div className="project-modal">
                <div>
                    <h1>{currentProject}</h1>
                </div>
                {currentProject === "Iswavle" && <IswavleComponent />}
                {currentProject === "Quizzy" && <QuizzyComponent />}
                {currentProject === "The Gaming Maniacs" && (
                    <TheGamingManiacsComponent />
                )}
                {currentProject === "Whale" && <WhaleComponent />}
                {currentProject === "Museum" && <MuseumComponent />}
            </div>
        </>
    );
};

const IswavleComponent = () => {
    return (
        <>
            <p>
                Iswavle is an Georgian E-learning platform, where users can
                create courses or watch already existing ones. Main point of
                this project is to create courses for Georgian speaking people.
                As of currently, there is no way to learn everything in one
                place for free / cheap. But with Iswavle I want to change that
                and make creating and watching courses simple and cheap. In this
                project I focused on making everything dynamic, easy to
                navigate, understand and customize. You can start events, change
                or add new banners, change courses on the display, add or remove
                categories, create discounts and much more from the admin panel.
                This project utilizes: Laravel, React, GraphQL, MySQL database,
                Vimeo API. I am actively working on developing and polishing
                Iswavle and hopefully I will be able to launch demo soon.
            </p>
            <p>Here's a bit more about this project:</p>
            <div className="project-modal-image-container">
                <img src={iswavleMain} />
            </div>
            <p>
                Everything displayed on the main page is fully dynamic and can
                be customized from admin panel.
            </p>
            <div className="project-modal-image-container">
                <img src={iswavleBanner} />
            </div>
            <p>
                Login and registration of the user is done by either filling in
                the form or using Social Login (Facebook, Google)
            </p>
            <div className="project-modal-image-container">
                <img src={iswavleAuth} />
            </div>
            <p>
                <strong>
                    Videos / Episodes are added and displayed using Vimeo API:
                </strong>
                <ul>
                    <li>
                        <p>
                            Intro episode - it's displayed on the course
                            overview page and contains information about course
                            content.
                        </p>
                        <div className="project-modal-image-container">
                            <img src={iswavleOverview} />
                        </div>
                    </li>
                    <li>
                        <p>
                            Courses are cut into sections, which contain
                            episodes. It makes navigating much easier and
                            overall improves user experience.
                        </p>
                    </li>
                    <li>
                        <p>
                            Episodes are shown in the similar manner, main
                            accent is on the episode frame, under which we can
                            find description of the episode, any necessary /
                            additional materials and comments. Also, whereas in
                            courses users can leave ratings, episodes only
                            contain comments.
                        </p>
                        <div className="project-modal-image-container">
                            <img src={iswavleEp} />
                        </div>
                    </li>
                    <li>
                        <p>
                            Courses are uploaded with a single form, which
                            automatically uploads videos to Vimeo and saves
                            embed link to database.
                        </p>
                        <div className="project-modal-image-container">
                            <img src={iswavleAdd} />
                        </div>
                    </li>
                </ul>
            </p>
            <p>
                This is the project I am currently working on, so you can expect
                updates on this one.
            </p>
        </>
    );
};

const QuizzyComponent = () => {
    return (
        <>
            <p>
                Quizzy was my first project, which was also a project for final
                exam of Back end programming in university. I completed this
                website in a day and due to such short deadline (it was totally
                my fault) I had to slack on styling and use bootstrap, that's
                why it looks so ugly.
            </p>
            <img src={quizzyMain} />
            <p>
                As you probably already guessed from its name, Quizzy is a
                website where users can either create or complete quizzes.
                Here's how it's done. There are steps which should be completed
                to add the quiz, first comes overall infromation about quiz:
            </p>
            <img src={quizzyAdd1} />
            <p>
                Then you add each question one by one, once finished click
                finish:
            </p>
            <img src={quizzyAdd2} />
            <p>
                Once quiz is submitted, it will go to admin for approval. In the
                meantime you can check or edit the quiz from your account.
            </p>
            <p>
                This is how approval request works from admin side (Admin can
                also modify or delete course and questions):
            </p>
            <img src={quizzyApprove} />
            <p>Here's our freshly added course:</p>
            <img src={quizzyQuiz} />
            <p>
                Quiz is as simply implemented as it gets, there's an image,
                question and four answers.
            </p>
            <img src={quizzyQuizOpen} />
            <p>When you finish the course scores are displayed as expected.</p>
            <img src={quizzyFinished} />
            <p>
                In conclusion, it's a simple quiz app, where you can create any
                type of quiz.
            </p>
        </>
    );
};

const WhaleComponent = () => {
    return (
        <>
            <p>
                Whale is my first e-commerce project. Although it lacks a lot,
                it was a great experience for me to face the issues which arise
                during incorrect implementation and structure.
            </p>
            <img src={whaleMain} />
            <p>
                The main idea was to create cart and checkout system, so that's
                what the app does.
            </p>
            <img src={whaleAddCart} />
            <img src={whaleCart} />
            <p>
                When user checks out, transaction becomes pending and is sent to
                admin for approval.
            </p>
            <img src={whalePending} />
            <p>Once transaction is approved user receives a notification.</p>
            <img src={whaleNotif} />
            <p>Admin can also send custom notifications to selected users.</p>
            <p>
                In conclusion, this project was more of an experiment, to find
                out why thing are built the way they are in ecommerce websites.
                And it indeed worked, I now have much deeper understanding of
                edge cases, which must be kept in mind when developing such
                website.
            </p>
        </>
    );
};

const TheGamingManiacsComponent = () => {
    return (
        <>
            <p>
                When searching through game wikis and reviews, it came to mind,
                is it hard to create a web-site where you can post blogs? <br />
                At the time I developed this project I was relatively new to the
                web development, so I used what I knew, in particular: Laravel
                with its templating engine - blade and bootstrap. To be honest I
                regret using bootstrap, as in my opinion it binds you and gives
                you only so much options to choose from.
            </p>
            <img src={tgmMain} />
            <p>
                Website structure, both front-end and back-end are pretty simple
                and basic . Even now I think, that building website for blogs is
                one of the simplest tasks as you don't have to think about
                products, carts, transactions, subscriptions(in some cases you
                have to) etc.
            </p>
            <img src={tgmPost} />
            <p>
                This project utilizes categories to fully control the main page.
                Also, rich text editor is built into it, to simplify adding
                posts. (with rich text editor you can just copy pre-written text
                with images, anchors... from word document)
            </p>
            <img src={tgmAdd} />
            <p>
                In conclusion, main point of this project was to learn what it
                means to build a website for blogs. Although this project was
                created just for learning purposes, I think it came out pretty
                well.
            </p>
        </>
    );
};

const MuseumComponent = () => {
    return (
        <>
            <a
                href="https://levisthors.github.io/museum/"
                style={{ fontSize: "2rem" }}
            >
                VISIT SITE
            </a>
            <p>
                After seeing web-site of the Georgian National Museum, I decided
                to update it in my own ways.
            </p>
            <img src={museumMain} />
            <p>
                For reference I used popular museum web-sites such as - Louvre,
                British Museum etc.
            </p>
            <p>
                Web-site was built solely on client side, as it is only a
                prototype. For it I used Vite with react and sass was used for
                styling.
            </p>
            <img src={museum} />
            <p>
                Also, to manage languages easier and make it compatible for any
                back-end services I included React Router.
            </p>
            <p>
                It should be mentioned, that this web-site can connect to any
                API and display sections based on that.
            </p>
            <p>
                <i>
                    This website is used for demonstartion purposes only, I DO
                    NOT OWN any of the assets, images, videos, fonts used in the
                    application. Only source code and design of it belongs to
                    me.
                </i>
            </p>
        </>
    );
};
