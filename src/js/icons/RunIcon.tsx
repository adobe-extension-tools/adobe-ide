import * as React from 'react'

export default ({ color = '#ffffff', ...props }) =>
  <svg x="0px" y="0px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" strokeMiterlimit="10" {...props}>
    <g id="play-icon">
      <polygon style={{ fill: 'none', stroke: color, strokeWidth: 3 }} points="8.47,3.722 8.47,36.278 31.53,20 	" />
    </g>
  </svg>