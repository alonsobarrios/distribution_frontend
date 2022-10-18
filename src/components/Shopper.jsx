import { useNavigate } from 'react-router-dom'

const Shopper = ({shopper, handleDeleteShopper, handleChangeStatusShopper}) => {

    const navigate = useNavigate()

    const { id, document, full_name, cellphone, email, status } = shopper

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{document}</td>
            <td className='p-3'>{full_name}</td>
            <td className='p-3'>{cellphone}</td>
            <td className='p-3'>{email}</td>
            <td className='p-3'>{status ? 'ACTIVO' : 'INACTIVO'}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1'
                    onClick={() => navigate(`/shoppers/edit/${id}`)}
                > Editar </button>
                <button
                    type='button'
                    className='bg-yellow-600 hover:bg-yellow-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1'
                    onClick={() => handleChangeStatusShopper(id)}
                > {status ? 'INACTIVAR' : 'ACTIVAR'} </button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1'
                    onClick={() => handleDeleteShopper(id)}
                > Eliminar </button>
            </td>
        </tr>
    );
};

export default Shopper