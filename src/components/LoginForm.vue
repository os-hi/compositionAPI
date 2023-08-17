<script setup lang="ts">
import {useUserStore,useToast} from '../store'
import {ref} from 'vue'
import { useRouter } from 'vue-router';

    // reassign store functions
    const userStore = useUserStore()
    const {showToast} = useToast()
    const toastNotif = useToast()

    // reassign useRouter function
    const router = useRouter()

    // initialize ref boolean
    let isChecked = ref(false)



    function handleSubmit(event : Event){
        const newForm = new FormData(event.target as HTMLFormElement)
        const userEmail = newForm.get('email')
        const userPassword = newForm.get('password')

        const userAccount = userStore.parsedUsers.find((user) => user.email === userEmail)
        console.log(userAccount)
        if(userAccount){
                if(userEmail === userAccount.email && userPassword === userAccount.password){
                    showToast('Login successful!', 'success');
                    router.push({ name:'dashboard', params:{name: userAccount.userName}})
                }
                else{
                    showToast('Login failed. Please check your credentials.', 'error');
                }
        }
        else{
            showToast('Login failed. Please check your credentials.', 'error');
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
    </div>
    <div v-if="toastNotif.isToastVisible" :class="[toastNotif.toastType, 'toast']" >{{ toastNotif.toastMessage }}</div> 

</template>

<style scoped>
.container{
    widows: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
.toast {
    width: 50%;
    position: fixed;
    top: -50%;
    left: 90%;
    padding: 10px 20px;
    border-radius: 5px;
    color: black;
    font-size: 10px;
    opacity: 0.9;
    transition: opacity 0.3s;
    box-sizing: border-box;
  }
  
.success {
    background-color: #4caf50;
  }
  
.error {
    background-color: #f44336;
  }
</style>