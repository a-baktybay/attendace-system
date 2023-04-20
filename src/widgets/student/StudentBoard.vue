<template>
  <div class="space-y-8">
    <template v-if="pageName === 'schedule'">
      <SubjectList v-if="schedule.length > 0" :subjects="schedule"/>
      <Schedule v-if="schedule.length > 0" :subjects="schedule" />
    </template>
    <template v-else>
      <AttendanceList :id="id" :token="token"/>
    </template>
  </div>
</template>


<script setup>
  import { onMounted, ref } from 'vue';
  import { pfm } from '@/shared/api';
  import { Schedule, SubjectList, AttendanceList } from './ui';
  const props = defineProps({
    token: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  });

  const schedule = ref([]);

  function getSchedule () {
    return pfm.student
      .getSchedule(props.id, props.token)
      .then(({ data }) => schedule.value = data);
  }

  onMounted(() => {
    getSchedule();
  });
</script>