import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import GitHubLogo from "../../assets/GitHub.svg"
import GoogleLogo from "../../assets/Google.svg"
import { Button } from "./button"
import { Input } from "./input"
import { InputPassword } from "./input-password"

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const RegSchema = z.object({
  password: z.string().min(1, "Required"),

  email: z.string().min(1, "Required").regex(emailRegex, `Regex error`)
})

const URL_BACKEND = process.env.PLASMO_PUBLIC_URL_BACKEND
export const LoginForm = () => {
  const [isSending, setIsSending] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isDirty }
  } = useForm<z.infer<typeof RegSchema>>({
    defaultValues: {
      password: "",
      email: ""
    },

    resolver: zodResolver(RegSchema),
    mode: "onChange"
  })

  const GoogleLogin = () => {
    window.location.href =
      "https://job-tracker-backend-x.vercel.app/api/auth/google"
  }
  const GithubLogin = () => {
    window.location.href =
      "https://job-tracker-backend-x.vercel.app/api/auth/github"
  }

  const onSubmit: SubmitHandler<z.infer<typeof RegSchema>> = async (data) => {
    try {
      setIsSending(true)
      console.log("data", data)
      const response = await axios.post(
        `${URL_BACKEND}/auth/login`,
        {
          email: data.email,
          password: data.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (response.status === 201) {
        console.log(response.data)
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        )
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(response.data.refresh_token)
        )
        setIsLoginError(false)
        window.close()
        setIsSending(false)
      } else {
        setIsLoginError(true)
        console.log("error")
      }
    } catch (error) {
      console.log("error", error)
      setIsSending(false)
      setIsLoginError(true)
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
            key="email"
            name="email"
            placeholder="Введіть пошту"
            type="text"
            className=""
            label="Електронна пошта"
            errors={errors}
          />

          <InputPassword
            register={register}
            resetField={resetField}
            key="password"
            name="password"
            placeholder="Введіть пароль"
            type="text"
            label="Пароль"
            className=""
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          className=""
          disabled={!isDirty || isSending}
          variant="ghost">
          Увійти
        </Button>

        <div className="flex justify-between gap-5">
          <Button
            type="button"
            className="gap-[12px]"
            variant="ghost"
            size="small"
            onClick={GoogleLogin}>
            <span className="text-base font-medium text-text-primary">
              Google
            </span>
            <img
              src={GoogleLogo}
              className="h-[24px] w-[24px]"
              alt="Google Logo"
            />
          </Button>

          <Button
            type="button"
            className="gap-[12px]"
            variant="ghost"
            size="small"
            onClick={GithubLogin}>
            <span className="text-base font-medium text-text-primary">
              GitHub
            </span>
            <img
              src={GitHubLogo}
              className="h-[24px] w-[24px]"
              alt="Google Logo"
            />
          </Button>
        </div>
      </form>

      {isLoginError && (
        <p className="text-base font-medium text-error">
          Невірний логін або пароль, спробуйте ще раз
        </p>
      )}
    </>
  )
}
