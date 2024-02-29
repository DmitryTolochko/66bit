import { Outlet } from "react-router-dom";
import Menu from "../menu/Menu";
import Toggle from "../toggle/Toggle";
import './Header.scss';
import logo from '../../images/logo.png';

export default function Header() {
    return (<>
        <section className="header-wrapper">
            <div className="header">
                <img alt='logo' src={logo}/>
                <span className="header-text">
                    <span>
                        <p className="thin-p">+7 343 290 84 76</p>
                        <p className="thin-p">info@66bit.ru</p>
                    </span>
                    <Toggle/>
                </span>
            </div> 
        </section>
        <Menu/>
        <Outlet/>    
    </>)    
}