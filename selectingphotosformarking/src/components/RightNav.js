import React from 'react'

function RightNav() {

    const markable = [
        { name: 'person-safe', color: 'green' },
        { name: 'person-hardhat', color: 'blue' }
    ]

    return (
        <section id='rightNav'>
            <h3>Labels</h3>
            <ul>
                {
                    markable.length ?
                        markable.map(mark =>
                        (<li
                            className='markable'
                            key={mark.name}>
                            <span
                                style={{ backgroundColor: mark.color, width: '18px', height: '18px', display: 'inline-block' }}
                            >
                            </span>
                            {mark.name}
                        </li>))
                        : 'add new things'
                }
            </ul>
        </section>
    )
}

export default RightNav
