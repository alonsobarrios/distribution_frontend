import { useEffect, useState } from 'react'
import FormBooking from '../components/FormBooking'
import C from '../config'

const NewBooking = () => {

    const [tickets, setTickets] = useState({})
    const [shoppers, setShoppers] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getTicketsAndShoppers = async () => {
            try {
                const url = `${C.JABU_API}/getTickets`
                const response = await fetch(url)
                const result = await response.json()

                setTickets(result.tickets)
                setShoppers(result.shoppers)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }

        getTicketsAndShoppers()
    }, [])
    
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nueva Reserva</h1>
            <p className='mt-3'>Llena los siguentes campos para registrar una reserva</p>
            
            <FormBooking
                tickets={tickets}
                shoppers={shoppers}
                loading={loading}
            />
        </>
    )
}

export default NewBooking