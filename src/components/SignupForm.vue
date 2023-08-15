<script setup lang="ts">
    // import necessary dependencies
    import {ref, reactive} from 'vue'
    import {useUserStore} from '../store'
    import {faker} from "@faker-js/faker"
    import { useRouter } from 'vue-router';

    // reassign the useUserStore function
    const userStore = useUserStore()

    // reassign the useRouter function 
    const router = useRouter()

    // initialize ref string
    const userFirstName = ref('')
    const userLastName = ref('')
    const userEmail = ref('')
    const userName = ref('')
    const userPassword = ref('')

    // initialize ref boolean
    let isEmailExisting = ref(false)
    let isChecked = ref(false)
    let isLoggedIn = ref(false)

    // initialize form reference
    const dataForm = ref<HTMLFormElement | undefined>()

    // initialize reactive variables
    const state = reactive({
        id : faker.number.int({min: 0, max: 99})
    })

    // handle the submit form
    function handleSubmit(_event: Event){
        
        const newForm = new FormData(_event.target as HTMLFormElement)
        const firstName = newForm.get("firstName") as string
        const lastName = newForm.get("lastName") as string
        const email = newForm.get("email") as string
        const userName = newForm.get("userName") as string
        const password = newForm.get("password") as string

        if(userStore.userEmails.includes(email)){
            isEmailExisting.value = true
        }
        else{
            const newUser = {
                id: state.id,
                firstName,
                lastName,
                email,
                userName,
                password,
                role: 'USER'
            }
            userStore.parsedUsers = [...userStore.parsedUsers, newUser]
            clearForm()
            const stringifyUsers = JSON.stringify(userStore.parsedUsers)
            localStorage.setItem('Users',stringifyUsers)
            isLoggedIn.value = true
            router.push('/login')
        }    
        
    }
    function generateUserName(){
        userName.value = userFirstName.value+userLastName.value+faker.number.int({max: 100, min:1})
    }
    function clearForm(){
        if(dataForm.value)
        dataForm.value.reset()
    }
    function handleFormFill(){
        const fullName = userFirstName.value+userLastName.value
        
        userFirstName.value = faker.person.firstName()
        userLastName.value = faker.person.lastName()
        userEmail.value = faker.internet.email()
        userName.value = fullName+faker.number.int({max: 100, min:1})
        userPassword.value = faker.internet.password()
    }


</script>
<template>
    <div class="container">
        <h1>Oshi</h1>
        <form @submit.prevent="handleSubmit" ref="dataForm">
            <div class="fullName">
                <input type="text" placeholder="First name" name="firstName" v-model="userFirstName">
                <input type="text" placeholder="Last Name" name="lastName" v-model="userLastName">
            </div>
            <input type="email" placeholder="Email" name="email" v-model="userEmail">
            <input type="text" placeholder="Username" name="userName" v-model="userName">
            <label for="username" @click="generateUserName">generate username</label>
            <input :type="isChecked ? 'text' : 'password'" placeholder="Password" name="password" v-model="userPassword">
            <label for="password">Show password<input type="checkbox" v-model="isChecked"></label>
            <button type="submit">Sign up</button>
        </form>
        <p>Have an account? <a href="/login"> Login</a></p>
        <label class="emailExist" for="email" v-if="isEmailExisting">Email is already used</label>
        <button @click="handleFormFill">FormFill</button>
    </div>
</template>



<style scoped>
.container{
    widows: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    
}
form{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.fullName{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    gap: 2px;
}
.fullName>input{
    width: 50%;
    flex-wrap: nowrap;
    padding: 8px;
}
form>input{
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button{
    margin-top: 20PX;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
}
label{
    margin: 0;
    font-size: 12px;
    height: 100%;
    display: flex;
    color: gray;
}
label>input{
    margin-top: 0;
    width: 12px;
}
a{
    color: blue;
}
p{
    font-size: 15px;
}
.emailExist{
    color: red;
}
</style>