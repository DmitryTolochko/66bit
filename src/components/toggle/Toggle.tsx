import { useContext, useEffect } from 'react';
import './Toggle.scss';
import { DarkModeContext } from '../../App';

export default function Toggle() {
    const {mode, setMode} = useContext(DarkModeContext);

    useEffect(() => {
        localStorage.setItem('mode', JSON.stringify(mode));
    }, [mode])

    return(<>
        <label className="toggle">
            <input type='checkbox' className="toggle-input" checked={mode}
                onClick={() => setMode((m: boolean) => m = !m)}/>
            <span className="toggle-slider"></span>
        </label>
    </>)
    
}