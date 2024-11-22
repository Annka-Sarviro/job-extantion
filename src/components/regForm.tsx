import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "./button"
import { Input } from "./input"

const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ.,'’\- ]+$/
const passwordRegex =
  /^(?=.*[A-Z\u0400-\u04FF])(?=.*\d)[A-Za-z\u0400-\u04FF\d]{8,}$/
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const RegSchema = z.object({
  username: z
    .string()
    .min(1, "Required")
    .regex(nameRegex, `Regex error`)
    .max(50, `Max 50}`)
    .min(2, `Min 2`),

  password: z
    .string()
    .min(1, "Required")
    .min(8, `Min 8`)
    .regex(passwordRegex, `Regex error`)
    .max(50, `Max 50`),
  email: z
    .string()
    .min(1, "Required")
    .regex(emailRegex, `Regex error`)
    .max(40, `Max 40`)
    .min(4, `Min 4`)
})

export const RegForm = () => {
  const [isSending, setIsSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isDirty }
  } = useForm<z.infer<typeof RegSchema>>({
    defaultValues: {
      username: "",
      password: "",
      email: ""
    },

    resolver: zodResolver(RegSchema),
    mode: "onChange"
  })

  const onSubmit: SubmitHandler<z.infer<typeof RegSchema>> = async (data) => {
    try {
      setIsSending(true)
      console.log("data", data)
      setIsSending(false)
    } catch (error) {
      console.log("error", error)
      setIsSending(false)
    } finally {
      setIsSending(false)
      reset()
    }
  }

  return (
    <>
      <form
        className="bg-background-form shadow-form_shadow space-y-[30px] rounded-[20px] px-12 py-6"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[30px]">
          <Input
            register={register}
            resetField={resetField}
            key="username"
            name="username"
            placeholder="type your name"
            type="text"
            label="Ім'я"
            errors={errors}
          />

          <Input
            register={register}
            resetField={resetField}
            key="email"
            name="email"
            placeholder="type your email"
            type="text"
            className=""
            label="Електронна пошта"
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          className=""
          disabled={!isDirty || isSending}
          variant="ghost">
          Register
        </Button>
      </form>
    </>
  )
}
