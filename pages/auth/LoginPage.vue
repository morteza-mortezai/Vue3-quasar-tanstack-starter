<template>
  <q-page class="login">
    <div class="wrap">
      <img height="40px" src="/images/logo/rentrax-logo-black.svg">
      <q-form @submit="onSubmit" class="form ">
        <div class="inner">
          <div class="text">
            <div class="welcome">Hi, Welcome Back</div>
          </div>
          <q-input filled dense v-model="email" label="Email *" v-bind="emailProps" />
          <q-input filled dense v-model="password" :type="isPwd ? 'password' : 'text'" label="Password *"
            v-bind="passwordProps">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn label="Login" :loading="isPending" class="action full-width py-3" unelevated type="submit"
            color="primary" />
          <q-separator />
          <div class="additional">
            <q-btn label="Forgot Your Password" :to="{ name: 'forgotPasswordPage' }" no-caps unelevated />
            <q-btn label="Register" :to="{ name: 'registerPage' }" unelevated no-caps />
          </div>
        </div>
      </q-form>
    </div>
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
.login {
  @apply flex items-center justify-center;

  .wrap {
    @apply text-center;

    .form {
      background: linear-gradient(180deg, rgb(99, 102, 241) 10%, rgba(33, 150, 243, 0) 30%);
      @apply p-1 rounded-[3rem] ;

      .inner {
        @apply bg-white py-4 px-6 rounded-[2.8rem] w-full md:w-[25rem];

        >* {
          @apply mt-4;
        }

        .text {
          @apply text-center mb-8;

          .welcome {
            @apply text-primary font-bold text-xl ;
          }
        }

        .action {
          margin: 2rem 0 1rem 0;
        }

        .additional {
          @apply mt-4 font-normal text-stone;

        }
      }
    }
  }
}
</style>
