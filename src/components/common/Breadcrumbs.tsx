import React from "react";
import { Link } from "react-router-dom";

// Типы пропсов для хлебных крошек
type BreadcrumbsProps = {
    url: string,
    name: string
}

/**
 * Компонент, реализующий упрощённый вариант "хлебных крошек". Поскольку приложение имеет малую вложенность, "крошки" ограничены двумя ссылками
 * 
 * @param {BreadcrumbsProps} props набор пропсов 
 * @param {string} url URL куда ведёт ссылка
 * @param {string} name Название ссылок
 * @returns JSX-разметка "хлебных крошек" 
 */
const Breadcrumbs = ({url, name}:BreadcrumbsProps) => {

    return <div className="breadcrumbs">
        <Link to="/#" className="breadcrumb-link">Главная</Link>
        <p className="delimiter">/</p>
        <Link to={url} className="breadcrumb-link">{name}</Link> 
    </div>
}

export default Breadcrumbs;