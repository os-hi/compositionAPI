import { defineStore } from 'pinia'
import { Database } from './Database'
import {User} from './Database'
import { useRoute } from 'vue-router';
import {ref, reactive} from 'vue'

export const useUserStore = defineStore('userInDatabase', ()=>{
    
    const users: User[] = Database
    const route = useRoute()

    // send database to local storage
    localStorage.setItem('Users', JSON.stringify(users))

    // parse the users' info from the local storage
    const parsedUsers: User[] = JSON.parse(localStorage.getItem('Users') as string) 

    // assign the email's values to a new array
    const userEmails = parsedUsers.map((user)=> user.email)

    // get the current user's username
    const userUsername = route.params.name
    
    const state = reactive({

        currentUser: parsedUsers.find(user => user.userName === userUsername)
    })
     
    // return values
    return {parsedUsers,userEmails,userUsername,state}
})

export const useToast = defineStore('toastNotif', ()=>{

  const toastMessage = ref('');
  const toastType = ref('');
  const isToastVisible = ref(false);

  const showToast = (message: string, type: string) => {
    toastMessage.value = message;
    toastType.value = type;
    isToastVisible.value = true;

    setTimeout(() => {
      isToastVisible.value = false;
    }, 3000); // 3 seconds
  };

  return {toastMessage, toastType, isToastVisible, showToast}
})