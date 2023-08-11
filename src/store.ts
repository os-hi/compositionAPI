import { defineStore } from 'pinia'
import { Database, User } from './Database'

export const userStore = defineStore('userInDatabase', ()=>{

    let users: User[] = Database
   

})