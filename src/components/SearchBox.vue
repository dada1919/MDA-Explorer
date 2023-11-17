<template>
  <div class="search-box">
    <div class="search-box__content">
      <input placeholder="Search for miRNA or disease..." />
    </div>
    <div class="search-box__divider"></div>
    <div class="search-box__action">
      <button>
        <div class="mx-auto i-tabler:search"></div>
      </button>
    </div>
  </div>
</template>
<style scoped>
.search-box {
  @apply flex items-center bg-white rounded-sm shadow-md;
  @apply font-sans;
  width: 20ch;
  /* height: 100%; */
}

.search-box__content {
  @apply flex-1 px-4 flex justify-center items-center;
}

.search-box__content input {
  @apply w-full;
  border: none;
  outline: none;
}

.search-box__divider {
  @apply w-0.5 h-5 bg-gray-200;
}

.search-box__action {
  @apply flex items-center justify-center;
  @apply transition-all duration-300;
  width: 2rem;
  height: 2rem;
}

.search-box__action:hover {
  @apply bg-gray-200;
}

.search-box__action button {
  @apply w-full h-full;
  border: none;
  outline: none;
  background: none;
}
</style>
