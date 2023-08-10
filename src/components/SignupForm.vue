<script setup lang="ts">
import {ref, reactive} from 'vue'
import { faker } from '@faker-js/faker'


    // initialize the reactive variables
    const userEmail = ref('')
    const userPassword = ref('')
    const userConfirmPassword = ref('')
    const userName = ref('')
    const isEdit = ref(false)
    const searchUser = ref('')

    // Database
    const state = ref([
        {email: 'batucanjake18@gmail.com', password: 'oshipogi', name: 'jake'},
        {email: 'denver@gmail.com', password: 'oshipogi', name: 'denver'},
    ])

    // handle the submit form
    function submitHandler(){
        const Database = reactive({
            email: userEmail.value,
            password: userPassword.value,
            name: userName.value
        })
        state.value.push(Database)
    }
    // clears the userlist (except for hardcoded accounts) by reloading the page
    function clearHandler(){
        location.reload()
    }
    // fill the form elemet with random generated values
    function fillFormHandler(){
        userEmail.value = faker.internet.email()
        userPassword.value = faker.internet.password()
        userConfirmPassword.value= faker.internet.password()
        userName.value= faker.person.fullName()
    }
    // clears the input fields in the form
    function newFormHandler(){
        userEmail.value = ''
        userPassword.value = ''
        userConfirmPassword.value = ''
        userName.value = ''
    }
    // search the user from the database (state)
    function searchHandler(searchUser: string){  
        return state.value.filter((user) => user.email.includes(searchUser))
    }



</script>

<template>
    <h1>Sign up</h1>
    <div class="navBar">
        <button @click="clearHandler">Clear</button>
        <button @click='fillFormHandler'>Fillform</button>
        <button @click="newFormHandler">Newform</button>
        <input v-model="searchUser" type="search" placeholder="search here">
    </div>
    <form @submit.prevent="submitHandler">
        <input v-model="userEmail" type="email" placeholder="email">
        <input v-model="userPassword" type='password' placeholder="password">
        <input v-model="userConfirmPassword" type="password" placeholder="confirm password">
        <input v-model="userName" type="text" placeholder="name">
        <button >{{isEdit? 'update' : 'sign up' }}</button>
    </form>
    <p>Search Lists:
        <p v-if = "searchUser === '' "></p>
        <p v-else v-for ="user in searchHandler(searchUser)">{{ user.email }}</p>
    </p>
    <p>Users' lists:
        <p v-for="(user, index) in state">
            <p>{{`${index+1}. ${user.email}`}}</p>
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
