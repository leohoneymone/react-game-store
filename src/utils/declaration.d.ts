// .env-файлы
declare namespace NodeJS {
    interface processEnv {
        readonly RAWG_API_URL: string,
        readonly RAWG_API_KEY: string,
    }
}

// Изображения
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg'; 
declare module '*.gif';
declare module '*.svg';
declare module '*.ico';