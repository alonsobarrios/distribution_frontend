import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Shopper from '../components/Shopper'
import C from '../config'

const Shoppers = () => {

    const navigate = useNavigate()
    const [shoppers, setShoppers] = useState([])

    const getShoppersAPI = async () => {
        try {
            const url = `${C.JABU_API}/shoppers`
            const response = await fetch(url)
            const result = await response.json()

            setShoppers(result.shoppers)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getShoppersAPI()
    }, [])

    const handleDeleteShopper = async id => {
        const confirmation = confirm("¿Desea eliminar este comprador?")

        if (confirmation) {
            try {
                const url = `${C.JABU_API}/shopper/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()

                const arrayShoppers = shoppers.filter( shopper => shopper.id !== id)
                setShoppers(arrayShoppers)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleChangeStatusShopper = async id => {
        const confirmation = confirm("¿Desea cambiar estado del comprador?")

        if (confirmation) {
            try {
                let shopper = shoppers.filter( shopper => shopper.id === id);
                let status = shopper[0].status;

                const url = `${C.JABU_API}/shopper/${id}`
                const response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify({status: !status}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await response.json()
                getShoppersAPI()
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Compradores
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 text-white p-2 uppercase font-bold text-xs ml-5 rounded'
                    onClick={() => navigate(`/shoppers/new`)}
                > Registrar comprador </button>
            </h1>
            <p className='mt-3'>Administra tus compradores</p>
            
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Documento</th>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Celular</th>
                        <th className='p-2'>Correo</th>
                        <th className='p-2'>Estado</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {shoppers.map(shopper => (
                        <Shopper
                            key={shopper.id}
                            shopper={shopper}
                            handleDeleteShopper={handleDeleteShopper}
                            handleChangeStatusShopper={handleChangeStatusShopper}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Shoppers