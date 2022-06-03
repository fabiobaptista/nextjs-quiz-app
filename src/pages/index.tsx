import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAppContext } from '@/context/ContextProvider'
import { Round } from '@/domain/round'
import { Category } from '@/domain/category'
import UseCasesFactory from '@/factory/UseCasesFactory'
import MainContainer from '@/components/MainContainer'
import Modal from '@/components/Modal'
import Message from '@/components/Message'

import styles from '@/styles/pages/index.module.scss'

const loadGategoriesUseCase = UseCasesFactory.createLoadCategories()
const createRoundUsesCase = UseCasesFactory.createCreateRound()

const Home: NextPage = () => {
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
      const data = await loadGategoriesUseCase.execute({})
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

    const dataRound = await createRoundUsesCase.execute({
      playerName: name,
      categoryId: +category
    })

    // TODO - create coverter to Round
    if(dataRound.round) {
      const round: Round = {
        id: dataRound.round.id,
        playerId: dataRound.round.player_id,
        questions: dataRound.round.questions.map(q => ({
          id: q.id,
          description: q.description,
          options: q.options.map(o => ({
            id: o.id,
            label: o.label,
          }))
        })),
      }
      
      context.updatePlayer(round.playerId)
      context.updateRound(round.id)
      route.push(`${round.id}/questions`)
    } else {
      setMsg('Não foi possível iniciar o Quiz')
    }
  }

  return (
    <MainContainer>
      <Modal className='alignItemscenter justifyContentCenter'>
        {msg && <Message message={msg}/>}
        <div className={styles.fields}>
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
        </div>
        <button className='button' onClick={startGame}>Jogar</button>
      </Modal>
    </MainContainer>
  )
}

export default Home
