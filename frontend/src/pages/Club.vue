<template>
    <v-container>
        <v-row class="align-center mb-4">
            <v-col cols="9">
                <h1> Dashboard</h1>
                <p>Analyze school average, track rankings.</p>
            </v-col>
            <v-col cols="3">
                <v-btn color="#00268f" variant="flat" block>
                    Chamar amigos
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Member</th>
                            <th>school average</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody v-if="club">
                        <tr>
                            <td>{{ club.name }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const club = ref(null);

const load_club = async() => {
    try {
        const clubId = route.params.id;

        if (!clubId) {
            console.error("No club ID provided in route parameters.");
            return;
        }

        const response = await axios.get(`http://localhost:3000/api/auth/club/${clubId}`);
        
        if(response.data.success){
            club.value = response.data.club;
        }
    } catch (error) {
        console.error("Error loading club:", error);
        
    }
};

onMounted(() => {
    load_club();
})

</script>