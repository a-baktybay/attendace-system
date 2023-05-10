<template>
  <div class="flex flex-col space-y-4 w-fit">
    <main>
      <div class="w-[930px] h-14 border border-blue-800 border-b-0">
        <input placeholder="write to..." type="text" class="w-full h-full bg-gray-100 px-3">
      </div>
      <div class="w-[930px] h-[440px] border border-blue-800">
        <textarea class="w-full h-full bg-gray-100 p-3" placeholder="Describe the problem"></textarea>
      </div>
      <div class="flex space-x-5 py-3 px-3 rounded-b-md w-full bg-blue-800 opacity-50">
        <button type="button">
          <img src="@/assets/images/bold.svg" width="16" height="16" alt="">
        </button>
        <button type="button">
          <img src="@/assets/images/italic.svg" width="16" height="16" alt="">
        </button>
        <button type="button">
          <img src="@/assets/images/img.svg" width="16" height="16" alt="">
        </button>
      </div>
    </main>
    <button 
      type="button" 
      class="self-end w-[135px] h-11 px-5 py-1 bg-blue-800 text-white font-medium rounded-lg"
    >
      submit
    </button>
  </div>
</template>