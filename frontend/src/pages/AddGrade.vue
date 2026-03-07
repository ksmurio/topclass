<template>
    <v-container>
        <v-row class="justify-center mt-5">
            <v-col cols="3">
                <v-card>
                    <v-card-title>Add Grade</v-card-title>
                    <v-card-text>
                        <v-select label="School Subject" v-model="selectedSubject" :items="subjects" item-title="name"
                            item-value="id" required />
                        <v-select v-if="user && user.school_year < 10" label="Grade" v-model="selectedGrade"
                            :items="grade5to9" required />
                        <v-select v-else-if="user && user.school_year >= 10" label="Grade" v-model="selectedGrade"
                            :items="grade10to12" required />
                        <v-btn @click="addGrade" color="primary" class="mt-3">Add</v-btn>
                        <v-alert v-if="message" :type="success ? 'success' : 'error'" class="mt-3" variant="tonal">
                            {{ message }}
                        </v-alert>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/store.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const appStore = useAppStore();
const user = appStore.user;
const token = localStorage.getItem('token');

const subjects = ref([]);
const selectedSubject = ref(null);
const selectedGrade = ref(null);
const message = ref('');
const success = ref(null);

const grade5to9 = ['0', '1', '2', '3', '4', '5'];
const grade10to12 = Array.from({ length: 21 }, (_, i) => String(i));

const addGrade = async () => {
    if (!selectedSubject.value || selectedGrade.value === null) {
        success.value = false;
        message.value = 'Please fill all fields';
        return;
    }

    try {
        const response = await axios.post(
            'http://localhost:3000/api/auth/addGrade',
            {
                subject_id: selectedSubject.value,
                grade: selectedGrade.value,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        if (response.data.success) {
            success.value = true;
            message.value = 'Grade added successfully!';
            setTimeout(() => router.push('/home'), 1000);
        }
    } catch (error) {
        success.value = false;
        message.value = 'Error adding grade';
    }
};

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/getSubjects', {
            headers: { Authorization: `Bearer ${token}` }
        });
        subjects.value = response.data.subjects;
    } catch (error) {
        console.log('Error fetching subjects', error);
    }
});
</script>

<style scoped lang="scss">
.v-card {
    text-align: center;

    .v-btn {
        width: 100%;
    }
}
</style>