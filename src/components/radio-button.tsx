import cn from "clsx"
import React, { useEffect, useState } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { z } from "zod"

import type { RegSchema } from "./regForm"
import { AddDataSchema } from "./submitForm"

type AddDataType = z.infer<typeof AddDataSchema>
type RegType = z.infer<typeof RegSchema>

type FormDataType = AddDataType | RegType

type RegisterType = UseFormRegister<FormDataType>

export interface RadioButtonProps {
  name: keyof AddDataType | keyof RegType
  label?: string
  options: { label: string; value: string }[]
  className?: string
  register: RegisterType
  errors: FieldErrors
  value?: string
  id?: string
  setValue?: any
}

export const RadioButton = ({
  name,
  options,
  className,
  register,
  value,
  errors,
  setValue,
  id
}: RadioButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(value || null)
  console.log("err", errors["workType"])
  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    setValue(name, value)
  }

  return (
    <div className={cn("relative", [className])} id={id}>
      <div className="flex flex-nowrap justify-between">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${name}-${option.value}`}
            className={cn(
              "relative flex items-center gap-2 cursor-pointer transition"
            )}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              value={option.value}
              {...register(name)}
              checked={selectedValue === option.value}
              className="absolute w-0 h-0 opacity-0"
              onChange={() => handleSelect(option.value)}
            />
            <span
              className={cn(
                "h-5 w-5 flex-shrink-0 rounded border-2 transition-all flex items-center justify-center",
                {
                  ["bg-card-blue border-text-primary"]:
                    selectedValue === option.value,
                  ["bg-white border-text-primary"]:
                    selectedValue !== option.value,
                  ["!border-error"]: !selectedValue && errors[name]
                }
              )}>
              {selectedValue === option.value && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.3357 3.78928C11.3881 3.84153 11.4297 3.9036 11.458 3.97194C11.4864 4.04028 11.501 4.11354 11.501 4.18753C11.501 4.26152 11.4864 4.33478 11.458 4.40312C11.4297 4.47146 11.3881 4.53353 11.3357 4.58578L6.27323 9.64828C6.22098 9.70066 6.1589 9.74222 6.09057 9.77058C6.02223 9.79894 5.94897 9.81353 5.87498 9.81353C5.80099 9.81353 5.72773 9.79894 5.65939 9.77058C5.59105 9.74222 5.52898 9.70066 5.47673 9.64828L3.22673 7.39828C3.12111 7.29266 3.06177 7.1494 3.06177 7.00003C3.06177 6.85066 3.12111 6.7074 3.22673 6.60178C3.33235 6.49616 3.47561 6.43682 3.62498 6.43682C3.77435 6.43682 3.91761 6.49616 4.02323 6.60178L5.87498 8.45465L10.5392 3.78928C10.5915 3.7369 10.6536 3.69533 10.7219 3.66698C10.7902 3.63862 10.8635 3.62402 10.9375 3.62402C11.0115 3.62402 11.0847 3.63862 11.1531 3.66698C11.2214 3.69533 11.2835 3.7369 11.3357 3.78928Z"
                    fill="#333333"
                  />
                </svg>
              )}
            </span>
            <span className="font-nunito text-base text-text-primary">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
