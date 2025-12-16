// Конфигурация

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
 * @returns {Promise<any>} промис, пробрасываемый далее для обработки данных. В зависимости от эндпоинта содержит в себе различные данные
 */
const rawrApiRequest = async (endpoint: Endpoints, parameters?: string): Promise<any> => {

    const requestUrl: string = `${url + endpoint}?key=${apikey}${parameters || ''}`;

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
    return rawrApiRequest(Endpoints.genres, '&ordering=-games_count')
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
    return rawrApiRequest(Endpoints.tags, '&ordering=-games_count&page_size=21')
        .then(data => data.results.map(item => {
            return {id: item.id, name: item.name, count: item.games_count}
        }));
}

/**
 * Функция для получения списка игр по параметрам выборки
 * 
 * @returns {Promise<GameData[]>} промис формата GameData, содержащий список игр и их количество
 */
export const getGames = (): Promise<GameData> => {
    return rawrApiRequest(Endpoints.games, '&page_size=12')
        .then(data => {
            return {
                count: data.count,
                games: data.results.map(item => {
                    return {
                        name: item.name,
                        slug: item.slug,
                        genres: item.genres.map(g => g?.name),
                        tags: item.tags.map(t => t?.name),
                        screenshots: item.short_screenshots.map(i => i?.image),  
                        platforms: item.parent_platforms.map(p => p.platform?.name),
                        release: item.released,
                    }
                }) 
            } 
        });
}