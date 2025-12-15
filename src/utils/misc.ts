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
    {id: 1, name: "Сначала новые", value: "-released"},
    {id: 2, name: "Сначала актуальные", value: "-updated"},
    {id: 3, name: "С высоким рейтингом", value: "-rating"},
    {id: 4, name: "В алфавитном порядке", value: "name"},
];

// Выбор количества отображаемых плиток на странице
export const customSelectTilesPerPageOptions:  CustomSelectType[] = [
    {id: 1, name: "12", value: "12"},
    {id: 2, name: "24", value: "24"},
    {id: 3, name: "48", value: "48"}
];