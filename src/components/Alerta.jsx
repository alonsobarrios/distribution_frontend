// @flow 
import React from 'react';

const Alerta = ({children}) => {
    return (
        <div className='text-sm text-center my-2 bg-red-600 text-white font-bold uppercase'>
            {children}
        </div>
    );
};

export default Alerta