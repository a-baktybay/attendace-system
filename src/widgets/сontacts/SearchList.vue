<template>
  <div>
    <div v-if="students.length > 0" class="flex flex-col items-end space-y-5 w-fit">
      <div class="space-y-8 w-full text-left">
          <div class="w-[820px]">
            <div class="grid grid-cols-4 w-full p-3 text-lg font-medium bg-blue-800 text-white rounded-t-md text-center">
              <p>ID Number</p>
              <p class="truncate w-11/12">Name</p>
              <p>Attendance</p>
              <p>Absence</p>
            </div>
            <div
              class="border-2 border-gray-700 border-t-0"
            >
            <div 
                v-for="student in students"
                :key="student.id"
                class="w-full text-center"
              >
              <div class="grid grid-cols-4 h-10 w-full p-3">
                <p>{{ student.id }}</p>
                <p>{{ student.firstname }} {{ student.lastname }}</p>
                <button 
                  type="button" 
                  class="flex justify-center"
                  @click="changeAtt(student.id, true)"
                >
                <div class="border-2" :class="attendanceList[student.id]?.attendance ? 'bg-gray-300' : 'border-transparent'">
                  <img 
                    src="@/assets/images/attend.svg" 
                    alt=""
                    width="20"
                    height="20"
                    class="bg-white rounded-full"
                  >
                </div>
                </button>
                <button 
                  type="button" 
                  class="flex justify-center"
                  @click="changeAtt(student.id, false)"
                >
                <div class="border-2" :class="attendanceList[student.id]?.attendance ? 'border-transparent' : 'bg-gray-300'">
                  <img 
                    src="@/assets/images/abnsence.svg" 
                    alt=""
                    width="20"
                    height="20"
                    class="bg-white rounded-full"
                  >
                </div>  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button 
          type="button" 
          class="h-11 px-5 py-1 bg-blue-800 text-white font-medium rounded-lg"
          @click="takeAttendance"
        >
          submit
      </button>
    </div>
    <ChAlert ref="errorAlertRef">
        <template #default>
          <div class="flex justify-center">
            {{ message }}
          </div>
        </template>
      </ChAlert>
  </div>
</template>

<script setup>
  import { ref, watch, computed } from 'vue';
  import { pfm } from '@/shared/api';
  import { ChAlert } from 'choco-ui';
  const props = defineProps({
    token: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: true
    }
  });

  const students = ref([]);
  const attendanceList = ref({});

  const errorAlertRef = ref();
  const message = ref('');
  
  const getStudents = () => {
    return pfm.teacher
      .getStudents(props.id, props.studentId, props.token)
      .then((data) => {
        students.value = data.data
        data.data.forEach(student => {
          attendanceList.value[student.id] = {
            studentId: student.id,
            attendance: false
          }
        });
      })
      .catch(({response}) => {
        students.value = [];
        message.value = response.data.message;
        errorAlertRef.value.show();
      });
  }

  function changeAtt(id, isAttend) {
    attendanceList.value[id].attendance = isAttend;
  } 

  const takeAttendance = () => {
    const list = Object.keys(attendanceList.value).map(key => attendanceList.value[key]);
    return pfm.teacher
      .takeAttendance(props.id, list, props.token)
      .then(() => {
        message.value = 'success';
        errorAlertRef.value.show();
      })
      .catch(({response}) => {
        message.value = response.data.message;
        errorAlertRef.value.show();
      });
  }

  watch(computed(() => props.studentId), () => {
    if (props.studentId.length > 5) {
      getStudents();
    }
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