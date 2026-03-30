<template>
  <div class="page-bg">
    <v-container class="page-container">

      <v-row align="center" class="mb-4">
        <v-col cols="12" sm="8">
          <h1 class="page-title">Club management</h1>
          <p class="page-sub">Find and join clubs to collaborate with other students.</p>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-end">
          <v-btn color="#1A73E8" variant="flat" :to="{ name: 'CreateClubs' }" class="create-btn">
            <v-icon start>mdi-plus</v-icon> Create Club
          </v-btn>
        </v-col>
      </v-row>

      <div class="search-box mb-6">
        <v-text-field placeholder="Search for clubs name" variant="outlined"
          v-model="clubCode" density="comfortable" hide-details class="search-field" />
        <v-btn class="search-btn" @click="load_club(clubCode)" variant="flat">
          <v-icon>mdi-magnify</v-icon> Search
        </v-btn>
      </div>

      <div class="section-block mb-6">
        <div class="section-header">
          <v-icon color="#1A73E8" size="20">mdi-crown</v-icon>
          <h2 class="section-title">Your created clubs</h2>
        </div>
        <v-row class="mt-3">
          <v-col v-for="club in clubsCreated" :key="club.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="club-card">
              <div v-if="club.club_image">
                <v-img :src="getImageUrl(club.club_image)" height="140" cover class="club-img" />
              </div>
              <div v-else class="club-placeholder">
                <v-icon size="36" color="#1A73E8">mdi-account-group</v-icon>
              </div>
              <v-card-text class="pb-1">
                <p class="club-name">{{ club.name }}</p>
                <p class="club-desc">{{ club.description }}</p>
              </v-card-text>
              <v-card-actions class="pt-0 px-3 pb-3">
                <v-btn :to="`/club/${club.id}`" color="#1A73E8" variant="flat" block class="view-btn">
                  View Club
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-if="!clubsCreated.length" cols="12">
            <p class="empty-text">No clubs created yet.</p>
          </v-col>
        </v-row>
      </div>

      <div class="section-block">
        <div class="section-header">
          <v-icon color="#1A73E8" size="20">mdi-account-multiple</v-icon>
          <h2 class="section-title">Your joined clubs</h2>
        </div>
        <v-row class="mt-3">
          <v-col v-for="club in clubsJoined" :key="club.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="club-card">
              <div v-if="club.club_image">
                <v-img :src="getImageUrl(club.club_image)" height="140" cover class="club-img" />
              </div>
              <div v-else class="club-placeholder">
                <v-icon size="36" color="#1A73E8">mdi-account-group</v-icon>
              </div>
              <v-card-text class="pb-1">
                <p class="club-name">{{ club.name }}</p>
                <p class="club-desc">{{ club.description }}</p>
              </v-card-text>
              <v-card-actions class="pt-0 px-3 pb-3">
                <v-btn :to="`/club/${club.id}`" color="#1A73E8" variant="flat" block class="view-btn">
                  View Club
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-if="!clubsJoined.length" cols="12">
            <p class="empty-text">No clubs joined yet.</p>
          </v-col>
        </v-row>
      </div>

    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const clubCode = ref();
const router = useRouter();
const clubsCreated = ref([]);
const clubsJoined = ref([]);

const show_clubs = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    const response = await axios.get('http://localhost:3000/api/auth/clubs', {
      headers: { 'Authorization': `Bearer ${token}` }
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
    if (!token) { router.push('/login'); return; }
    const response = await axios.get(`http://localhost:3000/api/auth/club/${clubCode}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.data.success) { router.push(`/club/${clubCode}`); }
    console.log("Response:", response.data);
  } catch (error) {
    console.error('Error loading club:', error);
  }
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return `http://localhost:3000/uploads/base.jpg`;
  return `http://localhost:3000/uploads/${imagePath}`;
};

onMounted(() => { show_clubs(); });
</script>

<style scoped>
.page-bg {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.page-container {
  padding-top: 4vh;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}

.page-sub {
  color: #5f6b7a;
  font-size: 0.9rem;
}

.create-btn {
  border-radius: 8px !important;
  font-weight: 600;
  color: white !important;
  height: 44px !important;
}

.search-box {
  display: flex;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid #e8edf5;
}

.search-field { flex: 1; }

.search-btn {
  background-color: #1A73E8 !important;
  color: white !important;
  border-radius: 8px !important;
  font-weight: 600;
  height: 40px !important;
  align-self: center;
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

.club-card {
  border-radius: 12px !important;
  box-shadow: none !important;
  border: 1px solid #e8edf5 !important;
  transition: border-color 0.2s, transform 0.2s;
  overflow: hidden;
}

.club-card:hover {
  border-color: #1A73E8 !important;
  transform: translateY(-2px);
}

.club-img {
  border-radius: 0 !important;
}

.club-placeholder {
  height: 140px;
  background: #EBF3FD;
  display: flex;
  align-items: center;
  justify-content: center;
}

.club-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 4px;
}

.club-desc {
  font-size: 0.8rem;
  color: #5f6b7a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-btn {
  border-radius: 8px !important;
  font-weight: 600;
  color: white !important;
}

.empty-text {
  color: #5f6b7a;
  font-size: 0.9rem;
  padding: 8px 0;
}
</style>