import React from "react";

const year: string = new Date().getFullYear().toString();

const Footer = () => {

    return <footer>
        <div className="footer-content">

            <div className="footer-links-block">
                <h3 className="footer-title">Ссылки</h3>
                <a href="https://github.com/leohoneymone" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://github.com/leohoneymone/react-game-store" target="_blank" rel="noreferrer">Репозиторий</a>
                <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">RAWG API</a>                
            </div>

            <div className="footer-links-block">
                <h3 className="footer-title">Дополнительно</h3>
                <a href="#">О CLD GAMES</a>
                <a href="#">Ценообразование</a>
                <a href="#">Политика приватности</a>
            </div>

            <div className="footer-links-block">
                <h3 className="footer-title">Информация</h3>
                <a href="#">Поставщикам</a>
                <a href="#">Покупателям</a>
                <a href="#">Партнёрам</a>
            </div>

            <div className="footer-links-block" style={{flexGrow: 1}}>
                <h3 className="footer-title"> Поддержка</h3>
                <a href="#">FAQ</a>
                <a href="mailto:example@mail.com">Электронная почта</a>
                <a href="https://example.zendesk.com/tickets">Направить тикет</a>
            </div>
            
            <div className="author">
                <p>Автор: Leonard Honeymone</p>
            </div>
        </div>

        <div className="contrib-line">
            <div className="background"></div>

            <div className="contribution">
                <div className="contribution-content">
                    <p className="year-info">© {year} - cozamaLeonard. Все права защищены</p>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;