import React, {useState} from "react";

import checkbox from '../../assets/icons/checkbox.png';

const year:string = new Date().getFullYear().toString();

const SelectBlock = () => {

    const[opened, toggleOpened] = useState<boolean>(false);

    return <div className="select-block">
        <h3 className="select-block-title">Дата выхода</h3>
        
        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Новинки</label>
        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Игры {year} года</label>
        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Старше 1 года</label>
        <label><input type="checkbox" name="" /> <div className="img-bg"><img src={checkbox} alt="checkbox" /></div> Будущие релизы</label>
    
    </div>
}

export default SelectBlock;