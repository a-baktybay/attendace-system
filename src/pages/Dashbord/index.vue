<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <main class="flex-grow py-10 px-5">
      <div class="w-full space-y-2 text-right">
        <p>full name : {{ user.username }}</p>
        <p>ID number : {{ user.id }}</p>
        <p>today date: {{ todayDate }}</p>
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