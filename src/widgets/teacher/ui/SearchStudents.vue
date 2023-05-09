<template>
  <main>
    <div class="flex space-x-4 items-center">
      <label class="flex items-center border border-blue-800 space-x-4 w-96 p-3 bg-gray-200 rounded-lg">
        <img
          src="@/assets/images/search-icon.svg" 
          alt=""
          width="32"
          height="32"
        >
        <input 
          class="
            bg-transparent placeholder:text-gray-700 
            placeholder:text-lg placeholder:font-medium
            focus:outline-none
          " 
          type="text"
          placeholder="student ID" 
          @input="id = $event.target.value"
        >
      </label>      
      <button 
        type="button" 
        class="h-11 px-10 py-2 bg-blue-800 text-white font-medium text-lg rounded-lg"
        @click="$emit('onSearch', id)"
      >
        Find
      </button>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  
  const id = ref('');

  function find() {
    emit('onSearch')
  }
</script>