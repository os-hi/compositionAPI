<script setup lang="ts">
import {useUserStore} from '../store'
import {ref} from 'vue'
import { useRouter } from 'vue-router';

    // reassign useUserStore function
    const userStore = useUserStore()

    // reassign useRouter function
    const router = useRouter()

    // initialize ref boolean
    let isInValid = ref(false)
    let isChecked = ref(false)



    function handleSubmit(event : Event){
        const newForm = new FormData(event.target as HTMLFormElement)
        const userEmail = newForm.get('email')
        const userPassword = newForm.get('password')

        const userAccount = userStore.parsedUsers.find((user) => user.email === userEmail)
        console.log(userAccount)
        if(userAccount){
                if(userEmail === userAccount.email && userPassword === userAccount.password){
                    alert('login successful')
                    router.push({ name:`${userAccount.role.toLowerCase()}`, params:{name: userAccount.userName}})
                }
                else{
                    isInValid.value = true
                }
        }
        else{
            isInValid.value = true
        }
        
    }
</script>

<template>
    <div class="container">
        <h1>OSHI</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" name="email" placeholder="email" required>
            <input :type="isChecked ? 'text' : 'password'" name="password" placeholder="password" required>
            <label for="password">Show password<input type="checkbox" v-model="isChecked"></label>
            <button type="submit">login</button>
        </form>
        <p>Don't have account yet? <a href="/">Sign up</a></p>
        <label class="error" for="password">{{ isInValid ? 'Invalid credentials' : '' }}</label>
    </div>
</template>

<style scoped>
.container{
    widows: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
form{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
input{
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
label{
    margin: 0;
    font-size: 12px;
    height: 100%;
    display: flex;
    color: gray;
}
label>input{
    margin-top: 0;
    width: 12px;
}
button{
    width: 100%;
    padding: 8px;
    border-radius: 10px;
}
p{
    font-size: 12px;
}
a{
    color: blue;
}
.error{
    color: red;
}
</style>