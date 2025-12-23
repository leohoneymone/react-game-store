// Конфигурация

import { processReleaseDateInterval } from "./misc";

const url = process.env.RAWG_API_URL || '';
const apikey = process.env.RAWG_API_KEY || '';

// Тип сущностей для выборки данных
export interface SearchTerm {
    id: number,
    name: string,
    count: number,
}

// Тип получаемых данных об игрe
export interface Game {
    name: string,
    slug: string,
    genres: string[],
    tags: string[],
    screenshots: string[],
    platforms: string[],
    release: string,
}

// Тип полной информации об игре
export interface GameData{
    count: number,
    games: Game[],
}

// Список конечных точек API
enum Endpoints {
    genres = 'genres',
    tags = 'tags',
    games = 'games',
}

/**
 * Функция для обращения к Fortnite API для получения данных 
 * 
 * @param {Endpoints} endpoint конечная точка, к которой обращается API. Допустимые значения определены в enum Endpoints
 * @param {string} parameters необязательный параметр, определяющий внутри себя параметры для выборки данных. Является подстрокой GET запроса
 * * @param {string} slug необязательный параметр, алиас для поиска информации о игре
 * @returns {Promise<any>} промис, пробрасываемый далее для обработки данных. В зависимости от эндпоинта содержит в себе различные данные
 */
const rawgApiRequest = async (endpoint: Endpoints, parameters?: string, slug?:string): Promise<any> => {

    let requestUrl: string = `${url + endpoint}`;

    // Проверка на алиас и метод
    if(slug){
        if(endpoint === Endpoints.games){
            requestUrl += `/${slug}`;
        } else {
            throw new Error('Ошибка запроса. Параметр "slug" можно использовать только для эндпоинта "games"');
        }
    }

    requestUrl += `?key=${apikey}${parameters || ''}`;

    const result: Promise<any> = fetch(requestUrl, {method: 'GET'})
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .catch(err => {console.error(`Ошибка получения данных: ${err}`)});

    return result;
}

/**
 * Функция для получения списка жанров в порядке убывания количества игр
 * 
 * @returns {Promise<SearchTerm[]>} промис формата SearchTerm, содержащий список жанров
 */
export const getGenres = (): Promise<SearchTerm[]> => {
    return rawgApiRequest(Endpoints.genres, '&ordering=-games_count')
        .then(data => data.results.map(item => {
            return {id: item.id, name: item.name, count: item.games_count}
        }));
}

/**
 * Функция для получения списка пользовательских тегов в порядке убывания количества игр
 * 
 * @returns {Promise<SearchTerm[]>} промис формата SearchTerm, содержащий список тегов
 */
export const getTags = (): Promise<SearchTerm[]> => {
    return rawgApiRequest(Endpoints.tags, '&ordering=-games_count&page_size=21')
        .then(data => data.results.map(item => {
            return {id: item.id, name: item.name, count: item.games_count}
        }));
}

/**
 * Функция для получения списка игр по параметрам выборки
 * 
 * @param {number} tilesOnPage количество плиток на странице. По умолчанию 12
 * @param {number} page номер страницы. По умолчанию 1
 * @param {string} platform выбранная платформа 
 * @param {number[]} dates параметры даты выхода. Массив из ID значений, обрабатывается особым образом внутри функции
 * @param {number[]} genres выбранные жанры. Массив из ID значений
 * @param {number[]} tags выбранные пользовательские теги. Массив из ID значений
 * @param {string} sort порядок сортировки, согласно API
 * @param {string} search запрос из посиковой строки
 *  
 * @returns {Promise<GameData[]>} промис формата GameData, содержащий список игр и их количество
 */
export const getGames = (tilesOnPage:number = 12, page: number = 1, platform:string, dates: number[], genres: number[], tags: number[], sort: string, search: string): Promise<GameData> => {

    let getParams: string = `&page_size=${tilesOnPage}&page=${page}`;

    // Даты выхода
    if(dates.length) {
        getParams += `&dates=${processReleaseDateInterval(dates)}`;
    }

    // Платформа
    getParams += platform !== '0' ? `&parent_platforms=${platform}` : '';

    // Жанры
    getParams += genres.length ? `&genres=${genres.join(',')}` : '';

    // теги
    getParams += tags.length ? `&tags=${tags.join(',')}` : '';

    // Порядок сортировки
    getParams += `&ordering=${sort}`;

    // Поисковой запрос
    getParams += search ? `&search=${search}` : '';

    return rawgApiRequest(Endpoints.games, getParams)
        .then(data => {
            return {
                count: data.count,
                games: data.results.map(item => {
                    return {
                        name: item.name,
                        slug: item.slug,
                        genres: item?.genres?.map(g => g?.name) ?? [],
                        tags: item?.tags?.map(t => t?.name) ?? [],
                        screenshots: item?.short_screenshots?.map(i => i?.image) ?? [],  
                        platforms: item.parent_platforms.map(p => p.platform?.name),
                        release: item.released,
                    }
                }) 
            } 
        });
}

