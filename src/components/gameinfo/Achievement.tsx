import React from "react";

// Тип пропсов для достижений
type AchievementsProps = {
    name: string,
    description: string,
    image: string,
    percent: number,
}

/**
 * Компонент, отображающий достижение в виде отдельного блока
 * 
 * @param {AchievementsProps} пропсы 
 * @param {string} name название достижения
 * @param {string} description описание / требования для достижения 
 * @param {string} image URL иконки достижения 
 * @param {number} percent процент получения среди игроков 
 * @returns JSX-разметка достижения
 */
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