<template>
  <div class="w-[825px] box-border">
    <div class="grid grid-cols-7 items-center justify-items-center rounded-t-md bg-blue-800 text-white font-medium text-lg h-16">
      <p></p>
      <p>Monday</p>
      <p>Tuesday</p>
      <p>Wednesday</p>
      <p>Thursday</p>
      <p>Friday</p>
      <p>Saturday</p>
    </div>
    <div class="grid schedule">
      <div class="grid grid-rows-[11] truncate items-center border-l border-black w-full">
        <p class="h-16 border-b flex items-center justify-center border-black">9:00-9:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">10:00-10:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">11:00-11:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">12:00-12:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">13:00-13:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">14:00-14:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">15:00-15:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">16:00-16:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">17:00-17:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">18:00-18:50</p>
        <p class="h-16 border-b flex items-center justify-center border-black">19:00-19:50</p>
      </div>
      <div class="grid grid-cols-6 border-x border-black">
          <div 
            v-for="sub, idx in schedule" 
            :key="idx" 
            class="
              flex justify-center truncate items-center 
              border-b border-r border-black w-full 
              h-16 font-medium text-blue-800
            "
          >
            {{ sub }}
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

  const props = defineProps({
    subjects: {
      type: Object,
      required: true
    }
  });

  const dayToId = {
    'MONDAY': 0,
    'TUESDAY': 1,
    'WEDNESDAY': 2,
    'THURSDAY': 3,
    'FRIDAY': 4,
    'SATURDAY': 5
  }

  const timeToId = {
    '9': 0,
    '10': 1,
    '11': 2,
    '12': 3,
    '13': 4,
    '14': 5,
    '15': 6,
    '16': 7,
    '17': 8,
    '18': 9,
    '19': 10,
  }

  const schedule = ref([
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', '',
    '', '', '', '', '', ''
  ]);

  function parseSubjects() {
    props.subjects.forEach(sub => {
      const time = timeToId[sub.time.split(":")[0]];
      const day = dayToId[sub.weekDay];
      console.log(time, day);
      schedule.value[(6*time) + day] = sub.name;
    });
  } 

  onMounted(() => {
    parseSubjects();
  });
</script>

<style scope>
.schedule {
  grid-template-columns: 1fr 6fr;
}
</style>