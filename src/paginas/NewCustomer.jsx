import FormCustomer from '../components/FormCustomer'

const NewCustomer = () => {
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p className='mt-3'>Llena los siguentes campos para registrar un cliente</p>
            
            <FormCustomer />
        </>
    )
}

export default NewCustomer