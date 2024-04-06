<template>
  <q-page class="row items-center justify-center">
    <q-form @submit="onSubmit" class="form">
      <div class="text">
        <img height="30px" src="/images/logo/rentrax-logo-black.svg">
        <div class="welcome">Reset Password</div>
      </div>
      <q-input v-model="email" label="Your email *" v-bind="emailProps" />
      <q-btn label="Reset Password" :loading="isPending" class="action full-width" unelevated type="submit" color="primary" />
      <q-separator  />
      <div class="additional">
        <q-btn label="Login" :to="{name:'loginPage'}"  no-caps  unelevated  />
        <q-btn label="Reset Password" :to="{name:'registerPage'}"  unelevated no-caps />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import useAuth from '../../service/auth'
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup'

// init
const router = useRouter()
const auth = useAuth()

// states
const isPwd = ref(false)

// validation
const schema = toTypedSchema(
  yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6).label('Password'),
  }),
);
const { defineField, handleSubmit } = useForm({
  validationSchema: schema,

});
const quasarConfig = (state: { errors: string[] }) => ({
  props: {
    error: !!state.errors[0],
    'error-message': state.errors[0],
  },
  validateOnModelUpdate: false
});
const [email, emailProps] = defineField('email', quasarConfig);
const [password, passwordProps] = defineField('password', quasarConfig);

// methods
const { isPending, isError, data, error, mutate: login } = useMutation({
  mutationKey: ['auth'],
  mutationFn: auth.login,
  onSuccess(data) {
    sessionStorage.setItem('access_token', data.access_token)
    router.push({ name: 'mediaList' })
  }
})
const onSubmit = handleSubmit((values) => {
  login(values)
});

</script>
<style lang="scss" scoped>
.form {
  background-color: white;
  width: 400px;
  padding: 10px 15px;
  border-radius: 1rem;
  box-shadow: 0 5px 15px 5px rgba($color: #000000, $alpha: 0.4);
  >*{
    margin-top: 10px;
  }
.text{
  text-align: center;
  .welcome{
    color: $primary;
    font-weight: bold;
    font-size: x-large;
    margin-top: 10px;
  }
}
  .action {
    margin:2rem 0 1rem 0;
  }
  .additional{
    margin-top: 1rem;
    text-align: center;
  }
}
</style>
