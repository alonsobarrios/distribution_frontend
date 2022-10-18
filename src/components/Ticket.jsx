import { useNavigate } from 'react-router-dom'

const Ticket = ({ticket, handleDeleteTicket}) => {

    const navigate = useNavigate()

    const { id, code, description, cost, status } = ticket

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{code}</td>
            <td className='p-3'>{description}</td>
            <td className='p-3'>${cost}</td>
            <td className='p-3'>{status}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1'
                    onClick={() => navigate(`/tickets/edit/${id}`)}
                > Editar </button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1'
                    onClick={() => handleDeleteTicket(id)}
                > Eliminar </button>
            </td>
        </tr>
    );
};

export default Ticket