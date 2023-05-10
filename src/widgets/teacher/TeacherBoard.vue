<template>
  <div class="space-y-8">
    <template v-if="pageName === 'schedule'">
      <Schedule v-if="schedule.length > 0" :subjects="schedule" />
    </template>
    <template v-else-if="pageName === 'contacts'">
      <ContactsBoard />
    </template>
    <template v-else>
      <div class="space-y-10">
        <SearchStudents @onSearch="studentID = $event"/>
        <SearchList 
          :token="token" 
          :id="id"
          :student-id="studentID"
        />
      </div>
    </template>
  </div>
</template>


<script setup>
  import { onMounted, ref } from 'vue';
  import { pfm } from '@/shared/api';
  import { ContactsBoard } from '../сontacts';
  import { 
    Schedule, 
    SubjectList, 
    SearchStudents,
    SearchList
  } from './ui';
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
  const studentID = ref('');

  function getSchedule () {
    return pfm.teacher  
      .getSchedule(props.id, props.token)
      .then(({ data }) => schedule.value = data);
  }

  onMounted(() => {
    getSchedule();
  });
</script>