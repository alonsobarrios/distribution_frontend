import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import EditShopper from './paginas/EditShopper'
import Shoppers from './paginas/Shoppers'
import NewShopper from './paginas/NewShopper'
import Tickets from './paginas/Tickets'
import Bookings from './paginas/Bookings'
import NewTicket from './paginas/NewTicket'
import EditTicket from './paginas/EditTicket'
import NewBooking from './paginas/NewBooking'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />} />
                <Route path='/tickets' element={<Layout />}>
                    <Route index element={<Tickets />} />
                    <Route path='new' element={<NewTicket />} />
                    <Route path='edit/:id' element={<EditTicket />} />
                </Route>
                <Route path='/shoppers' element={<Layout />}>
                    <Route index element={<Shoppers />} />
                    <Route path='new' element={<NewShopper />} />
                    <Route path='edit/:id' element={<EditShopper />} />
                </Route>
                <Route path='/bookings' element={<Layout />}>
                    <Route index element={<Bookings />} />
                    <Route path='new' element={<NewBooking />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
