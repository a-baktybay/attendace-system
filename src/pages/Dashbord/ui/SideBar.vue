<template>
  <div class="flex flex-col items-center relative py-16 w-60 bg-white border-r-2 border-gray-200">
    <div class="space-y-7 px-7">
      <section>
        <img 
        src="@/assets/images/happy-logo.png" 
        alt=""
        width="245"
        height="91"
        >
      </section>
      <nav class="flex flex-col space-y-4">
        <button 
          type="button" 
          class="py-3 px-8 rounded-lg text-lg font-medium"
          :class="pageName === 'attendance' ? 'text-white bg-blue-800' : 'text-gray-500 opacity-50'"
          @click="$emit('onPageChange', 'attendance')"
        >
          Attendance
        </button>
        <button
          v-if="roles.includes('ROLE_STUDENT') || roles.includes('ROLE_TEACHER')"
          type="button" 
          class="py-3 px-8 rounded-lg text-lg font-medium"
          :class="pageName === 'schedule' ? 'text-white bg-blue-800' : 'text-gray-500 opacity-50'"
          @click="$emit('onPageChange', 'schedule')"
        >
          Schedule
        </button>
        <button class="text-gray-500 opacity-50">
          Contacts
        </button>
      </nav>
    </div>
    <div class="">
      <button
        type="button"
        class="flex space-x-4 text-gray-400 text-lg fixed bottom-10 w-28 left-14"
        @click="logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#6D7C90" d="M16.8 2h-2.6C11 2 9 4 9 7.2v4.05h6.25c.41 0 .75.34.75.75s-.34.75-.75.75H9v4.05C9 20 11 22 14.2 22h2.59c3.2 0 5.2-2 5.2-5.2V7.2C22 4 20 2 16.8 2ZM4.56 11.25l2.07-2.07c.15-.15.22-.34.22-.53s-.07-.39-.22-.53a.754.754 0 0 0-1.06 0l-3.35 3.35c-.29.29-.29.77 0 1.06l3.35 3.35c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-2.07-2.07H9v-1.5H4.56Z"/></svg>
        <p>Logout</p>
     </button>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const props = defineProps({
    roles: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  });

  const router = useRouter();

  const logout = () => {
    localStorage.setItem('user', '')
    router.replace({ name: 'MainPage' });
  }
</script>


<script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SideBar'
  });
</script>