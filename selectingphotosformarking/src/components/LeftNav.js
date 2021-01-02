import React, { useRef, useState, useEffect } from 'react'

function LeftNav({ handleNewPhoto }) {

    const [reload, setReload] = useState(true)
    let listOfImages = []

    const importAll = item => {
        return item.keys().map(item)
    }

    if (reload) {
        listOfImages = importAll(require.context(('../img'), false, /\.(png|jpe?g)$/))
    }

    console.log();
    return (
        <section>
            {
                listOfImages.length
                    ?
                    listOfImages.map(
                        (image, index) =>
                            <img
                                src={image.default}
                                key={index}
                                alt='loading'
                                onClick={() => handleNewPhoto(image.default)}
                            />
                    ) :
                    'No Images, Add more!'
            }
        </section>
    )
}

export default LeftNav
