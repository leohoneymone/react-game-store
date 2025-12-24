import React from "react";

type AchievementsProps = {
    name: string,
    description: string,
    image: string,
    percent: number,
}

const Achievement = ({name, description, image, percent}: AchievementsProps) => {
    return <div className="achievement-item">
        <img src={image} alt={image} />
        <div className="achievement-trivia">
            <h4>{name}</h4>
            <p className="description">{description}</p>
            <p className="percent">Есть у {percent}% игроков</p>
        </div>
    </div>
}

export default Achievement;