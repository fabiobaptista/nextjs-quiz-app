import { createContext, useContext, useState } from 'react'
import DataContext, { DataContextInitialValues } from './DataContext';

// Context
const AppContext = createContext<DataContext>(DataContextInitialValues)

// Hook
export function useAppContext() {
  return useContext(AppContext);
}

// Provider
type ContextProviderProps = {
  children: React.ReactNode
};

const ContextProvider = ({ children }: ContextProviderProps) => { 
  const [state, setState] = useState(DataContextInitialValues)

  function updateState<T>(prop: string, value: T) {
    setState(s => ({
      ...s,
      [prop]: value,
    }))
  }

  return (
    <AppContext.Provider value={{
      isBusy: state.isBusy,
      name: state.name,
      category: state.category,
      playerId: state.playerId,
      roundId: state.roundId,
      updateIsBusy: (value) => updateState<boolean>('isBusy', value),
      updateName: (value) => updateState<string>('name', value),
      updateCategory: (value) => updateState<string>('category', value),
      updatePlayer: (value) => updateState<number>('playerId', value),
      updateRound: (value) => updateState<number>('roundId', value),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider