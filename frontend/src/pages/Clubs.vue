<template>
    <v-container>
        <v-row>
            <v-col cols="9">
                <h1>Club management</h1>
                <p>Find and join clubs to collaborate with other students.</p>
            </v-col>
            <v-col cols="3" class="d-flex align-center">
                <v-btn color="#00268f" variant="flat" :to="{ name: 'CreateClubs' }" block>
                    Create clubs
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-text-field placeholder="Serch for clubs name" variant="outlined"></v-text-field>
            </v-col>
        </v-row>
         <v-row>
            <v-col cols="12">
                <h2>Your clubs</h2>
            </v-col>
             
            <v-col v-for="club in clubs" :key="clubs.id" cols="12" sm="6" md="4" lg="3">
                <v-card>
                    <v-card-title>{{ club.name }}</v-card-title>
                    <v-card-subtitle>{{ club.description }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn :to="`/club/${club.id}`" color="#00268f" variant="flat" block>VIEW CLUB</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted,  nextTick } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const clubs = ref([]);

const show_Clubs = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get('http://localhost:3000/api/auth/clubs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Response:", response.data);

        if (response.data.success) {
            clubs.value = response.data.clubs;
            console.log("Clubs:", clubs.value);
        }
    } catch (error) {
        console.error('Error searching for clubs:', error);
    }
};

onMounted(() => {
    show_Clubs();
});

</script>
