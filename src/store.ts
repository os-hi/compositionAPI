import { defineStore } from 'pinia'
import { Database } from './Database'
import {User} from './Database'
export const useUserStore = defineStore('userInDatabase', ()=>{
    
    const users: User[] = Database
    const stringifyUsers = JSON.stringify(users)
    localStorage.setItem('Users',stringifyUsers)
    const parsedUsers: User[] = JSON.parse(localStorage.getItem('Users') as string) 
    
    const userEmails = parsedUsers.map((user)=> user.email)
    return {parsedUsers,userEmails}
})