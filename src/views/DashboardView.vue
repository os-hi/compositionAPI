<script setup lang="ts">
 // import the necessary dependencies
    import { useUserStore } from '../store';
    import Admin from '../components/Admin.vue'
    import User from '../components/User.vue'

    // reassign useUserStore 
    const userStore = useUserStore()

</script>

<template>
    <div v-if="userStore.state.currentUser?.role ==='ADMIN'"><Admin /></div>
    <div  v-if="userStore.state.currentUser?.role ==='USER'"><User /></div>
</template>