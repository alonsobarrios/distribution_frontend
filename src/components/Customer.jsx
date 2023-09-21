import { useNavigate } from 'react-router-dom'

const Customer = ({customer, handleDeleteCustomer, handleChangeStatusCustomer}) => {

    const navigate = useNavigate()

    const { id, identification, name, address, phone, email } = customer

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{identification}</td>
            <td className='p-3'>{name}</td>
            <td className='p-3'>{address}</td>
            <td className='p-3'>{phone}</td>
            <td className='p-3'>{email}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded'
                    onClick={() => navigate(`/customers/edit/${id}`)}
                > Editar </button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded'
                    onClick={() => handleDeleteCustomer(id)}
                > Eliminar </button>
            </td>
        </tr>
    );
};

export default Customer