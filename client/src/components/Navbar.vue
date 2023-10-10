<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">PokeCatch</RouterLink>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link">Camp</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/edit/profile-picture" class="nav-link">Edit Avatar</RouterLink>
                        </li>
                    </ul>
                    <button class="btn" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { rootStore } from '../stores/root';
export default {
    components: {
        RouterLink
    },
    methods: {
        // ...mapActions(rootStore, ['handleLogout']),
        logout()
        {
            localStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped></style>