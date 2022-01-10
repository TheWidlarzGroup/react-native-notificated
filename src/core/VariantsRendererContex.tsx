import React, { createContext, PropsWithChildren, useContext } from 'react'

interface VariantsRendererContextProps {
  id: string
}

type ContextValue = VariantsRendererContextProps | undefined

const VariantsRendererContext = createContext<ContextValue>(undefined)

export const VariantsRendererProvider = ({
  children,
  id,
}: PropsWithChildren<VariantsRendererContextProps>) => {
  const value = {
    id,
  }
  return (
    <VariantsRendererContext.Provider value={value}>{children}</VariantsRendererContext.Provider>
  )
}

export const useVariantsRendererContext = () => {
  return useContext(VariantsRendererContext)
}
