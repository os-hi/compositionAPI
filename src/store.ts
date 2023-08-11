import { defineStore } from 'pinia'
import { Database } from './Database'
import type { User } from './Database'

export const useUserStore = defineStore('userInDatabase', ()=>{
    

    const users: User[] = Database

    function handleSearchUser(searchedUser : string){
        return users.filter((user) => user.email.includes(searchedUser))
    }
    function handleDelete(index: number){
        users.splice (index, 1)
    }
   
    return {users, handleSearchUser, handleDelete}
})