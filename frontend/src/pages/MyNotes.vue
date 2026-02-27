<template>
    <v-container>
        <v-row>
            <v-col cols="6" class=" p-5">
                <v-card>
                    <v-card-title class="text-center">
                        <h1>My Notes</h1>
                    </v-card-title>

                    <v-card-text>
                        <v-textarea v-model="note" label="Write your note" placeholder="Type something..." outlined
                            rounded rows="4" :counter="200" :style="{ color: '#333'}"
                            append-icon="mdi-note-plus"></v-textarea>
                            <v-btn color="primary" @click="saveNotes">Send</v-btn>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
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

<style>

</style>