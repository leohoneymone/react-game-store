import React, {useState, useEffect, useRef} from "react";

/**
 * Компонент, реализующий панель со скриншотами игры и механизмами для выбора и смены скриншотов
 * 
 * @param props пропсы 
 * @param {string[]} images массив URL-ов скриншотов
 * @returns JSX-разметка компонента
 */
const Screenshots = ({images}: {images: string[]}) => {
    
    // Состояния
    const [autoScroll, setAutoScroll] = useState<boolean>(true);
    const [selected, setSelected] = useState<number>(0);

    // Реф для таймера
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Очистка таймера при размонтировании компонента
    const handleIntervalClear = ():void => {
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    // Загрузка скриншотов 
    useEffect(() => {

        return () => {
            handleIntervalClear();
        }
    }, []);

    // Установка таймера
    useEffect(() => {
        if(!autoScroll){
            handleIntervalClear();
            return;
        }

        timerRef.current = setInterval(() => {
            setSelected(prev => (prev + 1 < images.length) ? prev + 1 : 0);
        }, 3000);

    }, [autoScroll]);

    // Выбор изображения
    const handleImageSelect = (e: React.MouseEvent<HTMLImageElement>):void => {
        setAutoScroll(false); 
        setSelected(images.indexOf(e.currentTarget.src));
    }

    return <div className="screenshots-container">
        <img src={images[selected]} alt={images[selected]} className="selected-screenshot"/>

        <div className="screenshot-selector">

            {images.map(item => <img key={item} src={item} alt={item} className={`screenshot-item ${item === images[selected] ? "current" : ""}`} onClick={handleImageSelect}/>)}

        </div>
    </div>
}

export default Screenshots;