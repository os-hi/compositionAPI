<script setup lang="ts">

//import dependencies
import { useUserStore } from '../store'
import {User} from '../Database'
import {ref} from 'vue'
import {faker} from '@faker-js/faker'


    // reassign the useUserStore function from pinia
    const userStore = useUserStore()

    // initialize ref variables
    const userEmail = ref('')
    const userPassword = ref('')
    const userConfirmPassword = ref('')
    const userName = ref('')
    const searchUser = ref('')
    let isEdit = ref<boolean>(false)
    let isEmailExisting = ref(false)
    let isPasswordMatch = ref(false)
    const formIndex = ref(0)


    const signUpForm = ref<HTMLFormElement>()

    //functions below
    function handleSubmit(event: Event){
        // proper way to handle form
        const newForm = new FormData(event.target as HTMLFormElement)
        const email = newForm.get("email") as string
        const password = newForm.get("password") as string
        const confirmPassword = newForm.get("confirmPassword") as string
        const name = newForm.get("name") as string
        const emailFromStore = userStore.users.map((user: { email: any; }) => user.email)

        if(emailFromStore.includes(email))
            isEmailExisting.value = true
        else if(password !== confirmPassword)
            isPasswordMatch.value = true
        else{
            isEmailExisting.value = false
            isPasswordMatch.value = false
            const formData: User = {
                email,
                password,
                name
            }
            userStore.users.push(formData)
            // userStore.users.push(formData)
        }     
    }
    function handleClear(){
        location.reload()
    }
    function handleFillForm(){
        isEmailExisting.value = false
        isPasswordMatch.value = false
        userEmail.value = faker.internet.email().toLowerCase()
        userPassword.value= faker.internet.password().toLowerCase()
        userConfirmPassword.value = userPassword.value
        userName.value = faker.person.firstName().toLowerCase()
    }
    function handleNewForm(){
        signUpForm.value?.reset()
    }
    function handleSetEdit(email: any, index: number){
        isEdit.value = true
        formIndex.value = index
        const user = userStore.users.find((user: { email: any; }) => user.email === email)
        if (user){
            userEmail.value = user.email
            userPassword.value = user.password
            userConfirmPassword.value = user.password
            userName.value = user.name
        }   
    }
    function handleEdit (event: Event){
        // proper way to handle form
        const newForm = new FormData(event.target as HTMLFormElement)
        const email = newForm.get("email") as string
        const password = newForm.get("password") as string
        const name = newForm.get("name") as string
        const formData: User = {
            email,
            password,
            name
        }
        userStore.users.splice(formIndex.value, 1, formData)
    }
    function handleSearchUser(searchedUser : string){
        return userStore.users.filter((user: { email: string | string[]; }) => user.email.includes(searchedUser))
    }
    function handleDelete(index: number){
        userStore.users.splice (index, 1)
    }
</script>

<template>
    <h1>Sign up</h1>
    <div class="navBar">
        <button @click="handleClear">Clear</button>
        <button @click="handleFillForm">FillForm</button>
        <button @click="handleNewForm">NewForm</button>
        <input type="search" v-model="searchUser" placeholder="search user">
    </div>
    <form v-if="isEdit" @submit.prevent="handleEdit" ref="signUpForm">
        <input type="email" v-model="userEmail" name="email" placeholder="email" required>
        <input type="password" v-model="userPassword" name="password" placeholder="password" required>
        <input type="password" v-model="userConfirmPassword" name="confirmPassword" placeholder="confirm password" required>
        <input type="text" v-model="userName" name="name" placeholder="name" required>
        <button type="submit" >update</button>
    </form>
    <form v-else @submit.prevent="handleSubmit" ref="signUpForm">
        <input type="email" v-model="userEmail" name="email" placeholder="email" required>
        <label for="email">{{ isEmailExisting ? 'email is existing!' : ''}}</label>
        <input type="password" v-model="userPassword" name="password" placeholder="password" required>
        <input type="password" v-model="userConfirmPassword" name="confirmPassword" placeholder="confirm password"  required>
        <label for="password">{{ isPasswordMatch ? 'password did not match!' : '' }}</label>
        <input type="text" v-model="userName" name="name" placeholder="name" required>
        <button type="submit">sign up</button>
    </form>
    <p>Search Users:
        <p v-for="user in handleSearchUser(searchUser)">
            <div v-if="searchUser === ''"></div>
            <div v-else>{{`${user.email} | ${ user.name}`}}</div>
        </p>
    </p>
    <p>Users' List: 
        <p v-for="(user, index) in userStore.users">
            <div>{{ `${index+1}. ${user.email}| ${user.name}`}}
                <button @click="handleDelete(index)">delete</button>
                <button @click="handleSetEdit(user.email, index)">edit</button>
            </div>
            
        </p>
    </p>
</template>

<style scoped>
form{
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
}
input{
    width: 250px;
}
button{
    width: 100px;
}
.navBar{
    width: 400px;
}
.navBar>button{
    width: 80px;
}
.navBar>input{
    width: 150px;
}
label{
    width: 250px;
    font-size: 12px;
    color: red;
}
</style>