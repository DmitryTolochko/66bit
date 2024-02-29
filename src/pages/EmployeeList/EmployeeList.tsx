import CustomButton from "../../components/custom_button/CustomButton";
import ListItem from "../../components/list_item/ListItem";
import Tag from "../../components/tag/Tag";
import './EmployeeList.scss';
import downArrow from '../../images/icons/down-arrow.svg';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiltersContext, api } from "../../App";
import Falldown from "../../components/falldown/Falldown";

enum OpenFilterType {
    none,
    gender,
    position,
    stack
}

export const Positions = {
    Frontend: 'Frontend-разработчик',
    Backend: 'Backend-разработчик',
    Analyst: 'Аналитик',
    Manager: 'Менеджер',
    Designer: 'Дизайнер'
}

export const Stacks = {
    CSharp: 'C#',
    React: 'React',
    Java: 'Java',
    PHP: 'PHP',
    Figma: 'Figma',
    Word: 'Word'   
}

export const Genders = {
    Male: 'Мужчина',
    Female: 'Женщина'
}

const getTagName = (type: string, value: any) => {
    if (type === 'gender') {
        return Genders[value as keyof typeof Genders];
    }
    else if (type === 'position') {
        return Positions[value as keyof typeof Positions];
    }
    else {
        return Stacks[value as keyof typeof Stacks];
    }
}


export default function EmployeeList() {
    const [list, setList] = useState([] as {
        [key: string]: any;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [openFilter, setOpenFilter] = useState(OpenFilterType.none);

    const {filters, setFilters} = useContext(FiltersContext);

    const loadMoreItems = () => {
        setIsLoading(true);
        setPage(p => p += 1);
        axios.get(api + `api/Employee?Page=${page + 1}&Count=20${searchQuery !== '' ? '&Name=' + searchQuery : ''}${filters['gender'] !== '' ? '&Gender=' + filters['gender'] : ''}${filters['position'] !== '' ? '&Position=' + filters['position'] : ''}${filters['stack'] !== '' ? '&Stack=' + filters['stack'] : ''}`)
        .then(response => {
            setList(prevItems => [...prevItems as any, ...response.data]);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const handleScroll = () => {
           if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
           loadMoreItems();
        };
       
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {
        loadWithResetingList();
    }, [searchQuery]);

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters));
        // Object.entries(filters).map(el => console.log(el))
    }, [filters]);

    const changeOpenFilter = (type: OpenFilterType | ((prevState: OpenFilterType) => OpenFilterType)) => {
        if (type === openFilter) {
            setOpenFilter(OpenFilterType.none);
        }
        else {
            setOpenFilter(type);
        }
       
    }

    const loadWithResetingList = () => {
        setPage(1);
        axios.get(api + `api/Employee?Page=${1}&Count=20${searchQuery !== '' ? '&Name=' + searchQuery : ''}${filters['gender'] !== '' ? '&Gender=' + filters['gender'] : ''}${filters['position'] !== '' ? '&Position=' + filters['position'] : ''}${filters['stack'] !== '' ? '&Stack=' + filters['stack'] : ''}`)
        .then(response => {
            setList(response.data);
            setIsLoading(false);
        });
    }

    const setGender = (gender: any) => {
        setFilters((filters: { [x: string]: any; gender?: any; stack?: any; position?: any; }) => filters = {
            'gender': gender,
            'stack': filters['stack'],
            'position': filters['position']
        });
    }

    const setPosition = (pos: any) => {
        setFilters((filters: { [x: string]: any; gender?: any; stack?: any; position?: any; }) => filters = {
            'gender': filters['gender'],
            'stack': filters['stack'],
            'position': pos
        });
    }

    const setStack = (stack: any) => {
        setFilters((filters: { [x: string]: any; gender?: any; stack?: any; position?: any; }) => filters = {
            'gender': filters['gender'],
            'stack': stack,
            'position': filters['position']
        });
    }

    return (<>
        <section className="employee-list-wrapper">
            <span className="employee-head">
                <h2>Список сотрудников</h2>
                <input placeholder="Поиск" className="search desktop-hide" value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)}></input>
                <span>
                    
                    <button className={`filter-button ${openFilter === OpenFilterType.position ? 'active-button' : ''}`} 
                        onClick={() => changeOpenFilter(OpenFilterType.position)}>Должность <img alt='arrow' src={downArrow}/></button>
                    {openFilter === OpenFilterType.position ? <Falldown filter={Positions} func={setPosition}/> : <></>}
                    
                    <button className={`filter-button ${openFilter === OpenFilterType.gender? 'active-button' : ''}`} 
                        onClick={() => changeOpenFilter(OpenFilterType.gender)}>Пол <img alt='arrow' src={downArrow}/></button>
                    {openFilter === OpenFilterType.gender ? <Falldown filter={Genders} func={setGender}/> : <></>}

                    <button className={`filter-button ${openFilter === OpenFilterType.stack ? 'active-button' : ''}`} 
                        onClick={() => changeOpenFilter(OpenFilterType.stack)}>Стек технологий <img alt='arrow' src={downArrow}/></button>
                    {openFilter === OpenFilterType.stack ? <Falldown filter={Stacks} func={setStack}/> : <></>}
                    
                </span>
            </span>
            <input placeholder="Поиск" className="search mobile-hide" value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)}></input>
        </section>        

        <div className="filters-wrapper">
            <div className="filters">
                
                <div className="tags-container">
                    <p>Выбранные фильтры:</p>
                    {Object.entries(filters).map(el => el[1] != '' ? 
                        (<div key={el[0]}><Tag value={getTagName(el[0], el[1])} type={el[0]}/></div>) : 
                        (null)
                    )}
                </div>
                <CustomButton func={loadWithResetingList}/>
            </div>
        </div>

        <section className="employee-list-wrapper">
            <div className="employee-list">
                <div className="list-head">
                    <p>ФИО</p>
                    <p>Должность</p>
                    <p>Телефон</p>
                    <p>Дата рождения</p>
                </div>     
                {list?.map((el: { id: string; name: string; phone: string; position: string; birthdate: any; }) => (<ListItem key={el.id} id={el.id} name={el.name} phone={el.phone} position={el.position} birthdate={el.birthdate}/>))}
            </div>
        </section>        
    </>)
}