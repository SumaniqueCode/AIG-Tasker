import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Tasks from './components/tasks/Tasks'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='tasks' element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
