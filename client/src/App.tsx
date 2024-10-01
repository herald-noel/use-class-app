import { ThemeProvider } from "@/components/theme-provider"
import Router from './routes/router'
import './index.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  )
}

export default App
