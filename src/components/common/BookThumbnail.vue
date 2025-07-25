<template>
  <div class="book-container">
    <div
      class="book-item group overflow-hidden relative hover:cursor-pointer hover:shadow-lg transition-shadow rounded-r-lg hover:bg-black/30"
      @click="$emit('open-book', book.fileName)"
      :style="{backgroundColor: book.color}"
    >
      <div class="hover:bg-black/20 transition duration-200">
        <div class="default-cover w-full aspect-[3/4.5] rounded-r-lg flex flex-col overflow-hidden bg-gradient-to-b from-transparent to-black/20">
          <div class="p-4">
            <h2 class="font-semibold text-xl tracking-snug leading-snug text-white">{{ truncatedTitle }}</h2>
            <p v-if="book.author && book.author !== 'Unknown Author'" class="text-xl tracking-snug leading-snug font-semibold text-black">{{ book.author }}</p>
          </div>
        </div>
        <button
          @click.stop="$emit('delete-book', book.fileName)"
          class="opacity-0 group-hover:opacity-100 transition duration-200 delete-icon absolute bottom-2 right-2 p-2 rounded-full bg-white hover:bg-white/50"
        >
          Delete
        </button>
      </div>
    </div>
    
    <!-- 阅读进度条 -->
    <div class="progress-container mt-3 px-2">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-gray-600 dark:text-gray-400 font-medium">阅读进度</span>
        <span class="text-xs text-gray-500 dark:text-gray-500">{{ readingProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          class="progress-bar h-full rounded-full transition-all duration-500 ease-out"
          :style="{ 
            width: readingProgress + '%',
            backgroundColor: book.color 
          }"
        ></div>
      </div>
      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-gray-500 dark:text-gray-500">{{ lastReadTime }}</span>
        <span v-if="readingProgress > 0" class="text-xs text-green-600 dark:text-green-400 font-medium">
          {{ getProgressText() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookThumbnail',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      readingProgress: 0,
      lastReadTime: '未开始'
    }
  },
  computed: {
    truncatedTitle() {
      if (this.book.title) {
        const colonIndex = this.book.title.indexOf(':');
        return colonIndex !== -1 ? this.book.title.slice(0, colonIndex).trim() : this.book.title;
      }
      return 'Untitled';
    }
  },
  mounted() {
    this.loadReadingProgress();
    // 监听进度更新事件
    window.addEventListener('reading-progress-updated', this.handleProgressUpdate);
  },
  
  beforeUnmount() {
    window.removeEventListener('reading-progress-updated', this.handleProgressUpdate);
  },
  methods: {
    loadReadingProgress() {
      try {
        // 从localStorage获取阅读进度
        const readingKey = `reading-progress-${this.book.fileName}`;
        const readingData = localStorage.getItem(readingKey);
        
        if (readingData) {
          const data = JSON.parse(readingData);
          this.readingProgress = data.progress || 0;
          this.lastReadTime = this.formatLastReadTime(data.timestamp);
        }
      } catch (error) {
        console.error('加载阅读进度失败:', error);
      }
    },
    
    formatLastReadTime(timestamp) {
      if (!timestamp) return '未开始';
      
      try {
        const lastTime = new Date(timestamp);
        const now = new Date();
        const diff = now - lastTime;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
          return `${days}天前`;
        } else if (hours > 0) {
          return `${hours}小时前`;
        } else if (minutes > 0) {
          return `${minutes}分钟前`;
        } else {
          return '刚刚';
        }
      } catch (error) {
        return '未知时间';
      }
    },
    
    getProgressText() {
      if (this.readingProgress === 0) return '';
      if (this.readingProgress < 25) return '刚开始';
      if (this.readingProgress < 50) return '进行中';
      if (this.readingProgress < 75) return '过半了';
      if (this.readingProgress < 100) return '快完成了';
      return '已完成';
    },
    
    handleProgressUpdate(event) {
      if (event.detail && event.detail.fileName === this.book.fileName) {
        this.loadReadingProgress();
      }
    }
  }
}
</script>

<style scoped>
.book-container {
  display: flex;
  flex-direction: column;
}

.progress-container {
  min-height: 60px;
}

.progress-bar {
  position: relative;
  overflow: hidden;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 只在有进度时显示动画 */
.progress-bar[style*="width: 0%"]::after {
  display: none;
}
</style>