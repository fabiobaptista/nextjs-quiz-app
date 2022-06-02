import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAppContext } from '@/context/ContextProvider'
import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import Message from '@/components/Message'

import Category from '@/domain/categories/Categories'
import UseCasesFactory from '@/factory/UseCasesFactory'

const Home: NextPage = () => {
  const loadGategoriesUsecase = UseCasesFactory.createLoadCategories()
  const route = useRouter()
  const {updateIsBusy, ...context} = useAppContext()

  const [msg, setMsg] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState(context.name)
  const [category, setCategory] = useState(context.category)
  
  // Mounted
  useEffect(() => {
    (async () => {
      updateIsBusy(true)
      const data = await loadGategoriesUsecase.execute({})
      setCategories(data.categories)
      if(context.category) {
        setCategory(context.category)
      }
      updateIsBusy(false)
    })()
  }, [])

  async function startGame() {
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
            value={category}
            onChange={e => setCategory(e.target.value)}>
            <>
              <option value='' key='0'>Selecione uma Categoria</option>
              {categories.map(c => ( 
                <option value={c.id} key={c.id}>{c.name}</option> 
              ))}
            </>
          </select>
        </div>
        <button className='button' onClick={startGame}>Jogar</button>
      </Modal>
    </MainContainer>
  )
}

export default Home
