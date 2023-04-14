<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <main class="flex-grow py-10 px-5">
      <div class="w-full space-y-2 pb-20 text-right">
        <p>full name : {{ user.username }}</p>
        <p>ID number : {{ user.id }}</p>
        <p>today date: {{ todayDate }}</p>
      </div>
      <div class="pl-24 space-y-8">
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
                @input="courseId = $event.target.value"
              >
            </label>
            <button 
              type="button" 
              class="h-11 px-10 py-2 bg-blue-800 text-white font-medium text-lg rounded-lg"
              @click="getStudents"
            >
              Find
            </button>
          </div>
        </div>
        <div v-if="students.length > 0" class="space-y-4 w-[820px] border-2 border-gray-700 rounded-t-md border-t-transparent">
          <div class="grid grid-cols-5  w-full bg-blue-800 text-white p-3 rounded-t-md">
            <p>№</p>
            <p>ID Number</p>
            <p>Student Name</p>
            <p>Attendance</p>
            <p>Absence</p>
          </div>
          <button 
            v-for="(student, idx) in students" 
            :key="student.id"
            class="grid grid-cols-5 w-full p-3 text-left"
          >
            <p>{{ idx + 1 }}</p>
            <p>{{ student.id }}</p>
            <p class="truncate w-11/12">{{ student.firstname }} {{ student.lastname }}</p>
            <p>{{ student.numAttendance }}</p>
            <p>{{ student.numAbsence }}</p>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { SideBar } from './ui';
  import dayjs from 'dayjs';
  import { pfm } from '@/shared/api';


  const user = JSON.parse(localStorage.getItem('user'));
  const todayDate = dayjs(new Date).format('DD.MM.YYYY');

  const router = useRouter();

  const courseId = ref('');
  const students = ref([]);

  const token = computed(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.token;
  });

  function getStudents() {
    pfm.admin
      .getStudents(courseId.value, token.value)
      .then(({ data }) => {
        students.value = data;
        return data;
      });
  }
</script>