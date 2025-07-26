<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 动态渐变色背景 -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient">
      <div class="absolute inset-0 bg-black/20"></div>
    </div>
    
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- 导航栏 -->
      <nav class="flex justify-between items-center px-8 py-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white">Read-ily</h1>
        </div>
        <router-link to="/home" class="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/30 transition-all duration-300 border border-white/30">
          Quick Start
        </router-link>
      </nav>

      <!-- 主标题区域 -->
      <div class="flex-1 flex flex-col justify-center items-center text-center px-8">
        <h1 class="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Read-ily
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl leading-relaxed">
          We make reading <span class="font-semibold">Read-ily</span> yours.<br>
          ReLink, then ReMesh. Redefining how we acquire knowledge.
        </p>
        
        <!-- 特色功能展示 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mt-16">
          <!-- ReMind -->
          <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">ReMind</h3>
            <p class="text-white/80 leading-relaxed">
              Smart reading assistant that tracks your progress and provides intelligent context summaries when you return to your books.
            </p>
          </div>

          <!-- ReSearch -->
          <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">ReSearch</h3>
            <p class="text-white/80 leading-relaxed">
              AI-powered reading expansion engine that asks thought-provoking questions to help you reflect and truly understand what you've read.
            </p>
          </div>

          <!-- ReCap -->
          <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">ReCap</h3>
            <p class="text-white/80 leading-relaxed">
              Interactive chapter quizzes that help you review key points and enhance memory retention, making reading more engaging and effective.
            </p>
          </div>

          <!-- ReLink -->
          <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">ReLink</h3>
            <p class="text-white/80 leading-relaxed">
              Automatically identifies and connects related knowledge points, building a structured network of your personal knowledge base.
            </p>
          </div>

          <!-- ReMesh -->
          <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">ReMesh</h3>
            <p class="text-white/80 leading-relaxed">
              Visual knowledge network that transforms your reading notes into an intuitive, evolving personal knowledge system.
            </p>
          </div>
        </div>

        <!-- CTA按钮 -->
        <div class="mt-16">
          <router-link to="/home" class="inline-flex items-center px-12 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
            <span>Start Your Reading Journey</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- 贡献人信息 -->
      <footer class="py-8 px-8 text-center">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <p class="text-white/80 text-sm leading-relaxed">
            <span class="font-medium">Implemented by Ao Jiao.</span><br>
            <span class="font-medium">Empowered using Graphitti API by Jiarui Han.</span><br>
            <span class="font-medium">Designed by Qisen Pan and Yihang Fu</span><br>
            <span class="text-white/60">in Hangzhou AdventureX2025</span>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.animate-gradient {
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style> 