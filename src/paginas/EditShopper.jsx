import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormShopper from '../components/FormShopper'
import C from '../config'

const EditShopper = () => {

    const [shopper, setShopper] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getShopper = async () => {
            try {
                const url = `${C.JABU_API}/shoppers/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setShopper(result.shoppers)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }

        getShopper()
    }, [])

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Comprador</h1>
            <p className='mt-3'>Modifica los siguentes campos para editar un comprador</p>

            {shopper?.id ? (
                <FormShopper 
                    shopper={shopper}
                    loading={loading}
                />
            ): <p>Comprador no encontrado!</p>}
        </>
    )
}

export default EditShopper