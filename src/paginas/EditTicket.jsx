import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormTicket from '../components/FormTicket';
import C from '../config'

const EditTicket = () => {

    const [ticket, setTicket] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getTicket = async () => {
            try {
                const url = `${C.JABU_API}/tickets/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setTicket(result.tickets)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }

        getTicket()
    }, [])

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Boleta</h1>
            <p className='mt-3'>Modifica los siguentes campos para editar una boleta</p>

            {ticket?.id ? (
                <FormTicket
                    ticket={ticket}
                    loading={loading}
                />
            ): <p>Boleta no encontrada!</p>}
        </>
    )
}

export default EditTicket