import React from 'react'

function ProgressBar({ progress }) {
  const colors = [
    'rgb(255, 214, 161)',
    'rgb(255, 175, 163)',
    'rgb(100. 115, 149)',
    'rgn(141, 181, 145)'
  ]

  let rColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className='outer-box'>
      <div className="inner-box" style={{width: `${progress}%`, backgroundColor: 'green'}}></div>
    </div>
  )
}

export default ProgressBar