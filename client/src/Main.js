import React from 'react'
import Sidebar from './Sidebar'
import DeleteProject from './Modals/DeleteProject'

export default function Main() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <DeleteProject />
    </div>
  )
}
