import React from 'react'

function MarkingComponent({ photo }) {
    console.log(photo);
    return (
        <div id='markingDiv'>
            {
                photo ?
                    <img src={photo} alt='Loading' />
                    : 'Select or load images first'
            }

        </div>
    )
}

export default MarkingComponent
