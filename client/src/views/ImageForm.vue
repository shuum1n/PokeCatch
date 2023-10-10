<template>
    <Navbar></Navbar>
    <div class="container py-3">
        <h3>Change Profile Image</h3>
        <img v-if="url" :src="url" style="width: 200px;">
        <br>
        <input type="file" ref="file" accept="image/*" @change="onFileChange">
        <button type="button" @click="uploadFile">Upload!</button>
    </div>
</template>

<script>
import axios from 'axios'
import Compressor from 'compressorjs';
import Navbar from '../components/Navbar.vue'
const BASE_URL = 'https://pokecatch.shumindesu.site'
export default {
    components: {
        Navbar
    },
    data()
    {
        return {
            url: null,
            file: null,
            img: null
        }
    },
    methods: {
        onFileChange(e)
        {
            this.file = e.target.files[0]
            this.url = URL.createObjectURL(this.file)
        },
        async uploadFile()
        {
            if (!this.file)
            {
                throw new Error("ERROR")
            }
            try
            {
                new Compressor(this.file, {
                    quality: 0.6,
                    async success(result)
                    {
                        let formData = new FormData();
                        formData.append('avatar', result, result.name)
                        console.log(formData)

                        await axios.post(BASE_URL + '/profile', formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "access_token": localStorage.access_token
                            }
                        })
                    },
                    error(err)
                    {
                        console.log(err.message);
                    },
                });
                this.$router.push('/')
            } catch (error)
            {
                console.log(error)
            }

        }
    }
}
</script>

<style lang="scss" scoped></style>