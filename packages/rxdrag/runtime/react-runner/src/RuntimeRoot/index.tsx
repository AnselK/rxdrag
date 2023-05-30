import { IComponents } from "@rxdrag/react-shared"
import React from "react"
import { useCallback, useMemo, useState } from "react"
import { ControllersContext, PreviewComponentsContext } from "../contexts"
import { IComponentsParams } from "../interfaces"
import { ILocalesManager } from "@rxdrag/locales"
import { IControllerMeta, MinionsRoot } from "@rxdrag/minions-runtime-react"
import { INodeSchema } from "@rxdrag/schema"
import { IFieldSchema } from "@rxdrag/fieldy"
import { useCreateGlobalControllers } from "../hooks/useCreateGlobalControllers"

export const RuntimeRoot = (props: {
  components?: IComponents,
  children: React.ReactNode,
  schema?: INodeSchema<IFieldSchema, IControllerMeta>,
  localesManager?: ILocalesManager,
}) => {
  const { components: initalComponents, children, schema, localesManager } = props
  const [components, setComponents] = useState<IComponents>({})
  const handleRegister = useCallback((...components: IComponents[]) => {
    for (const com of components) {
      setComponents(coms => ({ ...coms, ...com }))
    }

  }, [])
  const params: IComponentsParams = useMemo(() => {
    return {
      components: { ...initalComponents, ...components },
      registerComponents: handleRegister
    }
  }, [components, handleRegister, initalComponents])

  //构建全局Controller+这些Controller的祖辈们
  const globalControllers = useCreateGlobalControllers(schema)
  return (
    <ControllersContext.Provider value={globalControllers}>
      <MinionsRoot>
        <PreviewComponentsContext.Provider value={params}>
          {
            children
          }
        </PreviewComponentsContext.Provider>
      </MinionsRoot>
    </ControllersContext.Provider>
  )
}