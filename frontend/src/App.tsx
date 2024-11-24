import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Room from "./components/Room"
import { RecoilRoot } from "recoil"

const App = () => {
  return (
    <RecoilRoot>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<Room />} />
        </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
