import { Button } from "~components/button"
import { LoginForm } from "~components/loginForm"

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
    <div className="max-w-xl mx-auto px-2 py-8 flex flex-col gap-y-2">
      <h1 className="font-bold text-xl text-center inline-block mx-auto text-text-primary">
        Вітаємо у розширенні{" "}
        <a
          href={HOME_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent">
          Job Tracker
        </a>
      </h1>

      <h2 className="font-bold text-lg text-center inline-block mx-auto text-text-primary">
        Будь ласка, увійдіть у свій профіль
      </h2>
      <LoginForm />
      <div className="mt-6 text-center">
        <Button onClick={handlePermissionsRequest} variant="primary">
          Дозволити доступ до сайтів
        </Button>
      </div>
    </div>
  )
}

export default OptionsIndex
