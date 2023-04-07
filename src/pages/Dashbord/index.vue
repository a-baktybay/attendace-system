<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <main class="flex-grow py-10 px-5">
      <div class="w-full space-y-2 pb-20 text-right">
        <p>full name : {{ user.username }}</p>
        <p>ID number : {{ user.id }}</p>
        <p>today date: {{ todayDate }}</p>
      </div>
      <div class="pl-24">
        <div class="space-y-5">
          <label class="flex items-center border border-blue-800 space-x-4 w-96 p-3 bg-gray-200 rounded-lg">
            <img
              src="@/assets/images/search-icon.svg" 
              alt=""
              height="32"
              width="32"
            >
            <input 
              class="
                bg-transparent placeholder:text-gray-700 
                placeholder:text-lg placeholder:font-medium
                focus:outline-none
              " 
              placeholder="student ID" 
              type="text"
            >
          </label>
          <div class="flex items-center space-x-3">
            <label class="flex items-center border border-blue-800 space-x-4 w-96 p-3 bg-gray-200 rounded-lg">
              <img
                src="@/assets/images/search-icon.svg" 
                alt=""
                height="32"
                width="32"
              >
              <input 
                class="
                  bg-transparent placeholder:text-gray-700 
                  placeholder:text-lg placeholder:font-medium
                  focus:outline-none
                " 
                placeholder="Course ID" 
                type="text"
              >
            </label>
            <button type="button" class="h-11 px-10 py-2 bg-blue-800 text-white font-medium text-lg rounded-lg">Find</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { SideBar } from './ui';
  import dayjs from 'dayjs';

  const user = JSON.parse(localStorage.getItem('user'));
  const todayDate = dayjs(new Date).format('DD.MM.YYYY');

  const router = useRouter();
</script>