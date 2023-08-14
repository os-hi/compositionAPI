<!-- eslint-disable @typescript-eslint/no-inferrable-types -->
<script setup lang="ts">
    import SignupForm from '../components/SignupForm.vue'
</script>

<template>
    <div class="signupContainer">
        <SignupForm />
    </div>
</template>

<style scoped>
.signupContainer{
    width: 50vw;
    height: 60vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 5px;
    padding: 15px;
}
</style>