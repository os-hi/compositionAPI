<script setup lang="ts">
    import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <div class="loginContainer">
        <LoginForm />
    </div>
</template>

<style scoped>
.loginContainer{
    width: 50vw;
    height: 40vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 5px;
    padding: 15px;
}
</style>