<script setup lang="ts">

    // import necessary dependencies
    import {ref, reactive} from 'vue'
    import {useUserStore, useToast} from '../store'
    import {faker} from "@faker-js/faker"
    import { useRouter } from 'vue-router';
    import {User} from '../Database'

    // reassign the store functions
    const userStore = useUserStore()
    const {showToast} = useToast()
    const toastNotif = useToast()

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
            console.log("error")
            showToast('Email is already existing', 'error');
        }
        else{
            const newUser: User = {
                id: state.id,
                firstName,
                lastName,
                email,
                userName,
                password,
                role: 'USER'
            }
            // userStore.parsedUsers = [...userStore.parsedUsers, newUser]
            clearForm()
            // const stringifyUsers = JSON.stringify(userStore.parsedUsers)
            localStorage.setItem('Users', JSON.stringify(userStore.parsedUsers = [...userStore.parsedUsers, newUser]))
            showToast('Account successfully registered', 'success')
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
        isEmailExisting.value = false
        userFirstName.value = faker.person.firstName()
        userLastName.value = faker.person.lastName()
        userEmail.value = faker.internet.email()
        userName.value = userFirstName.value+userLastName.value+faker.number.int({max: 100, min:1})
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
    <!-- <div class="toast">NOTIFICATIONS</div> -->
    <div v-if="toastNotif.isToastVisible" :class="[toastNotif.toastType, 'toast']" >{{ toastNotif.toastMessage }}</div> 
</template>



<style scoped>
.container{
    widows: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
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
.toast {
    width: 50%;
    position: fixed;
    top: -50px;
    left: 100%;
    padding: 10px 20px;
    border-radius: 5px;
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
.emailExist{
    color: red
}
</style>