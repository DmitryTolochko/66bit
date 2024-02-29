import React from 'react';
import './CustomButton.scss';

interface ButtonProps {
    func: any
}

const CustomButton : React.FC<ButtonProps> = ({func}) => {
    return (<>
        <button className="custom-button" onClick={() => func()}>Найти</button>
    </>)
}

export default CustomButton;