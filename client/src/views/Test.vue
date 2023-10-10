<template>
    <div>
        <img v-if="url" :src="url" style="width: 200px;">
        <br>
        <input type="file" ref="file" accept="image/*" @change="onFileChange">
        <button type="button" @click="uploadFile">Click me!</button>
    </div>
</template>

<script>
import axios from 'axios'
import Compressor from 'compressorjs';
const BASE_URL = 'http://localhost:3000'
export default {
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
            // let formData = new FormData();
            // console.log(this.file)
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
                        formData.append("test", "test")
                        formData.append("asdfasdf", "test")
                        console.log(formData)

                        await axios.post(BASE_URL + '/profile', formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2FraTEyQGdtYWlsLmNvbSIsImlhdCI6MTY5MzM2Nzc0Nn0.FCuDI1JpxxDt3j0VIUiBXCFHo8NCrFdhIlcdoj1EiW8"
                            }
                        })
                        console.log("uploaded!")
                    },
                    error(err)
                    {
                        console.log(err.message);
                    },
                });
            } catch (error)
            {
                console.log(error)
            }

        }
    }
}
</script>

<style lang="scss" scoped></style>