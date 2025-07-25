<template>
  <div 
    @click="triggerUpload" 
    class="book-thumbnail add-book cursor-pointer group"
    :style="{ backgroundColor: color }"
  >
    <input 
      type="file" 
      @change="handleFileChange" 
      id="addBookInput" 
      multiple 
      accept=".epub" 
      style="display: none" 
    />
    
    <!-- 书籍封面 -->
    <div class="book-cover relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
      <!-- 加号图标 -->
      <div class="flex flex-col items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-200">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span class="text-sm font-medium">添加书籍</span>
      </div>
      
      <!-- 悬停效果 -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    </div>
    
    <!-- 书籍信息 -->
    <div class="book-info mt-3 px-2">
      <h3 class="text-sm font-semibold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        添加新书
      </h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
        点击上传EPUB文件
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBook',
  props: {
    color: {
      type: String,
      default: '#3B82F6' // 蓝色背景
    }
  },
  methods: {
    triggerUpload() {
      document.getElementById('addBookInput').click();
    },
    handleFileChange(event) {
      this.$emit('upload-books', event);
    }
  }
}
</script>

<style scoped>
.book-thumbnail {
  aspect-ratio: 3/4;
  transition: all 0.3s ease;
}

.book-thumbnail:hover {
  transform: translateY(-2px);
}

.book-cover {
  min-height: 200px;
}

@media (max-width: 640px) {
  .book-cover {
    min-height: 150px;
  }
}
</style> 