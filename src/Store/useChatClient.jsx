import {create} from "zustand"

export const useChatClient=create((set)=>({
    globalChatwatcher:{},
    setglobalChatwatcher:(watcher)=>{
        set({globalChatwatcher:watcher})
    }
}))