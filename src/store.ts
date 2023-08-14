import { defineStore } from 'pinia'
import { Database } from './Database'
import {User} from './Database'
export const useUserStore = defineStore('userInDatabase', ()=>{
    
    const users: User[] = Database


    return {users}
})