<template>
  <div class="pl-24 space-y-8">
    <SubjectList v-if="schedule.length > 0" :subjects="schedule"/>
    <Schedule v-if="schedule.length > 0" :subjects="schedule" />
  </div>
</template>


<script setup>
  import { onMounted, ref } from 'vue';
  import { pfm } from '@/shared/api';
  import { Schedule, SubjectList } from './ui';
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