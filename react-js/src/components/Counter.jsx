import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slides/couterSlides'
import styled from 'styled-components';
export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const Button = styled.button`
    color: black;
    &:hover {
        background-color: pink;
    }
`;

    return (
        <div>
            <div>
                <Button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                    className='bg-green-500 rounded p-2'
                >
                    Increment
                </Button>
                <span className='m-2'>{count}</span>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                    className='bg-green-500 rounded p-2'
                >
                    Decrement
                </Button>
            </div>
        </div>
    )
}