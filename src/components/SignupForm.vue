<script setup lang="ts">
import { useUserStore } from '../store'
import {User} from '../Database'
import {ref } from 'vue'
import {faker} from '@faker-js/faker'

    // reassign the useUserStore function from pinia
    const userStore = useUserStore()

    // initialize ref variables
    const userEmail = ref('')
    const userPassword = ref('')
    const userConfirmPassword = ref('')
    const userName = ref('')
    const searchUser = ref('')
    const isForm = ref<HTMLFormElement>()

    //functions below
    function handleSubmit(){
        const formData: User = {
            email: userEmail.value,
            password: userPassword.value,
            name: userName.value,
        }
        userStore.users.push(formData)
    }
    function handleClear(){
        location.reload()
    }
    function handleFillForm(){
        userEmail.value = faker.internet.email()
        userPassword.value= faker.internet.password()
        userConfirmPassword.value = faker.internet.password()
        userName.value = faker.person.firstName();
    }
    function handleNewForm(){
        isForm.value?.reset()
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
    <form @submit.prevent="handleSubmit()" ref="isForm">
        <input type="email" v-model="userEmail" placeholder="email">
        <input type="password" v-model="userPassword" placeholder="password">
        <input type="password" v-model="userConfirmPassword" placeholder="confirm password">
        <input type="text" v-model="userName" placeholder="name">
        <button type="submit">sign up</button>
    </form>
    <p>Search Users:
        <p v-for="user in userStore.handleSearchUser(searchUser)">
            <div v-if="searchUser === ''"></div>
            <div v-else>{{`${user.email} | ${ user.name}`}}</div>
        </p>
    </p>
    <p>Users' List:
        <p v-for="(user, index) in userStore.users">
            <div>{{ `${index+1}. ${user.email}| ${user.name}`}}
            <button @click="userStore.handleDelete(index)">delete</button>
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
</style>