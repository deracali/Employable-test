import React, { useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/resultReducer'
import '../styles/main.css'

export default function Main() {
    const inputRef = useRef(null)
    const [category, setCategory] = useState("")
    const dispatch = useDispatch()

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value))
        }

    }


    return (
        <div className='container'>
            <h1 className='title text-light'>Graduate Job Analysis</h1>

            <ul>
                <li>You will be asked 4 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ul>

            <form id='form' style={{
                flexDirection: "column", alignItems: "center"
            }}>

                <label style={{ marginBottom: "20px", color: "#fff", fontSize: "18px" }}>Choose a category before starting the Suvery</label>
                <select style={{ padding: "10px 20px", marginBottom: "30px" }} required onChange={(e) => setCategory(e.target.value)}>
                    <option>Select a category</option>
                    <option value="banking">Banking</option>
                    <option value="agriculture">Agriculture and Agro allied services</option>
                    <option value="health">Health Institution</option>
                    <option value="hotel">Hotel Management</option>
                </select>


                <input className='userid' ref={inputRef} type="text" placeholder="Username" required />
                <div className='start'>
                    <Link className='btn' onClick={startQuiz} to={`/${category}`}>Start test</Link>

                </div>

            </form>

        </div >
    )
}
