import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Booking from '../components/Booking'
import C from '../config'

const Bookings = () => {

    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])

    const getBookingsAPI = async () => {
        try {
            const url = `${C.JABU_API}/bookings`
            const response = await fetch(url)
            const result = await response.json()

            setBookings(result.bookings)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookingsAPI()
    }, [])

    const handleCancelBooking = async id => {
        const confirmation = confirm("¿Desea cancelar reserva?")

        if (confirmation) {
            try {
                const url = `${C.JABU_API}/booking/${id}`
                const response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify({status: 0}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await response.json()
                getBookingsAPI()
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Reservas
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 text-white p-2 uppercase font-bold text-xs ml-5 rounded'
                    onClick={() => navigate(`/bookings/new`)}
                > Nueva reserva </button>
            </h1>
            <p className='mt-3'>Gestión de reservas</p>
            
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Código reserva</th>
                        <th className='p-2'>Código boleta</th>
                        <th className='p-2'>Descripción</th>
                        <th className='p-2'>Precio</th>
                        <th className='p-2'>Documento comprador</th>
                        <th className='p-2'>Nombre comprador</th>
                        <th className='p-2'>Estado</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <Booking
                            key={booking.id}
                            booking={booking}
                            handleCancelBooking={handleCancelBooking}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Bookings