import React from "react";
import { GameRatings } from "../../utils/api";

// Иконки
import star from '../../assets/icons/star-color.png';

const sortRatingsArray = (arr: {title: string, count: number, percent: number}[]): {title: string, count: number, percent: number}[] => {
    const properOrder = ["exceptional", "recommended", "meh", "skip"];

    return arr.sort((a, b) => {
        const iA = properOrder.indexOf(a.title);
        const iB = properOrder.indexOf(b.title);

        if(iA !== -1 && iB !== -1){
            return iA - iB;
        } else {
            return iA === -1 ? -1 : 1;
        }
    })
}

/**
 * Функция для генерации массива из оценки. Используется для указания прозрачности "звёздочек" в оценке игры
 * 
 * @param {number} rate оценка игры по 5 бальной шкале
 * @returns {number[]} - массив со значениями оценок
 */
const generateStarRatesArray = (rate: number): number[] => {
    const starRates: number[] = new Array(5);
    let starRating: number = rate;
    for(let i = 0; i < 5; i++){
        starRates[i] = (starRating - 1 > 0) ? 1 : +(starRating.toFixed(2));
        if(starRates[i] < 0){starRates[i] = 0;}
        starRating--;
    }
    return starRates;
} 

const Ratings = ({rates}: {rates: GameRatings}) => {
    
    const ratesArr = sortRatingsArray(rates.ratings);

    return <div className="ratings-block">
        <h3>Оценки</h3>

        <div className="rating-block star-rating">
            <div className="stars-container">
                {generateStarRatesArray(rates.total).map((item, i) => <img key={`star-${i}`} src={star} alt="star" style={{filter: `brightness(${item})`}} className="star-icon"/>)}
            </div>
            <p className="number-rating">{rates.total}</p>
        </div>

        <div className="rating-block rates-number">
            <div className="ratings-gauge">
                {ratesArr.map(item => <div key={item.title} className={`ratings-gauge-block ${item.title}`} style={{width: `${item.percent}%`}}></div>)}
            </div>

            {ratesArr.map(item => <div key={`${item.title}-count`} className="ratings-counter">
                <div className="ratings-counter-title">
                    <div className={`ratings-gauge-block legend ${item.title}`}></div>
                    <span>{item.title}</span>
                </div>
                <span className="count">{item.count}</span>
            </div>)}

            <div className="ratings-counter total">
                <div className="ratings-counter-title">Всего:</div>
                {ratesArr.reduce((acc, item) => acc + item.count, 0)}
            </div>
        </div>

        { (rates.metacritic.url && rates.metacritic.score) ? 
            <div className="rating-block star-rating">
                <a href={rates.metacritic.url} target="_blank" rel="noreferrer"> <b><span className="metacritic-pseudologo">m</span> Metacritic</b></a>
                <p>{rates.metacritic.score}</p>
            </div> : null
        }

        <a href="#" className="goto-reviews">Перейти к обзорам</a>
    </div>
}

export default Ratings;