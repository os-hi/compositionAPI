<script setup lang="ts">
import {ref, reactive} from 'vue'

    // initialize the reactive variables
    const userEmail = ref('')
    const userPassword = ref('')
    const userConfirmPassword = ref('')
    const userName = ref('')
    const isEdit = ref(false)

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



</script>

<template>
    <h1>Sign up</h1>
    <div class="navBar">
        <button>clear</button>
        <button>Fillform</button>
        <button>Newform</button>
        <input type="search" placeholder="search here">
    </div>
    <form @submit.prevent="submitHandler">
        <input v-model="userEmail" type="email" placeholder="email">
        <input v-model="userPassword" type='password' placeholder="password">
        <input v-model="userConfirmPassword" type="password" placeholder="confirm password">
        <input v-model="userName" type="text" placeholder="name">
        <button >{{isEdit? 'update' : 'sign up' }}</button>
    </form>
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
