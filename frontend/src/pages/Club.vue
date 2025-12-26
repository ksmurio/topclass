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
                        <tr v-for="(u) in members" :key="u.id || u._id || i">
                            <td>{{ u.name || u.username || u.email }}</td>
                            <td>{{ u.schoolAverage ?? '-' }}</td>
                            <td>
                                <v-btn small color="primary" @click="goToMember(u)">Ver</v-btn>
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
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const club = ref(null);

const members = computed(() => { //atualiza o valor de members toda vez que club mudar 
    return club.value?.members ?? club.value?.joinedCLubs ?? club.value?.users ?? [];
});

const load_club = async() => {
    try {
        const clubId = route.params.id;

        if (!clubId) {
            console.error("No club ID provided in route parameters.");
            return;
        }

        const response = await axios.get(`http://localhost:3000/api/auth/club/${clubId}`);
        
        if(response.data.success){
            club.value = response.data.club ?? response.data;
            if (response.data.members) {
                club.value.members = response.data.members;
            }
        }
    } catch (error) {
        console.error("Error loading club:", error);
    }
};

const goToMember = (m) => {
    const id = m.id || m._id;
    if (id) {
        router.push({ name: 'MemberProfile', params: { id } });
    } else {
        console.log('Membro sem id:', m);
    }
};

onMounted(() => {
    load_club();
})
</script>