<template>
  <aside class="fixed top-0 right-0 h-full w-96 max-w-full bg-white dark:bg-neutral-900 shadow-lg z-[5000] overflow-y-auto border-l border-gray-200 dark:border-neutral-700 transition-transform duration-300" :class="{ 'translate-x-0': visible, 'translate-x-full': !visible }">
    <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-neutral-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-xl text-gray-800 dark:text-white">Rethink</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">智能阅读助手</p>
        </div>
      </div>
      <button @click="$emit('close')" class="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Reread Section -->
    <div class="px-6 py-4">
      <div class="flex items-center space-x-2 mb-4">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 class="font-bold text-lg text-gray-800 dark:text-white">Reread</h2>
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
        <div v-if="isGeneratingSummary" class="flex items-center justify-center py-8">
          <div class="relative">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 dark:border-blue-700"></div>
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <span class="ml-4 text-blue-600 dark:text-blue-400 font-medium">正在生成摘要...</span>
        </div>
        <div v-else class="prose prose-sm max-w-none">
          <p class="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
            {{ summary || '暂无摘要内容' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Relink Section -->
    <div class="px-6 py-4">
      <div class="flex items-center space-x-2 mb-4">
        <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h2 class="font-bold text-lg text-gray-800 dark:text-white">Relink</h2>
      </div>
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/30">
        <div v-if="isLoadingRelink" class="flex items-center justify-center py-8">
          <div class="relative">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-green-200 dark:border-green-700"></div>
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <span class="ml-4 text-green-600 dark:text-green-400 font-medium">正在搜索知识图谱...</span>
        </div>
        <div v-else-if="relinkError" class="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ relinkError }}</span>
        </div>
        <div v-else>
          <div v-if="relinkResult.length" class="space-y-4">
            <div v-for="(item, idx) in relinkResult" :key="item.id" class="group">
              <div class="transition-all duration-300 bg-white dark:bg-neutral-800 border border-green-200 dark:border-green-700 rounded-xl shadow-sm hover:shadow-lg cursor-pointer overflow-hidden" :class="{ 'ring-2 ring-green-400 shadow-lg': isRelinkCardExpanded(idx) }" @click="toggleRelinkCard(idx)">
                <!-- 卡片头部 -->
                <div class="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-100 dark:border-green-700/30">
                  <div class="flex items-center space-x-3">
                    <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white font-bold text-sm shadow-sm">
                      {{ idx + 1 }}
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-base leading-tight">{{ item.name }}</h3>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">索引 #{{ item.index }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <svg v-if="!isRelinkCardExpanded(idx)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </div>
                
                <!-- 卡片内容 -->
                <div class="px-5 py-4">
                  <div class="transition-all duration-300" :class="{ 'line-clamp-3': !isRelinkCardExpanded(idx) }">
                    <div v-if="!isRelinkCardExpanded(idx)" class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                      <span class="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      {{ item.summary.length > 120 ? item.summary.substring(0, 120) + '...' : item.summary }}
                    </div>
                    <div v-else class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed space-y-3">
                      <div class="flex items-start space-x-2">
                        <span class="inline-block w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        <p class="flex-1">{{ item.summary }}</p>
                      </div>
                      <div class="flex items-center space-x-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span>相关知识点</span>
                        </div>
                        <div class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>索引 {{ item.index }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="font-medium text-lg mb-2">暂无相关知识点</h3>
            <p class="text-sm text-gray-400 dark:text-gray-500 text-center">当前内容暂未找到匹配的知识点</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'CommonSidebar',
  props: {
    text: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    isGeneratingSummary: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      relinkResult: [], // 现在是数组
      relinkError: '',
      isLoadingRelink: false,
      expandedRelinkIndex: [] // 控制展开项
    }
  },
  watch: {
    // visible(newVal) {
    //   // 移除自动调用fetchRelinkData
    // }
  },
  mounted() {
    // 移除自动调用fetchRelinkData
  },
  methods: {
    // 接收bookreader传递的搜索结果
    updateRelinkResults(data) {
      this.isLoadingRelink = false
      this.relinkError = ''
      if (data && data.results) {
        this.relinkResult = this.formatRelinkResults(data)
      } else {
        this.relinkResult = []
      }
    },
    // 设置加载状态
    setRelinkLoading(loading) {
      this.isLoadingRelink = loading
      if (loading) {
        this.relinkError = ''
      }
    },
    // 设置错误状态
    setRelinkError(error) {
      this.isLoadingRelink = false
      this.relinkError = error
    },
    formatRelinkResults(data) {
      if (!data.results || !Array.isArray(data.results)) {
        return []
      }
      return data.results.map((item, index) => ({
        name: item.name,
        index: item.index,
        summary: item.summary,
        id: index
      }))
    },
    toggleRelinkCard(idx) {
      const i = this.expandedRelinkIndex.indexOf(idx)
      if (i > -1) {
        this.expandedRelinkIndex.splice(i, 1)
      } else {
        this.expandedRelinkIndex.push(idx)
      }
    },
    isRelinkCardExpanded(idx) {
      return this.expandedRelinkIndex.includes(idx)
    }
  }
}
</script>

<style scoped>
.translate-x-full {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}
.w-96 {
  width: 20rem;
}

/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

/* 暗色模式滚动条 */
.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.3);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.5);
}

/* 渐变背景动画 */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 