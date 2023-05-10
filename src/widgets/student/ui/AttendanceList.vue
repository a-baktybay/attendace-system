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
           v-for="(course, idx) in courses" 
           :key="idx"
           class="w-full"
           @click="activeCourse = course.courseCode"
         >
          <div class="grid grid-cols-5 w-full p-3 text-left text-lg font-medium">
            <p>{{ idx + 1 }}</p>
            <p>{{ course.courseCode }}</p>
            <p class="truncate w-11/12">{{ course.courseName }}</p>
            <p>{{ course.attendanceNum }}</p>
            <p>{{ course.absenceNum  }}</p>
          </div>
          <div v-if="activeCourse === course.courseCode" class="py-4 px-3 space-y-2 divide-y-2 w-full bg-gray-200 text-lg font-medium  overflow-x-auto">
            <div class="flex space-x-5">
              <p 
                v-for="date in course.attendanceList" 
                :key="date.id"
                class="w-12 shrink-0"
              >
                {{ dayjs(date.time).format('DD.MM')  }}
              </p>
            </div>
            <div class="flex space-x-5">
              <p 
                v-for="date in course.attendanceList" 
                :key="date.id"
                class="w-12 shrink-0"
              >
                {{ date.subjectHour  }}
              </p>  
            </div>
            <div 
              class="flex space-x-5 py-2"
            >
              <button 
                v-for="date, idx in course.attendanceList" 
                :key="`${date.id}${idx}`"
                type="button" 
                class="relative w-12 h-7 flex justify-center items-center shrink-0"
                @mouseover="hoveredButton=date.id"
                @mouseleave="hoveredButton=''"
              > 
                <MiniLoader v-if="isChanging" />
                <template v-else>
                  <img 
                    v-if="getIconType(date.attendance, date.attendanceType) === 'CARD'"
                    src="@/assets/images/card.svg" 
                    alt=""
                    width="28"
                    height="28"
                  >
                  <img 
                    v-else-if="getIconType(date.attendance, date.attendanceType) === 'red-bird'"
                    src="@/assets/images/abnsence.svg" 
                    alt=""
                    width="28"
                    height="28`"
                  >
                  <img
                    v-else-if="getIconType(date.attendance, date.attendanceType) === 'bird'"
                    src="@/assets/images/attend.svg" 
                    alt=""
                    width="28"
                    height="28"
                  >
                  <p v-if="hoveredButton === date.id" class="absolute left-7 top-6 z-10 bg-white w-56 shrink-0">
                    {{ date.putedByInfo }} : {{ date.putedByRole   }}
                  </p>
                </template>
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
 const hoveredButton = ref('');
 const isChanging = ref(false);

 function getIconType(isAttend, type) {
   if (isAttend && type === 'CARD') {
     return 'CARD';
   }
   return isAttend ? 'bird' : 'red-bird';
 }

 function getSortedList(list) {
   return list.sort((a,b) => comparator(dayjs(a.time).format('DD.MM'), dayjs(b.time).format('DD.MM')))
 }

function sortAttendance(list) {
  return list.sort((a, b) => b.absenceNum - a.absenceNum);
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
       courses.value = sortAttendance(data);
       return data;
     })
     .finally(() => isChanging.value = false);
 }

 const courses = ref([]);

 function changeAttendance(attendance) {
    const payload = {
      ...attendance,
      attendance: !attendance.attendance,
      attendanceType: 'PORTAL'
    }
    isChanging.value = true;
    return pfm.student
      .changeAttendance(attendance.studentId, props.token, payload)
      .then(({data}) => {
        if (data.message) {
          alert(data.message);
          isChanging.value = false;
        } else {
          getAttendanceList();
        }
      })        
 }

 onMounted(() => {
  getAttendanceList();
 });
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>