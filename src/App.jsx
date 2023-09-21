import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import EditCustomer from './paginas/EditCustomer'
import Customers from './paginas/Customers'
import NewCustomer from './paginas/NewCustomer'
import Products from './paginas/Products'
import Orders from './paginas/Orders'
import NewProduct from './paginas/NewProduct'
import EditProduct from './paginas/EditProduct'
import NewOrder from './paginas/NewOrder'
import EditOrder from './paginas/EditOrder'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />} />
                <Route path='/products' element={<Layout />}>
                    <Route index element={<Products />} />
                    <Route path='new' element={<NewProduct />} />
                    <Route path='edit/:id' element={<EditProduct />} />
                </Route>
                <Route path='/customers' element={<Layout />}>
                    <Route index element={<Customers />} />
                    <Route path='new' element={<NewCustomer />} />
                    <Route path='edit/:id' element={<EditCustomer />} />
                </Route>
                <Route path='/orders' element={<Layout />}>
                    <Route index element={<Orders />} />
                    <Route path='new' element={<NewOrder />} />
                    <Route path='edit/:id' element={<EditOrder />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
