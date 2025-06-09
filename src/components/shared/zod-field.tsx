"use client"
import { useFormContext } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

type ZodFieldProps = {
  name: string
  label: string
  children: (field: any) => React.ReactNode
}

export function ZodField({ name, label, children }: ZodFieldProps) {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-primary">{label}</FormLabel>
          <FormControl>
            {children(field)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
