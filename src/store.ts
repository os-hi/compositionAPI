import { defineStore } from 'pinia'
import { Database } from './Database'
import type { User } from './Database'

export const useUserStore = defineStore('userInDatabase', ()=>{
    

    const users: User[] = Database

    
   
   
    return {users}
})