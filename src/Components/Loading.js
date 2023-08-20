import React from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'

function Loading() {
    return (
        <div className='circle-loading' >
            <CircularProgress isIndeterminate color='green' size='120px' />
        </div>
    )
}

export default Loading