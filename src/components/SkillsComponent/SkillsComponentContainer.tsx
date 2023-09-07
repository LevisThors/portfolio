import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../util/useIsMobile";

import "./SkillsComponent.scss";

interface SkillsComponentProps {
    label: string;
    highlightedBlocks: number;
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({
    label,
    highlightedBlocks,
}) => {
    const [blocks, setBlocks] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const generateBlocks = () => {
            const blocksArray: JSX.Element[] = [];
            for (let i = 0; i < 100; i++) {
                const rotation = (3.6 * i) % 360;
                const isHighlighted = i < highlightedBlocks;
                const blockStyle = {
                    transform: `rotate(${rotation}deg)`,
                    animationDelay: `${i / 100}s`,
                    backgroundColor: isHighlighted ? "#127a8a" : "transparent",
                    display: isHighlighted ? "block" : "none",
                };

                blocksArray.push(
                    <div className="block" key={i} style={blockStyle}></div>
                );
            }
            setBlocks(blocksArray);
        };

        generateBlocks();
    }, [highlightedBlocks]);

    return (
        <div>
            <div className="card">
                {blocks}
                <div className="rating">
                    <h2>{label}</h2>
                </div>
            </div>
        </div>
    );
};

export default function SkillsComponentContainer() {
    const { isMobile } = useIsMobile();

    return (
        <div className="skills">
            {!isMobile ? (
                <>
                    <div className="skills-row">
                        <SkillsComponent label="HTML" highlightedBlocks={83} />
                        <SkillsComponent label="CSS" highlightedBlocks={79} />
                        <SkillsComponent
                            label="Javascript"
                            highlightedBlocks={86}
                        />
                        <SkillsComponent label="PHP" highlightedBlocks={83} />
                        <SkillsComponent
                            label="Python"
                            highlightedBlocks={77}
                        />
                        <SkillsComponent label="C#" highlightedBlocks={47} />
                    </div>
                    <div className="skills-row">
                        <SkillsComponent
                            label="Laravel"
                            highlightedBlocks={88}
                        />
                        <SkillsComponent label="React" highlightedBlocks={82} />
                        <SkillsComponent
                            label="GraphQL"
                            highlightedBlocks={84}
                        />
                        <SkillsComponent label="MYSQL" highlightedBlocks={87} />
                        <SkillsComponent
                            label="PostgreSQL"
                            highlightedBlocks={88}
                        />
                    </div>
                    <div className="skills-row">
                        <SkillsComponent
                            label="Magento"
                            highlightedBlocks={66}
                        />
                        <SkillsComponent label="Flask" highlightedBlocks={50} />
                        <SkillsComponent
                            label="Photoshop"
                            highlightedBlocks={80}
                        />
                        <SkillsComponent label="Figma" highlightedBlocks={60} />
                    </div>
                </>
            ) : (
                <>
                    <h1 className="skills-mobile-header">Skills</h1>
                    <div className="skills-row">
                        <SkillsComponent label="HTML" highlightedBlocks={83} />
                        <SkillsComponent label="CSS" highlightedBlocks={79} />
                        <SkillsComponent
                            label="Javascript"
                            highlightedBlocks={86}
                        />
                    </div>
                    <div className="skills-row">
                        <SkillsComponent label="PHP" highlightedBlocks={83} />
                        <SkillsComponent
                            label="Python"
                            highlightedBlocks={77}
                        />
                        <SkillsComponent label="C#" highlightedBlocks={47} />
                    </div>
                    <div className="skills-row">
                        <SkillsComponent
                            label="Laravel"
                            highlightedBlocks={88}
                        />
                        <SkillsComponent label="React" highlightedBlocks={82} />
                        <SkillsComponent
                            label="GraphQL"
                            highlightedBlocks={84}
                        />
                    </div>
                    <div className="skills-row">
                        <SkillsComponent label="MYSQL" highlightedBlocks={87} />
                        <SkillsComponent
                            label="Magento"
                            highlightedBlocks={66}
                        />
                        <SkillsComponent label="Flask" highlightedBlocks={50} />
                    </div>
                </>
            )}
        </div>
    );
}
