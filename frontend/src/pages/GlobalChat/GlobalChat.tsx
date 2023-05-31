import React from 'react'
import Button from '../../components/Button'
import { useAuthContext } from '../../providers/auth'



const GlobalChat = () => {
  const {handleLogout} = useAuthContext()
  return (
    <Button
        title="Sair"
        onClick={()=> handleLogout()}

      />
  )
}

export default GlobalChat
