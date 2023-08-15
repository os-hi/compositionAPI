<script setup lang="ts">
    import { useUserStore } from '../store';
    import { useRoute } from 'vue-router';
    import {ref} from 'vue'

    const userStore = useUserStore()
    const route = useRoute()

    let isUsersClicked = ref(false)
    let isHomeClicked = ref(false)
    
    const userUsername = route.params.name
    const currentUser =  userStore.parsedUsers.find(user => user.userName === userUsername)

    const userAccounts = userStore.parsedUsers.map(user => user)

    function handleUsers(){
        isUsersClicked.value = true
        isHomeClicked.value = false
    }
    function handleHome(){
        isUsersClicked.value = false
        isHomeClicked.value = true
    }
    function handleDelete(index: number){
        console.log("clicked here")
        userAccounts.splice(index, 1)
    }

</script>

<template>
    <header>
        <div class="user"><h3>{{currentUser.userName }}</h3></div>
        <p><a href="/login">Logout</a></p>
    </header>
    <main>
        <nav>
            <ul>
                <li @click="handleHome">Home</li>
                <li @click="handleUsers">Users</li>
            </ul>
        </nav>
    <section>
        <div v-if="isUsersClicked" class="home">
            <input type="search" placeholder="search here">
            <p v-for="(user, index) in userAccounts">
                <p v-if="user.role === 'USER'">{{`${index+1}. ${user.email}`}} <button @click="handleDelete(index)">delete</button></p>
            </p>
        </div>
        <div v-else>  
            <h1>{{ `Welcome admin ${currentUser.userName}` }}</h1>
        </div>
    </section>
    </main>
</template>

<style scoped>
header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 5px;
}
main{
    margin: 0;
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
}
nav{
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
ul{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 30px;
}
ul>li{
    list-style: none;
    cursor: pointer;
}
ul>li:hover{
    color: blue;
}
section{
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 10px;
}
section>input{
    width: 50%;
}
section>h1{
    text-align: center;
}
</style>