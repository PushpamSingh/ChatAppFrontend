import React from 'react'
import { useThemeStore } from '../../Store/useThemeStore'
import { PaletteIcon } from 'lucide-react'
import { THEMES } from '../../Constant'

export const ThemeSelector = () => {
    const {theme,setTheme}=useThemeStore()
  return (
     <div className="dropdown dropdown-end">
          {/* DROPDOWN TRIGGER */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

       <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-1">
            {
             THEMES.map((curr)=>(
                <button
                key={curr.label}
                onClick={()=>setTheme(curr.name)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                    ${
                        curr===curr.name ? 'bg-primary/10 text-primary'
                        : 'hover:bg-base-content/5'
                    }`
                }
                >
                <PaletteIcon className="size-4" />
                <span className="text-sm font-medium">{curr.label}</span>
                 {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1">
                {
                    curr.colors.map((color,i)=>{
                        return  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                    })
                }
              </div>
                </button>
             ))   
            }
            
        </div>
      </div>
    </div>

  )
}

