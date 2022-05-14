import type { TLBounds } from '@tldraw/core'
import { AlignStyle, ShapeStyles } from '~types'
import { getFontFace, getFontSize } from './shape-styles'
import { getTextAlign } from './getTextAlign'
import { LINE_HEIGHT } from '~constants'

export function getTextSvgElement(text: string, style: ShapeStyles, bounds: TLBounds) {
  const fontSize = getFontSize(style.size, style.font)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

  const textLines = text.split('\n').map((line, i) => {
    const textElm = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textElm.textContent = line
    textElm.setAttribute('y', LINE_HEIGHT * fontSize * (0.5 + i) + '')
    textElm.setAttribute('letter-spacing', fontSize * -0.03 + '')
    textElm.setAttribute('font-size', fontSize + 'px')
    textElm.setAttribute('font-family', getFontFace(style.font).slice(1, -1))
    textElm.setAttribute('text-align', getTextAlign(style.textAlign))
    textElm.setAttribute('text-align', getTextAlign(style.textAlign))
    textElm.setAttribute('alignment-baseline', 'central')
    g.appendChild(textElm)

    return textElm
  })

  switch (style.textAlign) {
    case AlignStyle.Middle: {
      g.setAttribute('text-align', 'center')
      g.setAttribute('text-anchor', 'middle')
      textLines.forEach((textElm) => {
        textElm.setAttribute('x', bounds.width / 2 + '')
      })
      break
    }
    case AlignStyle.End: {
      g.setAttribute('text-align', 'right')
      g.setAttribute('text-anchor', 'end')
      textLines.forEach((textElm) => textElm.setAttribute('x', bounds.width + ''))
      break
    }
    case AlignStyle.Start: {
      g.setAttribute('text-align', 'left')
      g.setAttribute('text-anchor', 'start')
    }
  }

  return g
}
