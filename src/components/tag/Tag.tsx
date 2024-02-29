import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useContext, useEffect } from 'react';
import cancel from '../../images/icons/cancel.svg';
import './Tag.scss';
import { FiltersContext } from '../../App';

interface Tag {
    value: string,
    type: string
}

export default function Tag(value: { type: string; value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
    const {filters, setFilters} = useContext(FiltersContext);

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters));
    }, [filters]);

    const deleteFilter = () => {
        if (value.type === 'gender') {
            setFilters((filters: { [x: string]: any; gender?: string; stack?: any; position?: any; }) => filters = {
                'gender': '',
                'stack': filters['stack'],
                'position': filters['position']
            });
        }
        else if (value.type === 'position') {
            setFilters((filters: { [x: string]: any; gender?: any; stack?: any; position?: string; }) => filters = {
                'gender': filters['gender'],
                'stack': filters['stack'],
                'position': ''
            });
        }
        else {
            setFilters((filters: { [x: string]: any; gender?: any; stack?: string; position?: any; }) => filters = {
                'gender': filters['gender'],
                'stack': '',
                'position': filters['position']
            });
        }
    }

    return (<>
        <div className="tag" onClick={deleteFilter}>
            <img alt='delete' src={cancel} className='icon'/>
            <p>{value.value}</p>
        </div>
    </>)    
}