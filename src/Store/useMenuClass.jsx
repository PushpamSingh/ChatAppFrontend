import {create} from "zustand"

export const useMenuClass=create((set)=>({
    menuClass:false,
    setMenuClass:(menuClass)=>{
        set({menuClass})
    }
}))