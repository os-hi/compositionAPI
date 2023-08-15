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
    <h1>Welcome, {{ currentUser.userName }}</h1>
</template>