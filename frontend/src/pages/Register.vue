<template>
  <div class="register-bg">
    <v-container class="v-card-container register-container">
      <v-row>
        <v-col cols="12" md="8" lg="6" class="mx-auto">
          <div class="brand-header text-center mb-4">
            <v-icon color="#1A73E8" size="32">mdi-school</v-icon>
            <span class="brand-name">Topclass</span>
          </div>
          <v-card class="text-center register-card">
            <form @submit.prevent="register">
              <v-card-text class="pb-0">
                <v-card-title class="card-title">
                  <h3>Crie sua Conta</h3>
                </v-card-title>
                <v-card-subtitle class="card-subtitle mb-6">
                  Comece sua jornada de aprendizado
                </v-card-subtitle>
                <v-text-field label="Name" v-model="name" :rules="[() => !!name || 'This field is required']" required variant="outlined" density="comfortable" class="styled-field" />
                <v-text-field label="Username" v-model="username" :rules="[() => !!username || 'This field is required']" required variant="outlined" density="comfortable" class="styled-field" />
                <v-text-field label="School year" v-model="school_year" :rules="[() => !!school_year || 'This field is required']" required variant="outlined" density="comfortable" class="styled-field" />
                <v-text-field label="Email" v-model="email" :rules="[() => !!email || 'This field is required']" required variant="outlined" density="comfortable" class="styled-field" />
                <v-text-field label="Password" v-model="password" :rules="[() => !!password || 'This field is required']" required variant="outlined" density="comfortable" class="styled-field" />
              </v-card-text>
              <v-card-text class="pt-0">
                <v-file-input v-model="profile_picture" label="Profile Picture" accept="image/*" @change="handleFile" prepend-icon="" variant="outlined" density="comfortable" class="styled-field" />
              </v-card-text>
              <v-card-actions class="d-flex flex-column justify-center pb-6">
                <v-btn size="large" type="submit" class="submit-btn" variant="flat" block>
                  Criar Conta
                </v-btn>
                <p v-if="message" class="mt-3 message-text">{{ message }}</p>
                <router-link to="/" class="login-link mt-3">
                  Já tenho uma conta
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
const school_year = ref('');
const email = ref('');
const password = ref('');
const profile_picture = ref(null);
const message = ref('');

const register = async () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('username', username.value);
  formData.append('school_year', school_year.value);
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
      router.push(`/confirmar-email?userId=${res.data.userId}`);
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
  background-color: #f0f2f5;
  min-height: 100vh;
  width: 100%;
}

.register-container {
  padding-top: 8vh;
}

.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
}

.register-card {
  border-radius: 16px !important;
  box-shadow: 0 4px 24px rgba(26, 115, 232, 0.08) !important;
  border: 1px solid #e8edf5 !important;
  padding: 8px 24px 0;
}

.card-title h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
}

.card-subtitle {
  color: #1A73E8 !important;
  font-size: 0.875rem;
}

.styled-field {
  margin-bottom: 4px;
}

:deep(.v-field__outline) {
  opacity: 1;
}

.submit-btn {
  background-color: #1A73E8 !important;
  color: white !important;
  border-radius: 8px !important;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.2px;
  height: 48px !important;
  width: 100%;
}

.submit-btn:hover {
  background-color: #1558b0 !important;
}

.message-text {
  color: #1A73E8;
  font-size: 0.875rem;
}

.login-link {
  color: #1A73E8;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}
</style>