import { Outlet } from 'react-router'
import Cabecalho from "./components/Cabecalho"

export default function App() {
  return (
    <div>
      <Cabecalho/>
      <Outlet/>
      <Rodape/>
    </div>
  )
}