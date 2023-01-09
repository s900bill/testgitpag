// plugins/i18n.ts
import { App } from 'vue'
import { createI18n } from 'vue-i18n'

const localPathPrefix = './lang/'

// import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('./lang/*')).map(([key, value]) => {
    const json = key.endsWith('.json')
    return [key.slice(localPathPrefix.length, json ? -5 : -4), value.default]
  })
)

const install = (app: App) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'English',
    globalInjection: true,
    messages,
  })

  app.use(i18n)
}

export default install
