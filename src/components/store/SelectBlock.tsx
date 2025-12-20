import React, {useEffect, useState} from "react";

import checkbox from '../../assets/icons/checkbox.png';
import { SearchTerm } from "../../utils/api";

const year:string = new Date().getFullYear().toString();

// Типы для пропсов
type SelectBlockProps = {
    title: string,
    toggleable: boolean,
    data: SearchTerm[],
    select: (items: number[]) => void,
}

/**
 * Компонент поля, содержащего в себе варианты для выборки данных и расопложенный в левой колонке магазина
 * 
 * @param {SelectBlockProps} props набор пропсов для работы поля
 * @param {string} title отображаемое название поля
 * @param {boolean} toggleable флаг, указывающий является ли поле раскрываемым / сворачиваемым
 * @param {SearchTerm[]} data массив исходных данных формата SearchTerm
 * @param {(items: number[]) => void} select функция, вызываемая при активации / деактивации чекбокса
 * @returns JSX разметка компонента
 */
const SelectBlock = ({title, toggleable, select, data}: SelectBlockProps) => {

    // Раскрытие / сворачивание списка
    const[opened, toggleOpened] = useState<boolean>(false);

    // Первый рендер
    const[firstRender, setFirstRender] = useState<boolean>(true);

    // Cписок выбранных значений
    const [items, setItems] = useState<number[]>([]);

    // Разделение списка для раскрытия и сворачивания
    const alwaysDisplayed = data.slice(0, 3);
    const remaining = data.slice(3);

    // Функция выбора значений
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>):void => {
        if(e.target.checked){
            setItems([...items, +e.target.value]);
        } else {
            setItems(items.filter(item => item !== +e.target.value));
        }
    }

    // ОБновление списка 
    useEffect(() => {
        if(firstRender){
            setFirstRender(false);
            return;
        }

        select(items);
    }, [items]);

    return <div className="select-block">
        <h3 className="select-block-title" onClick={() => {toggleOpened(!opened)}}>{title}</h3>
        
        {toggleable ? <div className={opened ? "toggle-arrow active" : "toggle-arrow"} onClick={() => {toggleOpened(!opened)}}>▼</div> : null}

        {alwaysDisplayed.map( item => <label key={item.id}>
            <input type="checkbox" value={item.id} checked={items.includes(item.id)} onChange={handleSelect}/> 
            <div className="img-bg">
                <img src={checkbox} alt="checkbox"/>
            </div>
            {item.name} 
            <span className="game-count">{item.count || null}</span>
        </label>)}
        
        { (!toggleable || opened) ? <>
            {remaining.map( item => <label key={item.id}>
                <input type="checkbox" value={item.id} checked={items.includes(item.id)} onChange={handleSelect}/>
                <div className="img-bg">
                    <img src={checkbox} alt="checkbox"/>
                </div>
                {item.name}
                <span className="game-count">{item.count || null}</span>
            </label>)}
        </> : null }
    
    </div>
}


export default SelectBlock;