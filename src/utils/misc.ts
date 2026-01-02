import { SearchTerm } from "./api";

const yearForReleaseOptionsList: string = new Date().getFullYear().toString();

// Список "Дата выхода" для выборки
export const releaseOptionsList: SearchTerm[] = [
    {id: 1, name: "Новинки", count: 0},
    {id: 2, name: `Игры ${yearForReleaseOptionsList} года`, count: 0},
    {id: 3, name: "Старше 1 года", count: 0},
    {id: 4, name: "Будущие релизы", count: 0},
];

// Тип данных для кастомного селекта
export type CustomSelectType = {
    id: number,
    name: string,
    value: string,
}

// Сортировка для кастомного селекта
export const customSelectSortingOptions: CustomSelectType[] = [
    {id: 1, name: "Сначала популярные", value: "-ratings_count"},
    {id: 2, name: "Сначала новые", value: "-released"},
    {id: 3, name: "Сначала актуальные", value: "-updated"},
    {id: 4, name: "С высоким рейтингом", value: "-rating"},
    {id: 5, name: "В алфавитном порядке", value: "name"},
];

// Выбор количества отображаемых плиток на странице
export const customSelectTilesPerPageOptions:  CustomSelectType[] = [
    {id: 1, name: "12", value: "12"},
    {id: 2, name: "24", value: "24"},
    {id: 3, name: "36", value: "36"}
];


/**
 * Функция для рассчёта интервала дат выхода. На основе выбранных параметров подбирает минимальную начальную и максимальную конечную дату для интервала
 * 
 * @param dates массив выбранных ID дат выхода, обозначенных в формате SearchTerm
 * @returns подстрока, встраиваемая в запрос на сервер
 */
export const processReleaseDateInterval = (dates: number[]):string => {
    
    // Переменные и константы с датами
    const d: Date = new Date();
    let start: Date = new Date(d);
    let end: Date = new Date(d);

    /**
     * Функция для форматирования даты в нужный формат строки
     * 
     * @param {Date} date объект даты
     * @returns {string} отформатированная для запроса строка
     */
    const formatDate = (date: Date): string => {
        const year: string = date.getFullYear().toString();
        const month: string = date.getMonth() >= 9 ? (date.getMonth() + 1).toString() : `0${date.getMonth() + 1}`;
        const day: string = date.getDate() >= 10 ? date.getDate().toString() : `0${date.getDate()}`;
        return `${year}-${month}-${day}`;
    };

    // Новинки (вышедшие за последний месяц игры)
    if (dates.includes(1)){
        start.setMonth(d.getMonth() - 1);
    }

    // Игры, вышедшие в этом году
    if(dates.includes(2)){
        start = new Date(d.getFullYear(), 0, 1);
    }

    // Игры старше 1 года
    if(dates.includes(3)){
        start = new Date(1970, 0, 1);

        // Если другие параметры не установлены
        if(!dates.includes(1) && !dates.includes(2) && !dates.includes(4)){
            end.setFullYear(d.getFullYear() - 1);
        }
    }

    // Будущие релизы (на год вперёд)
    if(dates.includes(4)){
        end.setFullYear(d.getFullYear() + 1);

        // Если остальные параметры не установлены
        if(!dates.includes(1) && !dates.includes(2) && !dates.includes(3)){
            start = d;
        }
    }

    return `${formatDate(start)},${formatDate(end)}`;
}

/**
 * Функция, форматирующая строку из формата ISO 8601 в более человекопонятный вид для отображения внутри тайла ("плитки")
 * 
 * @param {string} str - дата в формате ISO 8601
 * @returns - возвращаемая строка даты и времени на русском языке
 */
export const formatDate = (str: string): string | null => {
    return str ? new Date(str).toLocaleDateString("ru", {year: 'numeric',  month: 'short',  day: 'numeric'}) : null;
}

/**
 * Функция для получения ID случайной игры
 * 
 * @param count количество игр
 * @returns случайны ID игры
 */
export const getRandomGameId = (count: number): number => {
    return Math.ceil(Math.random() * count);
}