import { useNavigate } from 'react-router-dom'

const Product = ({product, handleDeleteProduct}) => {

    const navigate = useNavigate()

    const { id, name, description, quantity } = product

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>{name}</td>
            <td className='p-3'>{description}</td>
            <td className='p-3'>{quantity}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded-md'
                    onClick={() => navigate(`/products/edit/${id}`)}
                > Editar </button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-1 rounded-md'
                    onClick={() => handleDeleteProduct(id)}
                > Eliminar </button>
            </td>
        </tr>
    );
};

export default Product