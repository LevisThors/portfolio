import React from "react";
import { useIsMobile } from "../../util/useIsMobile";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";

import "./SkillsComponent.scss";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#22c1da",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

interface SkillsComponentProps {
    label: string;
    progress: number;
}
const SkillsComponent: React.FC<SkillsComponentProps> = ({
    label,
    progress,
}) => {
    return (
        <div className="gauge-container">
            <span>{label}</span>
            <StyledRating
                name="customized-color"
                defaultValue={Math.floor(progress / 20)}
                getLabelText={(value: number) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<BakeryDiningIcon fontSize="inherit" />}
                emptyIcon={<BakeryDiningIcon fontSize="inherit" />}
                disabled={true}
            />
        </div>
    );
};

export default function SkillsComponentContainer() {
    const { isMobile } = useIsMobile();

    return (
        <>
            <div className="background-croissants"></div>
            <div className="skills">
                {!isMobile ? (
                    <>
                        <div className="skills-row">
                            <SkillsComponent label="HTML" progress={83} />
                            <SkillsComponent label="CSS" progress={79} />
                            <SkillsComponent label="Javascript" progress={86} />
                            <SkillsComponent label="PHP" progress={83} />
                            <SkillsComponent label="Python" progress={77} />
                        </div>
                        <div className="skills-row">
                            <SkillsComponent label="Laravel" progress={88} />
                            <SkillsComponent label="React" progress={82} />
                            <SkillsComponent label="GraphQL" progress={84} />
                            <SkillsComponent label="MYSQL" progress={87} />
                            <SkillsComponent label="PostgreSQL" progress={88} />
                        </div>
                        <div className="skills-row">
                            <SkillsComponent label="Magento" progress={66} />
                            <SkillsComponent label="Flask" progress={50} />
                            <SkillsComponent label="Photoshop" progress={80} />
                            <SkillsComponent label="Figma" progress={60} />
                            <SkillsComponent label="C#" progress={80} />
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="skills-mobile-header">Skills</h1>
                        <div className="skills-row">
                            <SkillsComponent label="HTML" progress={83} />
                            <SkillsComponent label="CSS" progress={79} />
                            <SkillsComponent label="Javascript" progress={86} />
                        </div>
                        <div className="skills-row">
                            <SkillsComponent label="PHP" progress={83} />
                            <SkillsComponent label="Python" progress={77} />
                            <SkillsComponent label="C#" progress={80} />
                        </div>
                        <div className="skills-row">
                            <SkillsComponent label="Laravel" progress={88} />
                            <SkillsComponent label="React" progress={82} />
                            <SkillsComponent label="GraphQL" progress={84} />
                        </div>
                        <div className="skills-row">
                            <SkillsComponent label="MYSQL" progress={87} />
                            <SkillsComponent label="Magento" progress={66} />
                            <SkillsComponent label="Flask" progress={50} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
