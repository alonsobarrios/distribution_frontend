import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ticket from '../components/Ticket'
import C from '../config';

const Tickets = () => {

    const navigate = useNavigate()
    const [tickets, setTickets] = useState([])

    const getTicketsAPI = async () => {
        try {
            const url = `${C.JABU_API}/tickets`;
            const response = await fetch(url)
            const result = await response.json()

            setTickets(result.tickets)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTicketsAPI()
    }, [])

    const handleDeleteTicket = async id => {
        const confirmation = confirm("¿Desea eliminar esta boleta?")

        if (confirmation) {
            try {
                const url = `${C.JABU_API}/ticket/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()

                const arrayTickets = tickets.filter( ticket => ticket.id !== id)
                setTickets(arrayTickets)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Boletas
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 text-white p-2 uppercase font-bold text-xs ml-5 rounded'
                    onClick={() => navigate(`/tickets/new`)}
                > Registrar boleta </button>
            </h1>
            <p className='mt-3'>Administra tus boletas</p>
            
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Código</th>
                        <th className='p-2'>Descripción</th>
                        <th className='p-2'>Precio</th>
                        <th className='p-2'>Estado</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <Ticket
                            key={ticket.id}
                            ticket={ticket}
                            handleDeleteTicket={handleDeleteTicket}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Tickets