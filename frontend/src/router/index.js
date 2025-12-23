import { createRouter, createWebHistory } from "vue-router";

import Welcome from "../pages/Welcome.vue";
import Home from "../pages/Home.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Battles from "../pages/Battles.vue";
import Dashboard from "../pages/Dashboard.vue";
import MyNotes from "../pages/MyNotes.vue";
import Profile from "../pages/Profile.vue";
import Ranking from "../pages/Ranking.vue";
import Clubs from "../pages/Clubs.vue";
import CreateClubs from "../pages/CreateClubs.vue";
import Logout from "../pages/Logout.vue";
import path from "path";

const routes = [
    {path: '/',name: 'Welcome', component: Welcome},
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/home', name:'Home', component: Home},
    {path: '/battles', name: 'Battles', component: Battles},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/mynotes', name: 'MyNotes', component: MyNotes},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/ranking', name: 'Ranking', component: Ranking},
    {path: '/clubs', name: 'Clubs', component: Clubs},
    {path: '/createclubs', name: 'CreateClubs', component: CreateClubs},
    {path: '/logout', name: 'Logout', component: Logout},
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;