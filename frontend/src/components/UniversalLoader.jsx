import React from 'react'
// import the styles.css file
import "../style.css"

const Loader = () => {
  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
        x-show="loading"
      >
        <div className="flex flex-col items-center">
        <span className="loader"></span>
          <p className="text-white mt-2">Loading...</p>
        </div>
      </div>
  )
}

export default Loader