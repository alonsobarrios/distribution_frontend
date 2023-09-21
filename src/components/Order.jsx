import { useNavigate } from 'react-router-dom'

const Order = ({order, handleCancelOrder, handleDeleteOrder}) => {

    const navigate = useNavigate()

    const status_options = {"RECEIVED":"Recibido", "SENT":"Enviado", "DELIVERED":"Entregado", "CANCELED":"Cancelado"};
    
    const { id, quantity, resquestDate, deliveryDate, address, postalCode, status } = order

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{order.customer.name}</td>
            <td className='p-3'>{order.product.name}</td>
            <td className='p-3'>{quantity}</td>
            <td className='p-3'>{new Date(resquestDate).toISOString().slice(0, 10)}</td>
            <td className='p-3'>{deliveryDate ? new Date(deliveryDate).toISOString().slice(0, 10) : ''}</td>
            <td className='p-3'>{address}</td>
            <td className='p-3'>{postalCode}</td>
            <td className='p-3'>{status_options[status]}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded-md'
                    onClick={() => navigate(`/orders/edit/${id}`)}
                > Editar </button>
                {status === 'RECEIVED' ? 
                    <button
                        type='button'
                        className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded'
                        onClick={() => handleCancelOrder(id)}
                    > Cancelar </button>
                : null}
                {status === 'CANCELED' ? 
                    <button
                        type='button'
                        className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded-md'
                        onClick={() => handleDeleteOrder(id)}
                    > Eliminar </button>
                : null}
                
            </td>
        </tr>
    );
};

export default Order