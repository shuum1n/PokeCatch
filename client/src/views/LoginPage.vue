<template>
    <div>
        <div class="container position-absolute top-50 start-50 translate-middle col-4 position-relative">
            <main class="form-signin w-100 m-auto">
                <form @submit.prevent="">
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                    <div class="form-floating">
                        <input v-model="form.email" type="email" class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="form.password" type="password" class="form-control" id="floatingPassword"
                            placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-check text-start my-1">
                    </div>
                    <button class="btn btn-primary w-100 py-2" @click="handleLogin(this.form)">Login</button>
                    <div style="text-align: center;" class="mt-3">
                        Don't have an account? <RouterLink to="/register" style="text-decoration: none;">Register
                        </RouterLink>
                    </div>
                </form>
            </main>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { rootStore } from '../stores/root';
import { RouterLink } from 'vue-router';

export default {
    data()
    {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions(rootStore, ['handleLogin']),
        // callback(response)
        // {
        //     this.handleGoogleLoginCustomer(response);
        // },
        changeToRegister()
        {
            console.log("adsfasdf")
            this.$router.push('/register')
        }
    },

}
</script>

<style lang="scss" scoped></style>