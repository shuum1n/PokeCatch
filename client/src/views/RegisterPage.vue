<template>
    <div class="container position-absolute top-50 start-50 translate-middle col-4 position-relative">
        <main class="form-signin w-100 m-auto">
            <form @submit.prevent="">
                <h1 class="h3 mb-3 fw-normal">Register</h1>
                <div class="form-floating">
                    <input v-model="form.username" type="text" class="form-control" id="floatingInput"
                        placeholder="Username">
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input v-model="form.email" type="email" class="form-control" id="floatingInput"
                        placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="form.password" type="password" class="form-control" id="floatingPassword"
                        placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <button class="btn btn-primary w-100 py-2" @click="handleRegister(this.form)">Register</button>
                <div style="text-align: center;" class="mt-3">
                    Already have an account? <RouterLink to="/login" style="text-decoration: none;">Login</RouterLink>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { rootStore } from '../stores/root';


export default {
    data() 
    {
        return {
            form: {
                email: "",
                username: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions(rootStore, ['handleRegister'])
    }
}
</script>

<style lang="scss" scoped></style>