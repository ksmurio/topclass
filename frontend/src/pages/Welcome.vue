<template>
  <div class="welcome-bg">
    <v-container class="welcome-page">
      <v-row class="d-flex align-center" justify="center">
        <v-col cols="12" md="6">
          <div class="brand-header mb-6">
            <v-icon color="#1A73E8" size="28">mdi-school</v-icon>
            <span class="brand-name">Topclass</span>
          </div>
          <h1 class="welcome-title">Learning has never been so competitive</h1>
          <p class="welcome-sub mb-6">
            Join your classmates, compete in battles, complete daily missions, and
            climb the class rankings. Turn your studies into an adventure.
          </p>
          <v-row dense>
            <v-col cols="12" sm="6">
              <router-link to="/register" class="w-100">
                <v-btn class="btn-primary w-100" variant="flat">Create Account</v-btn>
              </router-link>
            </v-col>
            <v-col cols="12" sm="6">
              <router-link to="/login" class="w-100">
                <v-btn class="btn-secondary w-100" variant="outlined">Login</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center mt-6 mt-md-0">
          <img src="/Images/Welcome/girl_studing.jpg" class="welcome-img" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
</script>

<style scoped>
.welcome-bg {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.welcome-page {
  padding-top: 10vh;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
}

.welcome-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
}

.welcome-sub {
  color: #5f6b7a;
  font-size: 1rem;
  line-height: 1.6;
}

.btn-primary {
  background-color: #1A73E8 !important;
  color: white !important;
  border-radius: 8px !important;
  font-weight: 600;
  height: 44px !important;
}

.btn-primary:hover {
  background-color: #1558b0 !important;
}

.btn-secondary {
  border-color: #1A73E8 !important;
  color: #1A73E8 !important;
  border-radius: 8px !important;
  font-weight: 600;
  height: 44px !important;
}

.welcome-img {
  max-width: 100%;
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(26, 115, 232, 0.12);
}
</style>