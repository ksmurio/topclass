<template>
    <v-container>
        <v-card>
            <v-card-title>Add a grade</v-card-title>
            <v-card-text>
                <v-select v-if="user.school_year<10" label="grade" v-model="selectedGrade" :items="grade5to9" item-title="grade" item-value="value"/>
                <v-select v-if="user.school_year>9" label="grade" v-model="selectedGrade" :items="grade10to12" item-title="grade" item-value="value"/>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import {ref} from 'vue';
import { useAppStore } from '@/stores/store.js';

const store = useAppStore();
const user = store.user;

const grade5to9 = [0,1,2,3,4,5];
const grade10to12 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const selectedGrade = ref(null);
</script>