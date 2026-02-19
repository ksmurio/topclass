<template>
  <div class="register-bg">
    <v-container class="v-card-container register-container">
      <v-row>
        <v-col cols="12" md="8" lg="6" class="mx-auto">
          <v-card class="text-center">
            <form @submit.prevent="register">
              <v-card-text>
                <v-card-title>
                  <h3>Register</h3>
                </v-card-title>
                <v-card-subtitle class="mb-5">Start your journey</v-card-subtitle>

                <v-text-field label="Name" v-model="name" :rules="[() => !!name || 'This field is required']" required>
                </v-text-field>

                <v-text-field label="Username" v-model="username"
                  :rules="[() => !!username || 'This field is required']" required>
                </v-text-field>

                <v-text-field label="Email" v-model="email" :rules="[() => !!email || 'This field is required']"
                  required>
                </v-text-field>

                <v-text-field label="Password" v-model="password"
                  :rules="[() => !!password || 'This field is required']" required>
                </v-text-field>
              </v-card-text>

              <v-file-input v-model="profile_picture" label="Profile Picture" accept="image/*" @change="handleFile" prepend-icon="mdi-camera">
              </v-file-input>

              <v-card-actions class="d-flex flex-column justify-center">
                <v-btn size="large" type="submit" color="blue-darken-4" class="text-white" variant="flat">
                  Create Account
                </v-btn>
                <p v-if="message" class="mt-3">{{ message }}</p>
                <router-link to="/" class="mt-2">
                  I already have an Account
                </router-link>
              </v-card-actions>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const profile_picture = ref(null);  
const message = ref('');

const register = async () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('username', username.value);
  formData.append('email', email.value);
  formData.append('password', password.value);

  if (profile_picture.value) {
    formData.append('profile_picture', profile_picture.value);
  }

  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res.data.success) {
      message.value = res.data.message;

      setTimeout(() => {
        router.push('/');
      }, 2000);

      name.value = '';
      username.value = '';
      email.value = '';
      password.value = '';
    }
  } catch (error) {
    if (error.response) {
      message.value = error.response.data.message;
    } else {
      message.value = 'Error connecting to server';
    }
  }
};
</script>

<style scoped>
.register-bg {
  background-image: url("/Images/Register/background.png");
  background-size: cover;
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
}

.register-container {
  padding-top: 15vh;
}
</style>