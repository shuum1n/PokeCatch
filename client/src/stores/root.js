import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2'
import Axios from 'axios'

const BASE_URL = 'https://pokecatch.shumindesu.site'

export const rootStore = defineStore('root', {
  state: () =>
  {
    return {
      file: "",
      username: "",
      playerLevel: "",
      playerCurrentXp: "",
      xpToLevelUp: "",
      pokedollars: "",
      adventures: "",
      profile_picture: "",
      areaDatas: [],
      adventureData: {}
    }
  },
  actions: {
    async handleLogin(form)
    {
      try
      {
        const { data } = await Axios.post(BASE_URL + '/login', form);
        localStorage.setItem("access_token", data.access_token);
        this.createToast("Login success!");
        this.$router.push('/')
      } catch (error)
      {
        this.createToast(error.response.data.message);
        console.log(error);
      }
    },
    async handleRegister(form)
    {
      try
      {
        const { data } = await Axios.post(BASE_URL + '/register', form);
        this.createToast("Success register!");
        this.$router.push('/login')
      } catch (error)
      {
        this.createToast(error.response.data.message);
        console.log(error)
      }
    },
    async getPlayerData()
    {
      try
      {
        const { data } = await Axios.get(BASE_URL + '/profile', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        this.adventures = data.adventures;
        this.playerCurrentXp = data.currentXp;
        this.pokedollars = data.pokedollars;
        this.playerLevel = data.level;
        this.profile_picture = data.profile_picture;
        this.xpToLevelUp = data.xpToLevelUp;
        this.username = data.username;
      } catch (error)
      {
        this.createToast(error.message);
      }
    },
    async fetchAreaDatas()
    {
      try
      {
        const { data } = await Axios.get(BASE_URL + '/areas', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        this.areaDatas = data;
      } catch (error)
      {
        this.createToast(error.message);
      }
    },
    async fetchAdventureData()
    {
      try
      {
        const { data } = await Axios.get(BASE_URL + '/adventure/list', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        this.adventureData = data;
      } catch (error)
      {
        this.createToast(error.message);
      }
    },
    async goOnAdventure(id)
    {
      try
      {
        await Axios.post(BASE_URL + '/adventure/' + id, null, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchAdventureData()
        this.createToast("Went on adventure!")
      } catch (error)
      {
        console.log(error)
        this.createToast(error.response.data.message)
      }
    },
    async claimAdventure()
    {
      try
      {
        const { data } = await Axios.get(BASE_URL + '/adventure/claim', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        if (data.code !== 'fail')
        {
          Swal.fire({
            imageUrl: data.result.sprite,
            imageHeight: 300,
            imageAlt: data.result.name,
            html:
              data.message
          })
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: "It got away!",
            text: data.message
          })
        }
        this.fetchAdventureData();
        this.getPlayerData();
      } catch (error)
      {
        console.log(error)
        this.createToast(error.response.data.message)
      }
    },
    createToast(message)
    {
      toast(`${message}`, {
        autoClose: 3000,
        toastClassName: ".Toastify__toast-theme--dark",
        bodyClassName: ".Toastify__toast-theme--dark"
      }); // ToastOptions

    }
  }
})
