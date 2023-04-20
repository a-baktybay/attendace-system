<template>
  <div class="space-y-8 w-full text-left">
       <div v-if="courses.length > 0" class="w-[820px]">
         <div class="grid grid-cols-5 w-full p-3 text-left text-lg font-medium bg-blue-800 text-white rounded-t-md">
           <p>№</p>
           <p>Course ID</p>
           <p class="truncate w-11/12">Course Name</p>
           <p>Attendance</p>
           <p>Absence</p>
         </div>
        <div class="border-2 border-gray-700 border-t-0">
         <button 
           v-for="(student, idx) in courses" 
           :key="student.id"
           class="w-full"
           @click="activeCourse = student.id"
         >
          <div class="grid grid-cols-5 w-full p-3 text-left text-lg font-medium">
            <p>{{ idx + 1 }}</p>
            <p>{{ student.courseCode }}</p>
            <p class="truncate w-11/12">course name</p>
            <p>{{ student.numAttendance }}</p>
            <p>{{ student.numAbsence }}</p>
          </div>
          <div v-if="activeCourse === student.id" class="py-4 space-y-2 divide-y-2 w-full bg-gray-200 divide-black text-black text-lg font-medium">
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
              >
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
              </button>
            </div>
          </div>
         </button>
        </div>
       </div>
     </div>
</template>

<script setup>
 import { onMounted, ref } from 'vue';
 import { pfm } from '@/shared/api';
 import dayjs from 'dayjs';

 import { MiniLoader } from '@/shared/ui';

 const props = defineProps({
   token: {
     type: String,
     required: true
   },
   id: {
    type: String,
    required: true
   }
 });

 const activeCourse = ref('');

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

 function getAttendanceList() {
   return pfm.student
     .getListOfAttendanceByCourse(props.id, props.token)
     .then(({ data }) => {
        courses.value = data;
       return data;
     })
 }

 const courses = ref([]);

 onMounted(() => {
  getAttendanceList();
 });
</script>