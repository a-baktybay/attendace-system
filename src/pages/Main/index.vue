<template>
  <div class="flex justify-center items-center h-screen w-screen bg-gray-100">
    <main class="flex w-[1200px] h-[800px] p-9 rounded-3xl bg-white">
      <div class="flex items-center h-full">
        <img 
          src="@/assets/images/auth-page-img.png" 
          alt=""
          width="591"
          height="590"
        >
      </div>
      <div class="flex flex-col justify-center items-center h-full">
        <img 
          src="@/assets/images/happy-logo.png" 
          alt=""
          width="425"
          height="159"
        >
        <div class="flex flex-col items-center space-y-8">
          <input
            type="text" 
            placeholder="ID number"
            class="p-4 w-80 bg-gray-100 rounded-lg placeholder:text-gray-500 focus:outline-none"
            :class="{
              'border border-red-500': auth.isError.value
            }"
            @input="auth.onChangeLogin($event.target.value)"
          >
          <input
            type="password" 
            placeholder="Password"
            class="p-4 w-80 bg-gray-100 rounded-lg placeholder:text-gray-500 focus:outline-none"
            :class="{
              'border border-red-500': auth.isError.value
            }"
            @input="auth.onChangePassword($event.target.value)"
          >
          <p v-if="auth.isError.value" class="self-start text-red-500">
            Login or password is incorrect <br>
            Please, try again.
          </p>
          <button
            type="button"
            class="self-end py-0.5 w-20 px-4 rounded-lg text-white bg-blue-800"
            @click="onAuth"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
  import { useRouter } from 'vue-router';
  import { useAuth } from '@/features/auth';
  
  const router = useRouter();
  const auth = useAuth();

  const proceedToDashbord = () => {
    router.replace({
      name: 'DashbordPage'
    })
  }

  const onAuth = () => {
    auth
      .auth()
      .then(() => proceedToDashbord());
  }
</script>