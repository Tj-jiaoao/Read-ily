<template>
  <aside class="fixed top-0 right-0 h-full w-96 max-w-full bg-white dark:bg-neutral-900 shadow-lg z-[5000] overflow-y-auto border-l border-gray-200 dark:border-neutral-700 transition-transform duration-300" :class="{ 'translate-x-0': visible, 'translate-x-full': !visible }">
    <div class="flex justify-between items-center p-4 border-b dark:border-neutral-700">
      <h1 class="font-bold text-lg text-gray-800 dark:text-white">Rethink</h1>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <h2 class="font-bold text-md text-gray-700 dark:text-white mt-6 mb-4 px-6">Reread</h2>
    <div class="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100 text-base px-6">
      <div v-if="isGeneratingSummary" class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 dark:border-gray-300"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-400">正在生成摘要...</span>
      </div>
      <div v-else>
        {{ summary }}
      </div>
    </div>
    <h2 class="font-bold text-md text-gray-700 dark:text-white mt-6 mb-4 px-6">Relink</h2>
    <div class="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100 text-base px-6">
      <div v-if="isLoadingRelink" class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 dark:border-gray-300"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-400">正在搜索知识图谱...</span>
      </div>
      <div v-else-if="relinkError" class="text-red-500">
        {{ relinkError }}
      </div>
      <div v-else>
        {{ relinkResult }}
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
      relinkResult: '',
      relinkError: '',
      isLoadingRelink: false
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.fetchRelinkData()
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.fetchRelinkData()
    }
  },
  methods: {
    async fetchRelinkData() {
      this.isLoadingRelink = true
      this.relinkError = ''
      
      try {
        const formData = new FormData()
        formData.append('query', 'Machine')
        formData.append('project_name', 'Deep-Learning')
        
        const response = await fetch('http://localhost:5001/search', {
          method: 'POST',
          headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
          body: formData
        })
        
        if (response.status === 200) {
          const data = await response.json()
          console.log(data)
          this.relinkResult = this.formatRelinkResults(data)
        } else {
          this.relinkError = `请求失败: ${response.status} ${response.statusText}`
        }
      } catch (error) {
        this.relinkError = `网络错误: ${error.message}`
      } finally {
        this.isLoadingRelink = false
      }
    },
    
    formatRelinkResults(data) {
      if (!data.results || !Array.isArray(data.results)) {
        return '暂无搜索结果'
      }
      
      let formattedResult = ''
      
      data.results.forEach((item, index) => {
        formattedResult += `${index + 1}. 【${item.name}】\n`
        formattedResult += `   索引: ${item.index}\n`
        
        // 截取summary的前100个字符，如果超过则添加省略号
        const summary = item.summary.length > 100 
          ? item.summary.substring(0, 100) + '...' 
          : item.summary
        formattedResult += `   摘要: ${summary}\n\n`
      })
      
      return formattedResult.trim()
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
    width: 20rem
}
</style> 