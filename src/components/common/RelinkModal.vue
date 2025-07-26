<template>
  <div v-if="visible" class="fixed inset-0 z-[6000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden border border-gray-200 dark:border-gray-700">
      <!-- 弹窗头部 -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">知识图谱关联</h2>
              <p class="text-green-100 text-sm">基于当前内容的相关知识点</p>
            </div>
          </div>
          <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 弹窗内容 -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <!-- 搜索状态 -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div class="relative">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-200 dark:border-green-700"></div>
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <span class="ml-4 text-green-600 dark:text-green-400 font-medium text-lg">正在搜索知识图谱...</span>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="flex flex-col items-center justify-center py-12 text-red-600 dark:text-red-400">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-medium text-lg mb-2">搜索失败</h3>
          <p class="text-sm text-red-500 dark:text-red-400 text-center">{{ error }}</p>
        </div>

        <!-- 搜索结果 -->
        <div v-else-if="results.length" class="space-y-4">
          <div v-for="(item, idx) in results" :key="item.id" class="group">
            <div class="transition-all duration-300 bg-white dark:bg-neutral-800 border border-green-200 dark:border-green-700 rounded-xl shadow-sm hover:shadow-lg cursor-pointer overflow-hidden" :class="{ 'ring-2 ring-green-400 shadow-lg': expandedIndex === idx }" @click="toggleExpanded(idx)">
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
                  <svg v-if="expandedIndex !== idx" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              
              <!-- 卡片内容 -->
              <div class="px-5 py-4">
                <div class="transition-all duration-300" :class="{ 'line-clamp-3': expandedIndex !== idx }">
                  <div v-if="expandedIndex !== idx" class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
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
        
        <!-- 空状态 -->
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

      <!-- 弹窗底部 -->
      <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
        <button @click="$emit('close')" class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelinkModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expandedIndex: null
    }
  },
  methods: {
    toggleExpanded(idx) {
      if (this.expandedIndex === idx) {
        this.expandedIndex = null;
      } else {
        this.expandedIndex = idx;
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 