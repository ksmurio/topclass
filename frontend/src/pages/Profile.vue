<template>
    <div class="page-bg">
        <v-container class="page-container">
            <div class="section-block mb-6">
                <div class="profile-header">
                    <v-avatar size="80" class="mb-3">
                        <v-img v-if="user.profile_picture"
                            :src="`http://localhost:3000/uploads/${user.profile_picture}`" />
                        <v-icon v-else size="60" color="#1A73E8">mdi-account-circle</v-icon>
                    </v-avatar>
                    <h1 class="profile-name">{{ user.name }}</h1>
                    <span class="profile-username">@{{ user.username }}</span>
                </div>
            </div>

            <div class="section-block mb-6">
                <div class="section-header mb-4">
                    <v-icon color="#1A73E8" size="20">mdi-information-outline</v-icon>
                    <h2 class="section-title">Informações</h2>
                </div>
                <div class="info-row">
                    <span class="info-label">Email</span>
                    <span class="info-value">{{ user.email }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Ano Escolar</span>
                    <span class="info-value">{{ user.school_year }}º ano</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Média Global</span>
                    <span class="info-value">{{ user.global_average }}</span>
                </div>
            </div>

            <v-btn block color="error" variant="flat" class="logout-btn" @click="logout">
                <v-icon start>mdi-logout</v-icon> Logout
            </v-btn>

        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = ref({});
const router = useRouter();

const loadUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) user.value = res.data.user;
    } catch (e) {
        console.error('Error loading user:', e);
    }
};

const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
};

onMounted(() => loadUser());
</script>

<style scoped>
.page-bg {
    background-color: #f0f2f5;
    min-height: 100vh;
}

.page-container {
    padding-top: 4vh;
}

.section-block {
    background: white;
    border-radius: 16px;
    padding: 20px 24px;
    border: 1px solid #e8edf5;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
}

.profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
}

.profile-name {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
}

.profile-username {
    color: #5f6b7a;
    font-size: 0.9rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f2f5;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    color: #5f6b7a;
    font-size: 0.9rem;
}

.info-value {
    font-weight: 600;
    color: #1a1a2e;
    font-size: 0.9rem;
}

.logout-btn {
    border-radius: 8px !important;
    font-weight: 600;
    height: 44px !important;
}
</style>