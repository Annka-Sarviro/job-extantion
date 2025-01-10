import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import GitHubLogo from "../../assets/GitHub.svg"
import GoogleLogo from "../../assets/Google.svg"
import { Button } from "./button"
import { Checkbox } from "./check-box"
import { Input } from "./input"
import { InputPassword } from "./input-password"

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const RegSchema = z.object({
  password: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").regex(emailRegex, `Regex error`),
  permission: z.boolean()
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
    watch,
    formState: { errors, isDirty }
  } = useForm<z.infer<typeof RegSchema>>({
    defaultValues: {
      password: "",
      email: "",
      permission: false
    },

    resolver: zodResolver(RegSchema),
    mode: "onChange"
  })

  const handleResetField = () => {
    reset()
  }

  const GoogleLogin = () => {
    window.location.href =
      "https://job-tracker-backend-x.vercel.app/api/auth/google"
  }
  const GithubLogin = () => {
    window.location.href =
      "https://job-tracker-backend-x.vercel.app/api/auth/github"
  }

  const handlePermissionsRequest = () => {
    chrome.permissions.request(
      {
        origins: [
          "https://djinni.co/*",
          "https://www.work.ua/*",
          "https://www.robota.ua/*",
          "https://jobs.dou.ua/*",
          "https://nofluffjobs.com/*",
          "https://ua.indeed.com/*"
        ]
      },
      (granted) => {
        if (granted) {
          alert("Дозволи на сайти надано!")
        } else {
          alert("Не вдалося отримати дозволи.")
        }
      }
    )
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
        handlePermissionsRequest()
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
        className="bg-white shadow-form_shadow space-y-8 rounded-[20px] px-12 py-6 w-fit mx-auto"
        onSubmit={handleSubmit(onSubmit)}>
        {isLoginError && (
          <div className="flex justify-center items-center px-6 py-3 gap-x-[6px] bg-error/20 rounded-lg border-2 border-error">
            <button
              onClick={() => handleResetField()}
              className={"h-6 cursor-pointer"}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="Icons/cancel_24px">
                  <path
                    id="icon"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 10.59L15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59Z"
                    fill="#FC8972"
                  />
                </g>
              </svg>
            </button>
            <p className="text-base font-medium text-text-primary max-w-[242px]">
              Дані для входу неправильні. Перевірте їх і повторіть спробу.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-y-6">
          <p className="line relative text-text-gray text-base font-medium">
            Або
          </p>

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
          <div className="flex justify-start gap-x-3 items-center">
            <Checkbox
              name="permission"
              register={register}
              errors={errors}
              checked={watch("permission")}
              required
              type="signUp"
            />
            <p className="text-base text-text-primary font-medium">
              Дозволити доступ до сайтів
            </p>
          </div>
          <Button
            type="submit"
            className=""
            disabled={!isDirty || isSending}
            variant="primary">
            Увійти
          </Button>
        </div>
      </form>
    </>
  )
}
