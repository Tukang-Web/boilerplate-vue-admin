<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, ref, onBeforeMount } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const { loading, error, success } = storeToRefs(useAuthStore())
const { login } = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const onSubmit = async () => {
  await login(form.value)

  if (error.value === 'Unauthorized') {
    toast.error('Email or password is incorrect')
  }
}

const rememberMe = (e) => {
  if (e.target.checked) {
    localStorage.setItem('rememberMe', true)
    localStorage.setItem('email', form.value.email)
  } else {
    localStorage.removeItem('rememberMe')
    localStorage.removeItem('email')
  }
}

onBeforeMount(() => {
  document.body.classList.add("auth-body-bg");
});

onMounted(() => {
  if (success.value === 'logout') {
    toast.success('Logout successfully')
  }

  if (localStorage.getItem('rememberMe')) {
    form.value.email = localStorage.getItem('email')
  }
})
</script>

<template>
  <div>

    <div>
      <div class="container-fluid p-0">
        <div class="row g-0">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <router-link to="/" class="logo">
                            <img src="@/assets/images/logo-tw.png" height="20" alt="logo" />
                          </router-link>
                        </div>

                        <h4 class="font-size-18 mt-4">Welcome Back !</h4>
                        <p class="text-muted">Sign in to continue to Tukang Web.</p>
                      </div>

                      <div class="p-2 mt-5">
                        <form class="form-horizontal" @submit.prevent="onSubmit">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input type="email" v-model="form.email" class="form-control" id="email"
                              placeholder="Enter email" :class="{ 'is-invalid': error?.email }"  />
                            <p class="text-danger" v-if="error?.email">{{ error?.email[0] }}</p>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input v-model="form.password" type="password" class="form-control" id="userpassword"
                              placeholder="Enter password" :class="{ 'is-invalid': error?.password }"  />
                            <p class="text-danger" v-if="error?.password">{{ error?.password[0] }}</p>
                          </div>

                          <div class="form-check custom-checkbox">
                            <input type="checkbox" class="form-check-input" id="customControlInline" @change="rememberMe" />
                            <label class="form-check-label" for="customControlInline">Remember me</label>
                          </div>

                          <div class="mt-4 text-center">
                            <button class="btn btn-primary w-md waves-effect waves-light" type="submit"
                              :disabled="loading.value" :class="{ 'btn-loading': loading.value }">
                              Log In
                            </button>
                          </div>
                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          © 2024 Tukang Web. Crafted with <i class="mdi mdi-heart text-danger"></i> by Tukang Web
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>