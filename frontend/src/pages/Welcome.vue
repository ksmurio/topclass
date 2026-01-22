<template>
  <v-container class="welcome-page">
    <v-row class="d-flex align-center" justify="center">
      <v-col cols="12" md="6">
        <h1>Learning has never been so competitive</h1>
        <p class="text-disabled mb-3">
          Join your classmates, compete in battles, complete daily missions, and
          climb the class rankings. Turn your studies into an adventure.
        </p>

        <v-row class="mt-4" dense>
          <v-col cols="12" sm="6" class="d-flex justify-center mb-2 mb-sm-0">
            <router-link to="/register" class="w-100">
              <v-btn color="#00268f" class="text-white w-100"
                >Create Account</v-btn
              >
            </router-link>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-center">
            <router-link to="/login" class="w-100">
              <v-btn outlined color="#00268f" class="w-50">Login</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-center align-center mt-4 mt-md-0">
        <img src="/Images/Welcome/girl_studing.jpg" class="welcome-img" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
</script>

<style defined>

.welcome-page{
    margin-top: 10vh;
}
.welcome-page img {
  max-width: 100%;
  height: auto;
  border-radius: 14px;
}
</style>