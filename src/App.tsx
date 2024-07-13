import { useState } from 'react'
import './App.css'
import {
  generatePalette,
  getContrastHEXColor,
} from './utils/theme/utils/generateThemePalette'
import { THEXColor, TThemePalette } from './utils/theme/types/theme.types'
import { HexColorPicker } from 'react-colorful'

function App() {
  const [palette, setPalette] = useState<TThemePalette | undefined>(undefined)
  const [pickedColor, setPickedColor] = useState<THEXColor | undefined>(
    undefined
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '320px',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <h1>Color palette</h1>
      <HexColorPicker onChange={setPickedColor} color={pickedColor} />
      {pickedColor ? (
        <>
          <div
            style={{
              backgroundColor: pickedColor,
              color: getContrastHEXColor(pickedColor),
            }}
          >
            Primary color
          </div>
          <button
            onClick={() => {
              const pal = generatePalette(pickedColor)
              setPalette(pal)
            }}
          >
            Create palette
          </button>
        </>
      ) : (
        <div>pick color</div>
      )}
      {palette ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '160px',
            }}
          >
            {Object.keys(palette).map((paletteKey) => (
              <div
                key={paletteKey}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '160px',
                }}
              >
                <h4>{paletteKey}</h4>
                {Object.keys(palette[paletteKey]).map((colorKey) => (
                  <div
                    key={palette[paletteKey][colorKey]}
                    style={{
                      backgroundColor: palette[paletteKey][colorKey],
                      color: getContrastHEXColor(palette[paletteKey][colorKey]),
                    }}
                    onClick={() =>
                      navigator.clipboard.writeText(
                        palette[paletteKey][colorKey]
                      )
                    }
                  >
                    {colorKey}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ width: '320px' }}></p>
        </>
      ) : null}
    </div>
  )
}

export default App
