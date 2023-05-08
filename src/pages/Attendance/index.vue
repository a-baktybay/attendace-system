<template>
  <main class="flex flex-col items-center justify-center h-screen w-screen space-y-10">
    <div class="flex items-center justify-center border-y-8 border-blue-800 w-full h-60">
      <img 
        src="@/assets/images/happy-logo.png" 
        alt=""
        width="425"
        height="159"
      >
    </div> 
    <div class="flex flex-col space-y-4">
      <input
        type="text" 
        placeholder="ID number"
        class="p-4 w-80 bg-gray-100 rounded-lg placeholder:text-gray-500 focus:outline-none"
      >
      <button
        type="submit"
        class="self-end w-full py-2 rounded-lg text-2xl text-white bg-blue-800"
      >
        Put
      </button>
    </div>
  </main>
</template>