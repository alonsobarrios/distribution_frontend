import FormTicket from '../components/FormTicket'

const NewTicket = () => {
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nueva Boleta</h1>
            <p className='mt-3'>Llena los siguentes campos para registrar una boleta</p>
            
            <FormTicket/>
        </>
    )
}

export default NewTicket