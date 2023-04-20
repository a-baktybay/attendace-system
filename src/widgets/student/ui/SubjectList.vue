<template>
  <div class="w-[825px] box-border">
    <div class="subject-list-title items-center px-4 text-lg font-medium rounded-t-md text-white h-16 bg-blue-800">
      <p>№</p>
      <p>Course ID</p>
      <p>Course Name</p>
      <p>Teacher</p>
    </div>
    <div class="w-full border border-black border-t-0">
      <div
        v-for="sub, idx in subjects"
        :key="sub.id"
        class="px-4 subject-list-title items-center text-lg font-medium h-10"
      >
        <p>{{ idx + 1 }}</p>
        <p>{{ sub.courseCode }}</p>
        <p>{{ sub.name }}</p>
        <p>{{ sub.teacherId }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
    subjects: {
      type: Object,
      required: true
    }
  });
</script>

<style scoped>
  .subject-list-title {
    display: grid;
    grid-template-columns: 1fr 2fr 3fr 3fr;
  }
</style>