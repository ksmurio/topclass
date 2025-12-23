<template>
    <div>
        <v-container class="v-card-container register-container">
            <v-row class="justify-center align-center">
                <v-col cols="6">
                    <v-card class="text-center">
                        <form @submit.prevent="register">
                            <v-card-text>
                                <v-card-title>
                                    <h3>Create club</h3>
                                </v-card-title>
                                <v-card-subtitle class="mb-5">Enjoy with your friends</v-card-subtitle>

                                <v-text-field label="ClubName" v-model="clubname"
                                    :rules="[() => !!clubname || 'This field is required']" required>
                                </v-text-field>

                                <v-select label="Privacy" v-model="isPrivate" :items="[
                                    { title: 'Public', value: false },
                                    { title: 'Private', value: true }
                                ]" required>
                                </v-select>

                                <v-text-field v-if="isPrivate" label="Password" v-model="password"
                                    :rules="[() => !!password || 'Password is required for private clubs']" required>
                                </v-text-field>

                                <v-text-field label="Description" v-model="description">
                                </v-text-field>

                                <v-select label="Clubtype" v-model="clubtype" :items="[
                                    { title: 'Matemática', value: 1 },
                                    { title: 'Português', value: 2 },
                                    { title: 'História', value: 3 },
                                    { title: 'Geografia', value: 4 },
                                    { title: 'Física', value: 5 },
                                    { title: 'Química', value: 6 },
                                    { title: 'Biologia', value: 7 },
                                    { title: 'Inglês', value: 8 },
                                    { title: 'Educação Física', value: 9 },
                                    { title: 'Artes', value: 10 },
                                    { title: 'Informática', value: 11 },
                                    { title: 'Filosofia', value: 12 },
                                    { title: 'Sociologia', value: 13 }
                                ]" :rules="[() => !!clubtype || 'This field is required']" required>
                                </v-select>
                            </v-card-text>

                            <v-card-actions class="d-flex flex-column justify-center">
                                <v-btn size="large" type="submit" color="blue-darken-4" class="text-white"
                                    variant="flat">
                                    Create Club
                                </v-btn>
                                <p v-if="message" class="mt-3">{{ message }}</p>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const clubname = ref('');
const isPrivate = ref(false);
const password = ref('');
const description = ref('');
const clubtype = ref('');
const message = ref('');

const register = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            message.value = 'You must be logged in';
            return;
        }

        const res = await axios.post('http://localhost:3000/api/auth/create_club', {
            clubname: clubname.value,
            password: password.value,
            description: description.value,
            clubtype: clubtype.value,
            isPrivate: isPrivate.value
        }, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (res.data.success) {
            message.value = 'Club created successfully!';
            setTimeout(() => {
                router.push('/clubs');
            }, 1000);
        }
    } catch (error) {
        message.value = error.response?.data?.message || 'Error connecting to server';
    }
}
</script>
