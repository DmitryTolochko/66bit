import { NavLink, useParams } from "react-router-dom";
import arrow from '../../images/icons/right-arrow.svg';
import './Menu.scss';

export default function Menu() {
    const params = useParams();

    return (<>
        <div className="menu-wrapper">
            <div className="menu">
                <NavLink to='/' className='menu-option'>Главная</NavLink>
                <img alt='arrow' src={arrow}/>
                <NavLink to='/' className='menu-option'>Список сотрудников</NavLink>
                {params?.id ? (<>
                    <img alt='arrow' src={arrow}/>
                    <NavLink to='/profile/1' className='menu-option'>Дмитриев Игорь Степанович</NavLink>
                </>) : <></>}
               
            </div>
        </div>
    </>)
    
}