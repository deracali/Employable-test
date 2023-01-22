import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Result.css'
import ResultTable from './ResultTable'

import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/resultReducer'
import { useEffect } from 'react'

import { usePublishResult } from '../hooks/setResult'

import { attemp_Number, earnPoints_Number, flagResult } from '../helper/helper'

export default function Result() {

    const dispatch = useDispatch()

    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state)

    useEffect(() => {
        // console.log(earnPoints)
    })

    const totalPoints = queue.length * 25
    const attempts = attemp_Number(result)
    const earnPoints = earnPoints_Number(result, answers, 25)
    const flag = flagResult(totalPoints, earnPoints)

    // store user result
    usePublishResult({ result, username: userId, attempts, points: earnPoints, achived: flag ? "likely to get a job" : "less likey to get a job" })
    // console.log({ result, username: userId, attempts, points: earnPoints, achived: flag ? "likely to get a job" : "less likey to get a job" })

    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Job Application</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username:</span>
                    <span className='bold'>{userId}</span>
                </div>
                <div className='flex'>
                    <span>Total Points:</span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions:</span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempt:</span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points:</span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Test Result:</span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} className='bold'>{flag ? "likely to get a job" : "less likely to get a job"}</span>
                </div>
            </div>

            <div className='start'>
                <Link className='btn' onClick={onRestart} to={'/'}>Restart</Link>
            </div>

            <div className='container'>
                <ResultTable />
            </div>
        </div>
    )
}
