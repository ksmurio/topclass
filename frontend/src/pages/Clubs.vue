<template>
    <v-container>
        <v-row>
            <v-col cols="9">
                <h1>Club management</h1>
                <p>Find and join clubs to collaborate with other students.</p>
            </v-col>
            <v-col cols="3" class="d-flex align-center">
                <v-btn class="btn btn-primary" @click="select('Create clubs')" :to="{ name: 'CreateClubs' }" block>
                    Create clubs
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="search" placeholder="Serch for clubs name" variant="outlined"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h2>Your clubs</h2>
            </v-col>
            <!--<v-col cols="12">
                <v-card v-for(club in clubs) :key="club.id">
                    <v-card-title> {{ club.name }}</v-card-title>
                    <v-card-subtitle> {{ club.description }}</v-card-subtitle>
                </v-card>
            </v-col>-->
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vuetify/lib/composables/router.mjs';

const router = useRouter();
const token = localStorage.getItem('token');


</script>