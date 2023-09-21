import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormCustomer from '../components/FormCustomer'
import C from '../config'

const EditCustomer = () => {

    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const url = `${C.DIS_API}/customers/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setCustomer(result)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }

        getCustomer()
    }, [])

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Modifica los siguentes campos para editar un cliente</p>

            {customer?.id ? (
                <FormCustomer 
                    customer={customer}
                    loading={loading}
                />
            ): <p>Cliente no encontrado!</p>}
        </>
    )
}

export default EditCustomer