import React, { useState } from 'react'
import type { NextPage } from 'next'

import Modal from '@/components/Modal'

import styles from '@/styles/pages/index.module.scss'
import { useAppContext } from '@/context/ContextProvider'
import Message from '@/components/Message'


const Home: NextPage = () => {
  const context = useAppContext()
  const [msg, setMsg] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  
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
  }

  return (
    <div className='container'>
      <main className='main'>
        <Modal>
          {msg && <Message message={msg}/>}
          <div className={styles.inputForm}>
            <span>Jogador:</span>
            <input type='text' value={name} onChange={e => setName(e.target.value)}/>
          </div>
          <div className={styles.inputForm}>
            <span>Categoria:</span>
            <select
              defaultValue={category}
              onChange={e => setCategory(e.target.value)}>
              <option value='0'>Selecione uma Categoria</option>
              <option value='1'>Outra</option>
            </select>
          </div>
          <button className={styles.button} onClick={startGame}>Jogar</button>
        </Modal>
      </main>
    </div>
  )
}

export default Home
