<template>
  <div class="flex flex-col items-center space-y-7 pt-16 h-full w-60 bg-white border-r-2 border-gray-200">
    <section>
      <img 
        src="@/assets/images/happy-logo.png" 
        alt=""
        width="245"
        height="91"
      >
    </section>
    <nav class="flex flex-col space-y-4">
      <button type="button" class="py-3 px-8 rounded-lg text-lg font-medium text-white bg-blue-800">
        Attendance
      </button>
      <button>
        Contacts
      </button>
    </nav>
  </div>
</template>


<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SideBar'
  });
</script>