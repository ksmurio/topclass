<template>
    <div>
        <v-container class="welcome-page">
            <v-row class="d-flex justify-center align-center">
                <v-col cols="6">
                    <h1>Learning has never been so competitive</h1>
                    <p class="text-disabled mb-3">
                        Join your classmates, compete in battles,
                        complete daily missions, and climb the class rankings.
                        Turn your studies into an adventure.
                    </p>
                    <v-row>
                        <v-col cols="4" class="d-flex justify-space-between">
                            <router-link to="/register">
                                <v-btn class="text-white">
                                    Create Account
                                </v-btn>
                            </router-link>
                            <br>
                            <router-link to="/login">
                                <v-btn class="text-black">
                                    Login
                                </v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6" class="d-flex justify-center align-center">
                    <img src='/Images/Welcome/girl_studing.jpg'><br>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
</script>

<style defined>
.welcome-page {
    margin-top: 10vh;
    img {
        height: auto;
        width: 600px;
        border-radius: 14px;
    }
}
</style>