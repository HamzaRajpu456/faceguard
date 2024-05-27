import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className='px-3 md:px-6 lg:px-9 max-w-[1400px] w-full mx-auto'>{children}</div>
  )
}

export default Wrapper