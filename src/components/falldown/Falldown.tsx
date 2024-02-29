import { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../../App';
import './Falldown.scss';

interface FalldownProps {
    func: any,
    filter: any
}

const Falldown : React.FC<FalldownProps> = ({func, filter}) => {
    const {filters} = useContext(FiltersContext);
    const [checkedValues, setChecked] = useState([] as string[]);
    
    useEffect(() => {
        setChecked(Object.values(filters));
    }, [filters])

    return(<>
    <div className='falldown-wrapper'>
        <div className='falldown'>
            {Object.keys(filter).map(key => 
                <p key={key}>{filter[key]}<input type='checkbox' onChange={() => func(key)} checked={checkedValues.includes(key)}/></p>
            )}
        </div>
    </div>
        
    </>)
}

export default Falldown;