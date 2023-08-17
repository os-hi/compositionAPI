<script setup lang="ts">

    // import the necessary dependencies
    import { useUserStore,useToast } from '../store.ts';
    import {ref} from 'vue'

    // reassign store functions
    const userStore = useUserStore()
    const {showToast} = useToast()
    const toastNotif = useToast()

    // initialize ref string
    const searchUser = ref('')

    // initialize ref boolean
    let isUsersClicked = ref(false)
    let isHomeClicked = ref(false)
    
    
    // component's logic functions
    function handleUsers(){
        isUsersClicked.value = true
        isHomeClicked.value = false
    }
    function handleHome(){
        isUsersClicked.value = false
        isHomeClicked.value = true
    }
    function handleDelete(user:string,index: number){
        showToast(`Account ${user} have been deleted`, 'error')
        const stringifyAccounts = JSON.stringify(userStore.parsedUsers.splice(index, 1))
        localStorage.removeItem(stringifyAccounts)
    }
    function handleSearch(searchedUser: string){
       return userStore.parsedUsers.filter((user) => user.email.includes(searchedUser))
    }

</script>

<template>
    <slot>
            <header>
                <div class="user"><h3>{{userStore.state.currentUser?.userName }}</h3></div>
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
                        <input type="search" placeholder="search here" v-model="searchUser">
                            <p v-if="searchUser !== ''">
                                <p v-for="(user) in handleSearch(searchUser)">
                                    <p v-if="user.role === 'USER'">{{ user.email }}</p>
                                </p>
                            </p>    
                            <p v-else>
                                <p v-for="(data, index) in userStore.parsedUsers">
                                    <p v-if="data.role === 'USER'">{{`${index}. ${data.email}`}} <button @click="handleDelete(data.userName,index)">delete</button></p>
                                </p>
                            </p>  
                    </div>
                    <div class="welcome" v-else>  
                        <h1>{{ `Welcome admin ${userStore.state.currentUser?.userName}` }}</h1>
                    </div>
                </section>
                <div v-if="toastNotif.isToastVisible" :class="[toastNotif.toastType, 'toast']" >{{ toastNotif.toastMessage }}</div> 
            </main>
    </slot>
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
.welcome{
    display: flex;
    justify-content: center;
    align-items: center;
}
.toast {
    width: 30%;
    height: auto;
    position: fixed;
    padding: 10px 20px;
    border-radius: 5px;
    left: 75%;
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