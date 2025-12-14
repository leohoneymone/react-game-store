import React, { useState } from "react";
import { CustomSelectType } from "../../utils/misc";

// Тип пропсов для селектора
type CustomSelectProps = {
    data: CustomSelectType[],
    value: string,
    select: (value: string) => void
}

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