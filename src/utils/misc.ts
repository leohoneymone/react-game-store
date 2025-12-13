import { SearchTerm } from "./api";

const yearForReleaseOptionsList: string = new Date().getFullYear().toString();

// Список "Дата выхода" для выборки
export const releaseOptionsList: SearchTerm[] = [
    {id: 1, name: "Новинки", count: 0},
    {id: 2, name: `Игры ${yearForReleaseOptionsList} года`, count: 0},
    {id: 3, name: "Старше 1 года", count: 0},
    {id: 4, name: "Будущие релизы", count: 0},
];