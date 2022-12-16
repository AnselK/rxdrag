import { FormNameContext } from "fieldy/contexts"
import { useFieldy } from "fieldy/hooks"
import { FormState, FormValue, IFieldSchema } from "fieldy/interfaces"
import React, { useEffect, useState } from "react"

export const VirtualForm = (props: {
  fieldSchemas: IFieldSchema[]
  initialValue?: any,
  defaultValue?: any,
  onValueChange?: (value?: any) => void,
  children?: React.ReactNode
}) => {
  const { fieldSchemas, initialValue, children, onValueChange } = props
  const [name, setName] = useState<string>()
  const [formState, setFormState] = useState<FormState>()
  const fieldy = useFieldy()

  useEffect(() => {
    if (fieldy && fieldSchemas) {
      const name = fieldy.createForm()
      fieldy.setFormSchema(name, fieldSchemas)
      setFormState(fieldy.getForm(name))
      setName(name)
      return () => {
        fieldy.removeForm(name)
      }
    }
  }, [fieldSchemas, fieldy])

  useEffect(() => {
    if (fieldy && formState?.mounted && name) {
      fieldy?.setFormInitialValue(name, initialValue)
    }
  }, [fieldy, formState?.mounted, initialValue, name])

  useEffect(() => {
    if (fieldy && name) {
      const unsub = fieldy?.subscribeToFormValuesChange(name, (values: FormValue) => {
        onValueChange?.(values)
      })
      return unsub;
    }

  }, [fieldy, name, onValueChange])

  return (
    <FormNameContext.Provider value={name}>
      {children}
    </FormNameContext.Provider>
  )
}