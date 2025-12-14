import React, { useState } from "react";
import { CustomSelectType } from "../../utils/misc";

// Тип пропсов для селектора
type CustomSelectProps = {
    data: CustomSelectType[],
    value: string,
    select: (value: string) => void
}

/**
 * Кастомный компонент, реализующий логику поля со списком
 * 
 * @param {CustomSelectProps} props набор пропсов для работы поля со списком
 * @param {CustomSelectType[]} data массив возможных вариантов формата CustomSelectType
 * @param {string} value выбранное значение
 * @param {(value: string) => void} select функция, вызываемая при выборе пункта в списке
 * @returns JSX разметка компонента
 */
const CustomSelect = ({data, value, select}: CustomSelectProps) => { 
    
    // Состояния
    const[opened, toggleOpened] = useState<boolean>(false);    

    return <div className="custom-select">

        <div className="custom-select-selected" onClick={() => {toggleOpened(!opened)}}>
            {data.find(item => item.value === value)?.name || ""}
            <span className={opened ? "active" : undefined}>▼</span>
        </div>
        
        <div className={opened ? "custom-select-options active" : "custom-select-options"}>
            <ol className="options-list">

                {data.map(item => <li key={item.id} className={item.value === value ? "selected" : undefined} onClick={() => {select(item.value); toggleOpened(false);}}>{item.name}</li>)}

            </ol>
        </div>

    </div>
}

export default CustomSelect;