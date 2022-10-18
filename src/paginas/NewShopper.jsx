import FormShopper from '../components/FormShopper'

const NewShopper = () => {
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Comprador</h1>
            <p className='mt-3'>Llena los siguentes campos para registrar un comprador</p>
            
            <FormShopper />
        </>
    )
}

export default NewShopper