import React, { useState } from 'react'
import QuizAgric from './AgricQuestions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion'
import { PushAnswer } from '../hooks/setResult'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { Navigate } from 'react-router-dom'


export default function () {
    const [checked, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result)
    const { queue, trace } = useSelector(state => state.questions)
    const dispatch = useDispatch()


    function onPrev() {
        // console.log('On Prev')
        if (trace > 0) {
            dispatch(MovePrevQuestion())
        }
    }

    function onNext() {
        // console.log("next")

        if (trace < queue.length) {
            dispatch(MoveNextQuestion())

            if (result.length <= trace) {
                dispatch(PushAnswer(checked))
            }
        }

        setChecked(undefined)
    }

    function onChecked(check) {

        setChecked(check)
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace="true"></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Employablity Test</h1>

            <QuizAgric onChecked={onChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}

                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    )
}
