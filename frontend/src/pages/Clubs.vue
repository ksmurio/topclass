<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center">
                <h1>{{ selected }}</h1>
            </v-col>
        </v-row>
        
        <v-row justify="center">
            <v-col cols="12" md="4">
                <v-btn @click="select('Create clubs')" :to="{ name: 'CreateClubs' }" block>
                    Create clubs
                </v-btn>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn @click="select('Clubs created')" color="blue-darken-4" block>
                    Clubs created
                </v-btn>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn @click="select('My clubs')" block>
                    My clubs
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('Clubs')

function select(name) {
    selected.value = name;
}

</script>