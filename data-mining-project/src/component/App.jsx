import { useState } from 'react'
import '../styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './Main.jsx'
import Result from './Result.jsx'
import { CheckUserExist } from '../helper/helper'
import QuizAgric from './QuizAgric'
import QuizBanking from './QuizBanking.jsx'
import QuizHealth from './QuizHealth'
import QuizHotel from './QuizHotel'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>
  },
  {
    path: '/banking',
    element: <CheckUserExist><QuizBanking /></CheckUserExist>
  },
  {
    path: '/agriculture',
    element: <CheckUserExist><QuizAgric /></CheckUserExist>
  },
  {
    path: '/health',
    element: <CheckUserExist><QuizHealth /></CheckUserExist>
  },
  {
    path: '/hotel',
    element: <CheckUserExist><QuizHotel /></CheckUserExist>
  },
  {
    path: '/result',
    element: <CheckUserExist><Result /></CheckUserExist>
  },

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
