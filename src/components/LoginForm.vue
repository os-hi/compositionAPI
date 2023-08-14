<script setup lang="ts">
import {useUserStore} from '../store'
import {ref} from 'vue'

    const userStore = useUserStore()
    let isInValid = ref(false)

    function handleSubmit(event : Event){
        console.log("reached here")
        const newForm = new FormData(event.target as HTMLFormElement)
        const userEmail = newForm.get('email')
        const userPassword = newForm.get('password')

        const userAccount = userStore.users.find((user) => user.email === userEmail)
        console.log(userAccount)
        if(userAccount){
                if(userEmail !== userAccount.email || userPassword !== userAccount.password){
                    isInValid.value = true
                }
                else{
                    alert('login succesful')
                }
        }
        else{
            isInValid.value = true
        }
        
    }
</script>

<template>
    <h1>OSHI</h1>
    <form @submit.prevent="handleSubmit">
        <input type="email" name="email" placeholder="email" required>
        <input type="password" name="password" placeholder="password" required>
        <label for="password">{{ isInValid ? 'Invalid credentials' : '' }}</label>
        <button type="submit">login</button>
    </form>
</template>

<style scoped>
form{
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
input{
    width: 250px;
}
button{
    width: 150px;
}
label{
    font-size: 12px;
    color: red;
}
</style>