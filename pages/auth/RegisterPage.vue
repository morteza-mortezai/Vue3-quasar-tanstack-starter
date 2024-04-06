<template>
  <q-page class="row items-center justify-center">
    <q-stepper v-model="step" vertical color="primary" animated>
      <!-- step 1 -->
      <q-step class="step" :name="1" title="User Info" icon="settings" :done="step > 1">
        <!-- form -->
        <q-form @submit="onGotoStepTwo" class="form">
          <q-input filled dense v-model="email" label="Your email *" v-bind="emailProps" />
          <q-input filled dense v-model="firstName" label="First name *" v-bind="firstNameProps" />
          <q-input filled dense v-model="lastName" label="Last name *" v-bind="lastNameProps" />
          <q-input filled dense v-model="password" :type="isPwd ? 'password' : 'text'" label="Your password *"
            v-bind="passwordProps">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input filled dense v-model="confirm" :type="isPwd2 ? 'password' : 'text'" label="Retype password *"
            v-bind="confirmProps">
            <template v-slot:append>
              <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd2 = !isPwd2" />
            </template>
          </q-input>
        </q-form>

        <q-stepper-navigation>
          <q-btn unelevated dense @click="onGotoStepTwo" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>
      <!-- step 2 -->
      <q-step class="step" :name="2" title="Bussiness Info"  icon="create_new_folder" :done="step > 2">
        <!-- form -->
        <q-form @submit="onGotoStepTwo" class="form">
          <q-select filled dense v-model="activity" label="Interested Activity *" :options="['one', 'two']"
            v-bind="activityProps" />
          <q-input filled dense v-model="businessName" label="Business name *" v-bind="businessNameProps" />
          <q-input filled dense v-model="businessEmail" label="Business email *" v-bind="businessEmailProps" />
          <q-input filled dense v-model="businessPhone" label="Business phone *" v-bind="businessPhoneProps" />
          <q-input filled dense v-model="businessPrefix" label="Business prefix *" prefix="https://" suffix=".rentrax.io"
            v-bind="businessPrefixProps" />
            <q-field :borderless="true" v-bind="agreementProps" dense>
              <q-checkbox v-model="agreement" v-bind="agreementProps" label="I agree" checked-icon="task_alt"
                unchecked-icon="highlight_off" />
          </q-field>
        </q-form>

        <q-stepper-navigation>
          <q-btn unelevated dense @click="onGotoStepThree" color="primary" label="Continue" />
          <q-btn unelevated dense flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <!-- step 3 -->
      <q-step class="step" :name="3" title="Bussiness Location" icon="assignment" disable>
        <!-- form -->
        <q-form @submit="onGotoStepTwo" class="form">
          <q-select filled dense v-model="country" label="Country *" :options="['iran', 'usa']" v-bind="countryProps" />
          <q-select filled dense v-model="state" label="state *" :options="['iran', 'usa']" v-bind="stateProps" />
          <q-input filled dense v-model="city" label="City *" v-bind="cityProps" />
          <q-input filled dense v-model="address" label="Adress *" v-bind="addressProps" />
          <q-input filled dense v-model="zipcode" label="Zip code *" v-bind="zipcodeProps" />
        </q-form>
        <q-stepper-navigation>
          <q-btn unelevated dense @click="onRegister" color="primary" label="register" />
          <q-btn unelevated dense flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

    </q-stepper>

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
const isPwd2 = ref(false)
const step = ref(2)

// validation
const schemaOne = toTypedSchema(
  yup.object({
    email: yup.string().required().email(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required().min(8),
    confirm: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
  }),
);
const schematwo = toTypedSchema(
  yup.object({
    activity: yup.string().required(),
    businessName: yup.string().required(),
    businessEmail: yup.string().required().email(),
    businessPhone: yup.string().required(),
    businessPrefix: yup.string().required(),
    agreement: yup.boolean().required().oneOf([true]),
  }),
);
const schemaThree = toTypedSchema(
  yup.object({
    country: yup.string().required(),
    state: yup.string().optional(),
    city: yup.string().required(),
    address: yup.string().required(),
    zipcode: yup.string().required(),
  }),
);
const { defineField: defineFieldOne, handleSubmit: gotoStepTwo } = useForm({
  validationSchema: schemaOne,
});
const { defineField: defineFieldTwo, handleSubmit: gotoStepThree } = useForm({
  validationSchema: schematwo,
});
const { defineField: defineFieldThree, handleSubmit: register } = useForm({
  validationSchema: schemaThree,
});
const quasarConfig = (state: { errors: string[] }) => ({
  props: {
    error: !!state.errors[0],
    'error-message': state.errors[0],
  },
  validateOnModelUpdate: false
});
// one
const [email, emailProps] = defineFieldOne('email', quasarConfig);
const [firstName, firstNameProps] = defineFieldOne('firstName', quasarConfig);
const [lastName, lastNameProps] = defineFieldOne('lastName', quasarConfig);
const [password, passwordProps] = defineFieldOne('password', quasarConfig);
const [confirm, confirmProps] = defineFieldOne('confirm', quasarConfig);
// two
const [activity, activityProps] = defineFieldTwo('activity', quasarConfig);
const [businessName, businessNameProps] = defineFieldTwo('businessName', quasarConfig);
const [businessEmail, businessEmailProps] = defineFieldTwo('businessEmail', quasarConfig);
const [businessPhone, businessPhoneProps] = defineFieldTwo('businessPhone', quasarConfig);
const [businessPrefix, businessPrefixProps] = defineFieldTwo('businessPrefix', quasarConfig);
const [agreement, agreementProps] = defineFieldTwo('agreement', quasarConfig);
//three
const [country, countryProps] = defineFieldThree('country', quasarConfig);
const [state, stateProps] = defineFieldThree('state', quasarConfig);
const [city, cityProps] = defineFieldThree('city', quasarConfig);
const [address, addressProps] = defineFieldThree('address', quasarConfig);
const [zipcode, zipcodeProps] = defineFieldThree('zipcode', quasarConfig);
// methods
const { isPending, isError, data, error, mutate: login } = useMutation({
  mutationKey: ['auth'],
  mutationFn: auth.login,
  onSuccess(data) {
    sessionStorage.setItem('access_token', data.access_token)
    router.push({ name: 'mediaList' })
  }
})
const onGotoStepTwo = gotoStepTwo((values) => {
  step.value = 2
  // login(values)
});
const onGotoStepThree = gotoStepThree((values) => {
  step.value = 3
  // login(values)
});
const onRegister = register((values) => {
  // step.value = 3
  // login(values)
});

</script>
<style lang="scss" scoped>
.step {
  width: 500px;
}
</style>
