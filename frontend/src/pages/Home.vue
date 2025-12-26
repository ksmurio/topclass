<template>
    <v-container>
        <v-row>
            <v-col cols="10">
                <v-row>
                    <v-col cols="9">
                        <h1>Welcome</h1>
                        <p>Here is the summary of your progress and your activities this week.</p>
                    </v-col>  
                    <v-col cols="3">
                        <v-btn color="#00268f" :to="{ name: 'AddAverage'}">Add academic average</v-btn>
                    </v-col>  
                </v-row>
                <v-row justify="center">
                    <v-date-picker show-adjacent-months elevation="24" width="700" color="#00268f"
                        :max="new Date()"></v-date-picker>
                </v-row>
            </v-col>
            <v-col cols="2">

            </v-col>
        </v-row>
    </v-container>
</template>

<script>

</script>