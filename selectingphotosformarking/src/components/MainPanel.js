import React, { useState } from 'react'
import LeftNav from './LeftNav'
import MarkingComponent from './MarkingComponent'
import RightNav from './RightNav'

function MainPanel() {

    const [selectedPhoto, setSelectedPhoto] = useState('')

    const newSelectPhoto = (photoName) => {
        setSelectedPhoto(photoName)
        console.log(photoName);
    }

    return (
        <div>
            <LeftNav handleNewPhoto={newSelectPhoto} />
            <MarkingComponent photo={selectedPhoto} />
            <RightNav />
        </div>
    )
}

export default MainPanel
