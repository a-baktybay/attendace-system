<template>
  <div class="flex min-h-screen w-screen">
    <SideBar />
    <main class="flex-grow py-10 px-5">
      <div class="w-full space-y-2 pb-20 text-right">
        <p>full name : {{ user.username }}</p>
        <p>ID number : {{ user.id }}</p>
        <p>today date: {{ todayDate }}</p>
      </div>
      <AdminBoard v-if="user.roles.includes('ROLE_ADMIN')" :token="token"/>
      <StudentBoard 
        v-if="user.roles.includes('ROLE_STUDENT')" 
        :token="token"
        :id="user.id"
      />
    </main>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { SideBar } from './ui';
  import dayjs from 'dayjs';
  import { AdminBoard } from '@/widgets/admin';
  import { StudentBoard } from '@/widgets/student';

  const user = JSON.parse(localStorage.getItem('user'));
  const todayDate = dayjs(new Date).format('DD.MM.YYYY');

  const router = useRouter();

  const token = computed(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.token;
  });
</script>