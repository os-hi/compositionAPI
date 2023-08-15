<script setup lang="ts">
    import { useUserStore } from '../store';
    import { useRoute } from 'vue-router';

    const userStore = useUserStore()
    const route = useRoute()
    // const router = useRouter()
    const userUsername = route.params.name
    const currentUser =  userStore.parsedUsers.find(user => user.userName === userUsername)
    
</script>

<template>
     <header>
        <div class="user"><h3>{{currentUser?.userName }}</h3></div>
        <p><a href="/login">Logout</a></p>
    </header>
    <main>
        <h1>Welcome, {{ currentUser?.userName }}</h1>
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
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>