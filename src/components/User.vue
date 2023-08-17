<script setup lang="ts">

    // import necessary dependencies
    import { useUserStore } from '../store';

    // reassgin useUserStore function
    const userStore = useUserStore()
    
</script>

<template>
    <slot>
        <header>
            <div class="user"><h3>{{userStore.state.currentUser?.userName }}</h3></div>
            <p><a href="/login">Logout</a></p>
        </header>
        <main>
            <h1>Welcome, {{userStore.state.currentUser?.userName }}</h1>
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
    border: 1px solid black;
}
main{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>