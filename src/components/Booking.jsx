const Booking = ({booking, handleCancelBooking}) => {

    const { id, booking_code, ticket_code, ticket_description, ticket_cost, shopper_document, shopper_full_name, status } = booking

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{booking_code}</td>
            <td className='p-3'>{ticket_code}</td>
            <td className='p-3'>{ticket_description}</td>
            <td className='p-3'>${ticket_cost}</td>
            <td className='p-3'>{shopper_document}</td>
            <td className='p-3'>{shopper_full_name}</td>
            <td className='p-3'>{status ? 'ACTIVA' : 'CANCELADA'}</td>
            <td className='p-3'>
                {status ? 
                    <button
                        type='button'
                        className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1'
                        onClick={() => handleCancelBooking(id)}
                    > Cancelar </button>
                : null}
            </td>
        </tr>
    );
};

export default Booking