import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    
    const [formValue, setValues] = useState(initialState);
    console.log("hook",initialState);
    
    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...formValue,
            [ target.name ]: target.value
        });
    }

    return [ formValue, handleInputChange, reset ];
}