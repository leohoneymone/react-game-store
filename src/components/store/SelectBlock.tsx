import React, {useState} from "react";

import checkbox from '../../assets/icons/checkbox.png';

const year:string = new Date().getFullYear().toString();

// Типы для пропсов
type SelectBlockProps = {
    toggleable: boolean,
}

const SelectBlock = ({toggleable}: SelectBlockProps) => {

    const[opened, toggleOpened] = useState<boolean>(false);

    return <div className="select-block">
        <h3 className="select-block-title">Дата выхода</h3>
        
        {toggleable ? <div className={opened ? "toggle-arrow active" : "toggle-arrow"} onClick={() => {toggleOpened(!opened)}}>▼</div> : null}

        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Новинки</label>
        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Игры {year} года</label>
        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Старше 1 года</label>
        
        { (!toggleable || opened) ? <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Будущие релизы</label> : null }
    
    </div>
}


export default SelectBlock;