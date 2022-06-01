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

  function updateState(prop: string, value: string) {
    setState(s => ({
      ...s,
      [prop]: value,
    }))
  }

  return (
    <AppContext.Provider value={{
      name: state.name,
      category: state.category,
      updateName: (value) => updateState('name', value),
      updateCategory: (value) => updateState('category', value),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider