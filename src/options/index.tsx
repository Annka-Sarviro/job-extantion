import { Button } from "~components/button"
import { LoginForm } from "~components/loginForm"
import { Logo } from "~components/logo"

import "~styles"

const HOME_PAGE = process.env.PLASMO_PUBLIC_HOME_PAGE

function OptionsIndex() {
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

  return (
    <section className="bg-background-sidebar h-[100vh] w-full p-6">
      <div className="max-w-xl mx-auto px-2 py-6 flex flex-col gap-y-2 relative">
        <Logo />
        <h1 className="font-bold text-xl text-center inline-block mx-auto text-text-primary">
          Вітаємо!
        </h1>

        <h2 className="font-medium text-base text-center inline-block mx-auto text-text-primary max-w-[382px]">
          Оптимізуйте пошук роботи з нашим розширенням для Google Chrome
        </h2>
        <LoginForm />
        <div className="mt-6 text-center">
          <Button onClick={handlePermissionsRequest} variant="primary">
            Дозволити доступ до сайтів
          </Button>
        </div>
      </div>
    </section>
  )
}

export default OptionsIndex
