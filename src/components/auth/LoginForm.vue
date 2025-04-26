<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../services/api';

const username = ref('');
const password = ref('');
const checkbox = ref(false);

const handleLogin = async () => {
    try {
        // Make the API request to your backend for login
        const response = await axios.post('YOUR_BACKEND_API_URL', {
            username: username.value,
            password: password.value,
        });

        // If login is successful
        if (response.data.success) {
            console.log('Login successful');
            // Redirect or handle after successful login
        } else {
            console.log('Login failed', response.data.message);
        }
    } catch (error) {
        console.error('An error occurred during login', error);
    }
};
</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Đăng nhập</span>
        </div>
    </div>
    <div>
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Username</v-label>
                <v-text-field
                    v-model="username"
                    variant="outlined"
                    class="pwdInput"
                    hide-details
                    color="primary">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Password</v-label>
                <v-text-field
                    v-model="password"
                    variant="outlined"
                    class="border-borderColor"
                    type="password"
                    hide-details
                    color="primary">
                </v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
                <div class="d-flex flex-wrap align-center w-100">
                    <v-checkbox hide-details color="primary" v-model="checkbox">
                        <template v-slot:label class="">Nhớ mật khẩu</template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                        <RouterLink to=""
                                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                            Quên mật khẩu?
                        </RouterLink>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn
                    size="large"
                    rounded="pill"
                    color="primary"
                    class="rounded-pill"
                    block
                    @click="handleLogin">
                    Đăng nhập
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
