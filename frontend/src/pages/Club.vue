<template>
    <v-container>
        <v-row class="align-center mb-4">
            <v-col cols="9">
                <h1> Dashboard</h1>
                <p>Analyze school average, track rankings.</p>
            </v-col>
            <v-col cols="3" v-if="club">
                <p color="#00268f">
                    {{ club.id }}
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn v-if="isMember == false" @click="joinClub()">Join in club</v-btn>
            </v-col>
            <v-col cols="12">
                <v-btn v-if="isCreator" @click="deleteClub()">Delete Club</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th v-if="isCreator === true">Action</th>
                            <th>Rank</th>
                            <th>Member</th>
                            <th>school average</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody v-if="club">
                        <tr v-for="(member) in members" :key="member.id || member._id || i">
                            <td v-if="isCreator === true"><v-btn @click="deleteMember(member.id)">Delete</v-btn></td>
                            <td>{{ member.username }}</td>
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
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const club = ref(null);
const isMember = ref(true);
const isCreator = ref(false);

const members = computed(() => {
    return club.value?.members ?? club.value?.joinedCLubs ?? club.value?.users ?? [];
});

const load_club = async () => {
    try {
        const clubId = route.params.id;
        const token = localStorage.getItem('token');

        if (!clubId) {
            console.error("No club ID provided in route parameters.");
            return;
        }

        const response = await axios.get(`http://localhost:3000/api/auth/club/${clubId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.success) {
            club.value = response.data.club ?? response.data;
            isMember.value = response.data.isMember;
            isCreator.value = response.data.isCreator;
        }

    } catch (error) {
        console.error("Error loading club:", error);
    }
};

const joinClub = async () => {
    try {
        const clubId = route.params.id;
        const token = localStorage.getItem('token');

        if (!clubId) {
            console.error("No clube ID provided in route parameters");
        }

        const response = await axios.post(`http://localhost:3000/api/auth/club/${clubId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.success) {
            console.log("successfully joined");
            await load_club();
        }

    } catch (error) {
        console.error("Error joining club:", error);
    }
};

const deleteClub = async () => {
    try {
        const clubId = route.params.id;
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        if (!clubId) {
            console.log("No club ID provided in club parameters");
        }

        const response = await axios.delete(`http://localhost:3000/api/auth/club/${clubId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.success) {
            console.log("Club deleted successfully");
            router.push('/clubs');
        }
    } catch (error) {
        console.error("Error deleting club:", error);
    }
}

const deleteMember = async(memberId) =>{
    try{
        const token = localStorage.getItem('token');
        const clubId = route.params.id;

        if(!token){
            console.error("No token provided");
            return
        }

        const response = await axios.delete(`http://localhost:3000/api/auth/club/${clubId}/member/${memberId}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        if(response.data.success){
            console.log("User removed",
            load_club()
            )
        }
    }catch(error){
        console.error("Error deleting user " + error)
        return
    }
}

onMounted(() => {
    load_club();
})
</script>