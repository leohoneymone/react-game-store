// Конфигурация

const url = process.env.RAWG_API_URL || '';
const apikey = process.env.RAWG_API_KEY || '';

// Тип сущностей для выборки данных
export interface SearchTerm {
    id: number,
    name: string,
    count: number,
}

// Список конечных точек API
enum Endpoints {
    genres = 'genres',
    tags = 'tags'
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
    return rawrApiRequest(Endpoints.tags, '&ordering=-games_count')
        .then(data => data.results.map(item => {
            return {id: item.id, name: item.name, count: item.games_count}
        }));
}