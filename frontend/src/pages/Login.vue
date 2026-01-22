<template>
    <v-container>
        <v-row align="center">
            <v-col cols="12" md="6">
                <v-card class="pa-4">
                    <form @submit.prevent="login">
                        <v-card-text>
                            <v-card-title>
                                <h3>Login</h3>
                            </v-card-title>
                            <v-card-subtitle class="mb-5">Believe in your dreams</v-card-subtitle>

                            <v-text-field 
                                label="Email" 
                                v-model="email" 
                                :rules="[() => !!email || 'This field is required']" 
                                required>
                            </v-text-field>

                            <v-text-field 
                                label="Password" 
                                v-model="password" 
                                :rules="[() => !!password || 'This field is required']" 
                                type="password"
                                required>
                            </v-text-field>
                        </v-card-text>

                        <v-card-actions class="d-flex flex-column justify-center">
                            <v-btn 
                                size="large" 
                                type="submit" 
                                color="blue-darken-4" 
                                class="text-white" 
                                variant="flat">
                                Login
                            </v-btn>
                            <p v-if="message" class="mt-3">{{ message }}</p>
                            <router-link to="/register" class="mt-2">
                                I don't have an Account
                            </router-link>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-col>

            <v-col cols="12" md="6" class="text-center">
                <v-img 
                    src="/Images/Login/loginImg.png" 
                    max-width="100%" 
                    contain>
                </v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: email.value,
            password: password.value
        })

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        message.value = 'Login successful!'
        setTimeout(() => {
            router.push('/home')
        }, 1000)
    } catch (error) {
        message.value = error.response?.data?.message || 'Error connecting to server'
    }
}
</script>

<style scoped>
.v-container{
    margin-top: 10vh;
}

.v-img {
    border-radius: 14px;
}
</style>