// Тип для разработчиков и издателей
interface Creator {
    slug: string,
    name: string,
}

// Тип для оценок игры
export interface GameRatings {
    total: number,
    top: number,
    ratings: {
        title: string,
        count: number,
        percent: number,
    }[],
    metacritic: {
        url: string,
        score: number,
    }
}

// Тип для полной информации о игре
export interface GameFullData extends Game {
    background: string,
    description: string,
    developers: Creator[],
    publishers: Creator[],
    rating: GameRatings,
    reviewsCount: number,
    ratesCount: number,
}

// Тип с информацией о магазине
export interface GameStore {
    id: number,
    url: string,
}

// Тип с достижениями
export interface Achievements {
    count: number,
    items: {
        id: number
        name: string,
        description: string,
        image: string,
        percent: number,
    }[]
}

/**
 * Функция для получения подробной информации о игре
 * 
 * @param {string} slug алиас, укзывающий на необходимую игру
 * @returns {Promise<GameFullData>} промис формата GameFullData, содержащий в себе объект с информацией о игре
 */
export const getFullGameInfo = (slug: string): Promise<GameFullData> => {
    return rawgApiRequest(Endpoints.games, undefined, slug)
        .then(data => {
            return {
                name: data.name,
                slug: data.slug,
                genres: data?.genres?.map(g => g?.name) ?? [],
                tags: data?.tags?.map(t => t?.name) ?? [],
                screenshots: [],  
                platforms: data.parent_platforms.map(p => p.platform?.name),
                release: data.released,
                background: data.background_image,
                description: data.description_raw,
                developers: data.developers.map(item => { return {slug: item.slug, name: item.name}}),
                publishers: data.publishers.map(item => { return {slug: item.slug, name: item.name}}),
                rating: {
                    total: data.rating,
                    top: data.rating_top,
                    ratings: data.ratings.map(item => { return {title: item.title, count: item.count, percent: item.percent}}),
                    metacritic: {
                        url: data.metacritic_url ?? "",
                        score: data.metacritic ?? 0, 
                    }
                },
                reviewsCount: data.reviews_text_count,
                ratesCount: data.reviews_count
            }
        })
}

/**
 * Функция для получения скриншотов игры
 * 
 * @param {string} slug алиас, укзывающий на необходимую игру
 * @returns {Promise<string[]>} промис, содержащий в себе массив с URL скриншотов игры
 */
export const getGameScreenshots = (slug: string): Promise<string[]> => {
    return rawgApiRequest(Endpoints.games, undefined, `${slug}/screenshots`)
        .then(data => data?.results?.map(item => item.image) ?? []);
}

/**
 * Функция для получения информации о магазинах, где можно купить игру
 * 
 * @param {string} slug алиас, укзывающий на необходимую игру
 * @returns {Promise<GameStore[]>} промис, содержащий в себе массив объектов с информацией о магазинах игр
 */
export const getGameStores = (slug: string): Promise<GameStore[]> => {
    return rawgApiRequest(Endpoints.games, undefined, `${slug}/stores`)
        .then(data => data?.results?.map(item => {return {id: item.store_id, url:item.url}}) ?? []);
}

/**
 * Функция для получения подробной информации о достижениях. Получает по 10 достижений за 1 запрос - ограничение API
 * 
 * @param {string} slug алиас, укзывающий на необходимую игру
 * @param {number} page номер "страницы" - используется для дозагрузки данных
 * @returns {Promise<Achievements>} промис формата Achievements, содержащий в себе объект с информацией о достижениях
 */
export const getGameAchievements = (slug: string, page: number): Promise<Achievements> => {
    return rawgApiRequest(Endpoints.games, `&page=${page}`, `${slug}/achievements`)
        .then(data => {
            return {
                count: data?.count,
                items: data?.results,
            }
        });
}