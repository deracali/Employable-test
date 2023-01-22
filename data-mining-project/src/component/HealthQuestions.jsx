import React, { useState, useEffect } from 'react'
import * as Action from "../redux/question_reducer";
import { useDispatch, useSelector } from 'react-redux';
import { updateResultAction } from '../redux/resultReducer';
import { updateResult } from '../hooks/setResult';
import { getServerData } from '../helper/helper';


export default function HealthQuestions({ onChecked }) {
    const [checked, setChecked] = useState(undefined)
    const dispatch = useDispatch();
    const { trace } = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [isLoading, setIsLoading] = useState(false)
    const [apiData, setApiData] = useState([])
    const [serverError, setServerError] = useState(null)




    useEffect(() => {
        setIsLoading(true)



        async function f() {


            const [{ questions, answers }] = await getServerData("https://jobanalysis.onrender.com/api/health", (data) => data)
            // console.log({ questions, answers })


            if (questions.length > 0) {

                setIsLoading(false)
                setApiData({ questions, answers })

                /** dispatch an action */
                dispatch(Action.startExamAction({ question: questions, answers: answers }));
            } else {
                throw new Error("No Question Avalibale");
            }

        }
        f()


    }, [dispatch]);




    const questions = useSelector(state => state.questions.queue[state.questions.trace])

    useEffect(() => {
        dispatch(updateResult({ trace, checked }))

    }, [checked])

    function onSelect(i) {
        setChecked(i)
        onChecked(i)
        dispatch(updateResult({ trace, checked }))
    }

    if (isLoading) return <h3 className='text-light'>isLoading</h3>
    if (serverError) return <h3 className='text-light'>{serverError || "Unknown error"}</h3>

    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i}>
                            <input
                                type="radio"
                                value={true}
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                            />
                            <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
