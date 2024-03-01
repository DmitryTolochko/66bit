import { NavLink, useParams } from "react-router-dom";
import arrow from '../../images/icons/right-arrow.svg';
import './Menu.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../App";

export default function Menu() {
    const params = useParams();
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get(api + 'api/Employee/' + params.id)
        .then(response => {
            setName(response.data.name);
        });

    }, [params])

    return (<>
        <div className="menu-wrapper">
            <div className="menu">
                <NavLink to='/' className='menu-option'>Главная</NavLink>
                <img alt='arrow' src={arrow}/>
                <NavLink to='/' className='menu-option'>Список сотрудников</NavLink>
                {params?.id ? (<>
                    <img alt='arrow' src={arrow}/>
                    <NavLink to='/profile/1' className='menu-option'>{name}</NavLink>
                </>) : <></>}
               
            </div>
        </div>
    </>)
    
}