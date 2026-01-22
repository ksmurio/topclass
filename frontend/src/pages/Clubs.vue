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
        </v-row>

        <v-row>
            <v-col cols="12" class="mt-4 d-flex searchBox">
                <v-text-field  class="searchTextField" placeholder="Search for clubs name" variant="outlined" v-model="clubCode"></v-text-field>
                <v-btn class="searchBtn" @click="load_club(clubCode)">Search</v-btn>
            </v-col>
        </v-row>

        <v-row class="clubSection">
            <v-col cols="12">
                <h2>Your created clubs</h2>
            </v-col>

            <v-col v-for="club in clubsCreated" :key="club.id" cols="12" sm="6" md="4" lg="3">
                <v-card>
                    <v-card-title>{{ club.name }}</v-card-title>
                    <v-card-subtitle>{{ club.description }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn :to="`/club/${club.id}`" color="#00268f" variant="flat" block>VIEW CLUB</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <h2>Your joined clubs</h2>
            </v-col>
            <v-col v-for="club in clubsJoined" :key="club.id" cols="12" sm="6" md="4" lg="3">
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const clubCode = ref();
const router = useRouter();
const clubsCreated = ref([]);
const clubsJoined = ref([]); //fazer tudo em showclubsF 

const show_clubs = async () => {
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

        if (response.data.success) {
            clubsCreated.value = response.data.clubsCreated;
            clubsJoined.value = response.data.clubsJoined;
        }
    } catch (error) {
        console.error('Error searching for clubs:', error);
    }
};

const load_club = async (clubCode) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get(`http://localhost:3000/api/auth/club/${clubCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.success) {
            router.push(`/club/${clubCode}`);
        }

        console.log("Response:", response.data);

    } catch (error) {
        console.error('Error loading club:', error);
    }
}

onMounted(() => {
    show_clubs();
});

</script>

<style scoped>
.v-row{
    margin-bottom: 10px;
}

.clubSection{
    background-color: #e7e7e7;
    border-radius: 8px;
}

.searchBox {
    background-color: #e7e7e7;
    border-radius: 8px;
    padding: 10px;
}

.searchBox .searchBtn {
    height: 56px;
}

</style>
