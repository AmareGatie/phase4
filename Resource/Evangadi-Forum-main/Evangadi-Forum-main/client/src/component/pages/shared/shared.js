import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Fotter from './Fotter'

function Shared() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Fotter/>
    </div>
  )
}

export default Shared
