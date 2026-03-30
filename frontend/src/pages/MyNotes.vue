<template>
  <div class="page-bg">
    <v-container class="page-container">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="5">

          <div class="brand-header mb-6">
            <v-icon color="#1A73E8" size="28">mdi-note-text</v-icon>
            <span class="brand-name">My Notes</span>
          </div>

          <v-card class="register-card">
            <v-card-text>
              <h3 class="card-title">New Note</h3>
              <p class="card-subtitle mb-6">Write and save your thoughts</p>

              <v-textarea v-model="note" label="Write your note" placeholder="Type something..."
                variant="outlined" rounded rows="4" :counter="200" />

              <v-btn variant="flat" class="submit-btn mt-3" block @click="saveNotes">
                <v-icon start>mdi-content-save</v-icon> Save Note
              </v-btn>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const note = ref('');
const saveNotes = async () =>{
    try{
        const res = await fetch('http://localhost:3000/api/auth/saveNotes',{
            method: 'POST',
            body: note,
        });
        if(res.data){
            console.log("nota guardada com succeso");
        }
    }catch(error){
        console.log(error);
    }
}
</script>

<style scoped>
.page-bg {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.page-container {
  padding-top: 8vh;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
}

.register-card {
  border-radius: 16px !important;
  box-shadow: 0 4px 24px rgba(26, 115, 232, 0.08) !important;
  border: 1px solid #e8edf5 !important;
  padding: 8px 16px 4px;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}

.card-subtitle {
  color: #1A73E8;
  font-size: 0.875rem;
}

:deep(.v-field__outline) {
  opacity: 1;
}

.submit-btn {
  background-color: #1A73E8 !important;
  color: white !important;
  border-radius: 8px !important;
  font-weight: 600;
  font-size: 0.95rem;
  height: 48px !important;
}

.submit-btn:hover {
  background-color: #1558b0 !important;
}
</style>