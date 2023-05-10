<template>
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
            class="w-full"
            @click="activeStudent = student.id"
          >
          <div class="grid grid-cols-5 w-full p-3 text-left text-lg font-medium">
            <p>{{ idx + 1 }}</p>
            <p>{{ student.id }}</p>
            <p class="truncate w-11/12">{{ student.firstname }} {{ student.lastname }}</p>
            <p>{{ student.numAttendance }}</p>
            <p>{{ student.numAbsence }}</p>
          </div>
          <div v-if="activeStudent === student.id" class="py-4 space-y-2 divide-y-2 w-full bg-gray-200 divide-black text-black text-lg font-medium">
            <div class="flex space-x-5 px-3 ">
              <p 
                v-for="date in student.attendanceList" 
                :key="date.time"
                class="w-12"
              >
              {{ dayjs(date.time).format('DD.MM')  }}
            </p>
            </div>
            <div 
              class="flex space-x-5 px-3 py-2"
            >
              <button 
                v-for="date in getSortedList(student.attendanceList)" 
                :key="date.time"
                type="button" 
                class="w-12 flex justify-center items-center"
                @click.stop="changeAttendance(student.id,date.id, !date.attendance)"
              >
              <svg v-if="isChanging" class="h-7 w-7 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line
                  x1="195.9"
                  y1="60.1"
                  x2="173.3"
                  y2="82.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line
                  x1="195.9"
                  y1="195.9"
                  x2="173.3"
                  y2="173.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line
                  x1="60.1"
                  y1="195.9"
                  x2="82.7"
                  y2="173.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line
                  x1="60.1"
                  y1="60.1"
                  x2="82.7"
                  y2="82.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"></line>
              </svg>
              <template v-else>
                <img 
                  v-if="getIconType(date.attendance, date.attendanceType) === 'CARD'"
                  src="@/assets/images/card.svg" 
                  alt=""
                  width="28"
                  height="28"
                >
                <img
                  v-else-if="getIconType(date.attendance, date.attendanceType) === 'bird'"
                  src="@/assets/images/attend.svg" 
                  alt=""
                  width="28"
                  height="28"
                >
                <img 
                  v-else
                  src="@/assets/images/abnsence.svg" 
                  alt=""
                  width="28"
                  height="28`"
                >
              </template>
              </button>
            </div>
          </div>
          </button>
        </div>
      </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { pfm } from '@/shared/api';
  import dayjs from 'dayjs';

  const props = defineProps({
    token: {
      type: String,
      required: true
    }
  });

  const activeStudent = ref('');

  function getIconType(isAttend, type) {
    if (isAttend && type === 'CARD') {
      return 'CARD';
    }
    return isAttend ? 'bird' : 'red-bird';
  }

  function getSortedList(list) {
    return list.sort((a,b) => comparator(dayjs(a.time).format('DD.MM'), dayjs(b.time).format('DD.MM')))
  }

  function comparator(a,b) {
    const q = a.split('.');
    const w = b.split('.');

    if (Number(q[1]) > Number(w[1])) {
      return 1;
    } else if (Number(q[1]) === Number(w[1])){
      return Number(q[0]) > Number(w[0]) ? 1 : -1;
    } else {
      return -1
    }
  }

  function sortAttendance(list) {
  return list.sort((a, b) => b.numAbsence - a.numAbsence);
}

  function getStudents() {
    return pfm.admin
      .getStudents(courseId.value, props.token)
      .then(({ data }) => {
        students.value = sortAttendance(data);
        console.log(sortAttendance(data));
        return data;
      })
      .finally(() => isChanging.value = false);
  }

  function changeAttendance(studentId, timeId, value) {
    isChanging.value = true;
    pfm.admin
      .changeAttendance(studentId, timeId, value, props.token)
      .then(() => {
        getStudents()
      })
      .finally(() => {
        isChanging.value = false;
      });      
  }

  const isChanging = ref(false);

  const courseId = ref('');
  const students = ref([]);
</script>