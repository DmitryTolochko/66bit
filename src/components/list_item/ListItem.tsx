import './ListItem.scss';
import { Link } from 'react-router-dom';

interface ListItemProps {
    name: string,
    phone: string,
    position: string,
    birthdate: any,
    id: string
}

const ListItem : React.FC<ListItemProps> = ({name, phone, position, birthdate, id}) => {
    
    return(<>
        <Link to={`/profile/${id}`} className="list-item hover-light">
            <p>{name}</p>
            <p>{position}</p>
            <p>{phone}</p>
            <p>{birthdate}</p>
        </Link>
    </>)
}

export default ListItem;