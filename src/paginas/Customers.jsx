import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Customer from '../components/Customer'
import C from '../config'

const Customers = () => {

    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])

    const getCustomersAPI = async () => {
        try {
            const url = `${C.DIS_API}/customers`
            const response = await fetch(url)
            const result = await response.json()

            setCustomers(result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCustomersAPI()
    }, [])

    const handleDeleteCustomer = async id => {
        const confirmation = confirm("¿Desea eliminar este comprador?")

        if (confirmation) {
            try {
                const url = `${C.DIS_API}/customers/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()

                const arrayCustomers = customers.filter( customer => customer.id !== id)
                setCustomers(arrayCustomers)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleChangeStatusCustomer = async id => {
        const confirmation = confirm("¿Desea cambiar estado del comprador?")

        if (confirmation) {
            try {
                let customer = customers.filter( customer => customer.id === id);
                let status = customer[0].status;

                const url = `${C.DIS_API}/customers/${id}`
                const response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify({status: !status}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await response.json()
                getCustomersAPI()
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Clientes
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 text-white p-2 uppercase font-bold text-xs ml-5 rounded'
                    onClick={() => navigate(`/customers/new`)}
                > Registrar cliente </button>
            </h1>
            <p className='mt-3'>Administra tus clientes</p>
            
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Documento</th>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Dirección</th>
                        <th className='p-2'>Teléfono</th>
                        <th className='p-2'>Correo</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <Customer
                            key={customer.id}
                            customer={customer}
                            handleDeleteCustomer={handleDeleteCustomer}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Customers