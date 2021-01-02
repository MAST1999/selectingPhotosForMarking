import React from 'react'

function MarkingComponent({ photo }) {
    console.log(photo);
    return (
        <div>
            {
                photo ?
                    <img src={photo} alt='welp' />
                    : 'Select or load images first'
            }

        </div>
    )
}

export default MarkingComponent
