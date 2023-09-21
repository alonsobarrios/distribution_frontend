import FormProduct from '../components/FormProduct'

const NewProduct = () => {
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Producto</h1>
            <p className='mt-3'>Llena los siguentes campos para registrar un producto</p>
            
            <FormProduct/>
        </>
    )
}

export default NewProduct