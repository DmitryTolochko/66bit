import { useEffect, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import { api } from '../../App';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const params = useParams();
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [employmentDate, setEmploymentDate] = useState('');
    const [stack, setStack] = useState([]);
    const [position, setPosition] = useState('');

    useEffect(() => {
        axios.get(api + 'api/Employee/' + params.id)
        .then(response => {
            setName(response.data.name);
            setPhoto(response.data.photo);
            setPhone(response.data.phone);
            setBirthdate(response.data.birthdate);
            setEmploymentDate(response.data.dateOfEmployment);
            setStack(response.data.stack);
            setPosition(response.data.position);
        });
    }, []);

    return (<>
    <section className="profile-wrapper">
        <div className="profile">
            <div className="profile-head">
                <img alt='avatar' src={photo}/>
                <span>
                    <h2>{name}</h2>
                    <p>{position}</p>
                    <div className="stack-list">
                        {stack.map(el => 
                             <div className="tag grey" key={el}>
                                <p>{el}</p>
                            </div>
                        )}
                    </div>
                </span>
            </div>

            <div className="info-container">
                <h3>Основная информация</h3>
                <span>
                    <h4>Контактный телефон:</h4>
                    <p>{phone}</p>
                </span>

                <span>
                    <h4>Дата рождения:</h4>
                    <p>{birthdate}</p>
                </span>

                <span>
                    <h4>Дата устройства:</h4>
                    <p>{employmentDate}</p>
                </span>
            </div>
        </div>

    </section>
    </>)
}