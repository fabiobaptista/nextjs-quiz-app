import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAppContext } from '@/context/ContextProvider'
import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import Message from '@/components/Message'

import styles from '@/styles/pages/index.module.scss'

const Home: NextPage = () => {
  const route = useRouter()
  const context = useAppContext()
  const [msg, setMsg] = useState('')
  const [name, setName] = useState(context.name)
  const [category, setCategory] = useState(context.category)
  
  // Mounted
  // useEffect(() => {}, [])


  function startGame() {
    if(!name) {
      setMsg('Informe o nome do Jogador')
      return
    }

    if(!category) {
      setMsg('Informe a Categoria')
      return
    }

    setMsg('')
    
    context.updateName(name)
    context.updateCategory(category)
    route.push('/questions')
  }

  return (
    <MainContainer>
      <Modal className='alignItemscenter justifyContentCenter'>
        {msg && <Message message={msg}/>}
        <div className='inputForm'>
          <span>Jogador:</span>
          <input type='text' value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className='inputForm'>
          <span>Categoria:</span>
          <select
            defaultValue={category}
            onChange={e => setCategory(e.target.value)}>
            <option value=''>Selecione uma Categoria</option>
            <option value='1'>Outra</option>
          </select>
        </div>
        <button className='button' onClick={startGame}>Jogar</button>
      </Modal>
    </MainContainer>
  )
}

export default Home
