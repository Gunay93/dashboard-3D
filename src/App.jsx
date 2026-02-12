import { HashRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Dashboard from "./pages/Dashboard"
import Designers from "./pages/Designers"
import Editor from "./pages/Editor"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="designers" element={<Designers />} />
          <Route path="editor" element={<Editor />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App