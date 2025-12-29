<template>
    <v-container>
        <v-row class="align-center mb-4">
            <v-col cols="9">
                <h1> Dashboard</h1>
                <p>Analyze school average, track rankings.</p>
            </v-col>
            <v-col cols="3"  v-if="club">
                <p color="#00268f">
                  {{ club.id }}  
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn v-if="isMember==false">Join in club</v-btn>
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
                        <tr v-for="(member) in members" :key="member.id || member._id || i">
                            <td></td>
                            <td>{{member.username }}</td>
                            <td>{{ member.schoolAverage ?? '-' }}</td>
                            <td>
                                <v-btn size="small" color="primary">Ver</v-btn>
                            </td>
                        </tr>
                        <tr v-if="members.length === 0">
                            <td colspan="4">Nenhum membro encontrado</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute} from 'vue-router';
import axios from 'axios';

const route = useRoute();
const club = ref(null);
const isMember = ref(false);

const members = computed(() => { 
    return club.value?.members ?? club.value?.joinedCLubs ?? club.value?.users ?? [];
});

const load_club = async() => {
    try {
        const clubId = route.params.id;
        const token = localStorage.getItem('token');

        if (!clubId) {
            console.error("No club ID provided in route parameters.");
            return;
        }

        const response = await axios.get(`http://localhost:3000/api/auth/club/${clubId}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.data.success){
            club.value = response.data.club ?? response.data;
            isMember.value = response.data.isMember;
        }

    } catch (error) {
        console.error("Error loading club:", error);
    }
};


onMounted(() => {
    load_club();
})
</script>