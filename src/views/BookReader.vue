<template>
    <header class=" sticky top-0 z-[3000] w-full bg-white/90  backdrop-blur-md text-sm py-5   dark:bg-black/80">
    <nav class="flex items-center justify-between px-5" aria-label="Global">
      <div class="flex items-center gap-4">

        <button @click="goHome" class="bg-[url('assets/img/grid.svg')] dark:bg-[url('assets/img/grid-white.svg')] bg-no-repeat text-transparent w-[20px] h-[20px]">Home</button>
        <div id="book-title" class="font-bold text-lg"></div>
        
      </div>
      <div class="flex items-center gap-2">
        <button class="toc bg-[url('assets/img/list.svg')] dark:bg-[url('assets/img/list-white.svg')] bg-no-repeat text-transparent w-[20px] h-[20px]" data-hs-overlay="#hs-overlay-right"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
</svg>
</button> 
        <button @click="openSidebarWithSummary" class="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center" title="AI Summary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </button>
        <button @click="generateQuiz" class="ml-2 p-2 rounded-full bg-blue-200 dark:bg-blue-700 text-blue-700 dark:text-blue-200 hover:bg-blue-300 dark:hover:bg-blue-600 flex items-center justify-center" title="小测试" :disabled="isGeneratingQuiz">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </button>
        <button @click="openChatSidebar" class="ml-2 p-2 rounded-full bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-600 flex items-center justify-center" title="AI聊天">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </button>
      </div>
    </nav>

  </header>

 

    <div class="book-content" :class="{ 'with-sidebar': showSidebar, 'with-chat-sidebar': showChatSidebar }">
      <div id="viewer" class="scrolled max-w-4xl ml-auto mr-auto mb-20"  :class="{ 'hidden': isResizing }"></div>
      <div @click="goPrev" class="text-transparent fixed top-0 left-0 h-screen w-12 lg:w-20 bg-transparent flex flex-col hover:cursor-pointer bg-[url('assets/img/back.svg')] dark:bg-[url('assets/img/back-white.svg')] bg-no-repeat bg-[center_left_10px]">
        Prev
      </div>
      <div @click="goNext" class="text-transparent fixed top-0 right-0 h-screen w-12 lg:w-20 bg-transparent flex flex-col hover:cursor-pointer bg-[url('assets/img/forward.svg')] dark:bg-[url('assets/img/forward-white.svg')] bg-no-repeat bg-[center_right_10px]">
        Next
      </div>
      <!-- 上下文菜单 -->
      <div 
        v-show="showContextMenu" 
        :style="{ left: contextMenuPosition.x + 'px', top: contextMenuPosition.y + 'px' }"
        class="context-menu fixed z-[5000] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2"
        @mouseenter="contextMenuHovering = true" @mouseleave="handleContextMenuLeave"
      >
        <!-- 调试信息 -->
        <div class="text-xs text-gray-500 mb-1">showContextMenu: {{ showContextMenu }}</div>
        
        <!-- 新建高亮按钮 -->
        <button 
          v-if="!isHoveringHighlight"
          @click="highlightSelection"
          class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
          </svg>
          高亮
        </button>
        
        <!-- 添加笔记按钮 -->
        <button 
          v-if="!isHoveringHighlight"
          @click="showNoteInputDialog"
          class="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          添加笔记
        </button>
        
        <!-- 笔记显示区域 -->
        <div 
          v-if="isHoveringHighlight && getHighlightNote(hoveredHighlightId)"
          class="px-3 py-2 border-t border-gray-200 dark:border-gray-600 mt-1"
          @mouseenter="contextMenuHovering = true" @mouseleave="handleContextMenuLeave"
        >
          <div class="text-xs text-gray-500 mb-1 font-medium">📝 笔记</div>
          <div class="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded border-l-2 border-blue-500">
            {{ getHighlightNote(hoveredHighlightId) }}
          </div>
        </div>
        
        <!-- Relink按钮 -->
        <button 
          v-if="isHoveringHighlight && hoveredHighlightId"
          @click="showRelinkForHighlight"
          class="flex items-center gap-2 px-3 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded w-full mt-1"
          @mouseenter="contextMenuHovering = true" @mouseleave="handleContextMenuLeave"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Relink
        </button>
        
        <!-- 删除高亮按钮 -->
        <button 
          v-if="isHoveringHighlight && hoveredHighlightId"
          @click="removeHighlight(hoveredHighlightId)"
          class="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded w-full mt-1"
          @mouseenter="contextMenuHovering = true" @mouseleave="handleContextMenuLeave"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          删除高亮
        </button>
      </div>
      
      <!-- 笔记输入框 -->
      <div 
        v-if="showNoteInput"
        :style="{ left: noteInputPosition.x + 'px', top: noteInputPosition.y + 'px' }"
        class="note-input fixed z-[5001] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px]"
        @mouseenter="noteInputHovering = true" @mouseleave="handleNoteInputLeave"
      >
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">添加笔记</h3>
          <button 
            @click="hideNoteInput"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-3">
          <div class="text-xs text-gray-500 mb-2">选中文本：</div>
          <div class="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded border">
            {{ selectedText }}
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-xs text-gray-500 mb-2">笔记内容：</label>
          <textarea 
            v-model="currentNoteText"
            @keydown.ctrl.enter="saveNote"
            placeholder="输入你的笔记..."
            class="w-full h-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-2">
          <button 
            @click="hideNoteInput"
            class="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            取消
          </button>
          <button 
            @click="saveNote"
            class="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            保存
          </button>
        </div>
      </div>
      

   

      <div id="hs-overlay-right" class="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[4800] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700" tabindex="-1">
        <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
          <h3 class="font-bold text-gray-800 dark:text-white">
            Contents
          </h3>
          <button type="button" class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" data-hs-overlay="#hs-overlay-right">
            <span class="sr-only">Close modal</span>
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <ul id="toc" class="space-y-2">
            <li v-for="(chapter, index) in toc" :key="index">
              <a href="#" @click.prevent="displayChapter(chapter.href, true)" class="text-blue-600 hover:text-blue-800">
                {{ chapter.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    
    <CommonSidebar 
      ref="sidebar"
      :text="plainTextContent" 
      :summary="summaryText" 
      :isGeneratingSummary="isGeneratingSummary" 
      :visible="showSidebar" 
      @close="closeSidebarWithCancel"
    />

    <!-- 聊天边栏 -->
    <div v-if="showChatSidebar" class="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-[5000] flex flex-col">
      <!-- 聊天头部 -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-blue-500">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">AI助手</h3>
            <p class="text-green-100 text-sm">基于Gemini的智能对话</p>
          </div>
        </div>
        <button @click="closeChatSidebar" class="text-white/80 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 聊天消息区域 -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatMessagesContainer">
        <!-- 欢迎消息 -->
        <div v-if="chatMessages.length === 0" class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">欢迎使用AI助手</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">我可以帮助您理解当前章节的内容，回答相关问题，或者进行其他讨论。</p>
        </div>

        <!-- 聊天消息 -->
        <div v-for="(message, index) in chatMessages" :key="index" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
          <div class="max-w-[80%]">
            <!-- 用户消息 -->
            <div v-if="message.isUser" class="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-2 shadow-sm">
              <p class="text-sm">{{ message.content }}</p>
              <p class="text-xs text-blue-100 mt-1">{{ formatTime(message.timestamp) }}</p>
            </div>
            
            <!-- AI消息 -->
            <div v-else class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
              <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formatTime(message.timestamp) }}</p>
            </div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="isSendingMessage" class="flex justify-start">
          <div class="max-w-[80%]">
            <div class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
              <div class="flex items-center space-x-2">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">AI正在思考...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-4">
        <div class="flex space-x-2">
          <input
            v-model="currentChatMessage"
            @keydown.enter="sendMessage"
            type="text"
            placeholder="输入您的问题..."
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :disabled="isSendingMessage"
          />
          <button
            @click="sendMessage"
            :disabled="!currentChatMessage.trim() || isSendingMessage"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Relink弹窗 -->
    <RelinkModal
      :visible="showRelinkModal"
      :isLoading="relinkModalLoading"
      :error="relinkModalError"
      :results="relinkModalResults"
      @close="closeRelinkModal"
    />

    <!-- Quiz弹窗 -->
    <div v-if="showQuizModal" class="fixed inset-0 z-[6000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden border border-gray-200 dark:border-gray-700">
        <!-- 弹窗头部 -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">章节小测试</h2>
                <p class="text-blue-100 text-sm">测试您对本章内容的理解</p>
              </div>
            </div>
            <button @click="closeQuizModal" class="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-6">
          <!-- 加载状态 -->
          <div v-if="isGeneratingQuiz" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-gray-600 dark:text-gray-300">正在生成小测试...</p>
          </div>

          <!-- Quiz内容 -->
          <div v-else-if="quizData.length > 0 && !quizCompleted" class="space-y-6">
            <!-- 进度条 -->
            <div class="flex items-center justify-between mb-6">
              <div class="text-sm text-gray-600 dark:text-gray-300">
                问题 {{ currentQuizIndex + 1 }} / {{ quizData.length }}
              </div>
              <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" :style="{ width: ((currentQuizIndex + 1) / quizData.length * 100) + '%' }"></div>
              </div>
            </div>

            <!-- 当前问题 -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {{ quizData[currentQuizIndex].question }}
              </h3>
              
              <!-- 选项 -->
              <div class="space-y-3">
                <button
                  v-for="(choice, index) in quizData[currentQuizIndex].choices"
                  :key="index"
                  @click="selectAnswer(index)"
                  :class="[
                    'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                    userAnswers[currentQuizIndex] === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="userAnswers[currentQuizIndex] === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'">
                      <span v-if="userAnswers[currentQuizIndex] === index" class="text-white text-xs">✓</span>
                    </div>
                    <span class="font-medium mr-2">{{ String.fromCharCode(65 + index) }}.</span>
                    <span>{{ choice }}</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- 导航按钮 -->
            <div class="flex justify-between">
              <button
                @click="previousQuestion"
                :disabled="currentQuizIndex === 0"
                class="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                上一题
              </button>
              
              <button
                v-if="currentQuizIndex < quizData.length - 1"
                @click="nextQuestion"
                :disabled="userAnswers[currentQuizIndex] === undefined"
                class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                下一题
              </button>
              
              <button
                v-else
                @click="submitQuiz"
                :disabled="userAnswers[currentQuizIndex] === undefined"
                class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                提交答案
              </button>
            </div>
          </div>

          <!-- 结果页面 -->
          <div v-else-if="quizCompleted" class="flex flex-col py-4" style="min-height:40vh;max-height:70vh;">
            <div class="mb-4">
              <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                   :class="quizScore >= 2 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'">
                <svg v-if="quizScore >= 2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-green-600 dark:text-green-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-red-600 dark:text-red-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {{ quizScore >= 2 ? '恭喜！' : '继续加油！' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                您的得分：{{ quizScore }}/{{ quizData.length }}
              </p>
            </div>

            <!-- 详细结果内容可滚动 -->
            <div class="flex-1 overflow-y-auto max-h-[40vh] space-y-4 mb-2 pr-2">
              <div v-for="(quiz, index) in quizData" :key="index" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="flex items-start justify-between mb-1">
                  <h4 class="font-medium text-gray-800 dark:text-gray-200">问题 {{ index + 1 }}</h4>
                  <div class="flex items-center">
                    <span v-if="userAnswers[index] === quiz.correctAnswer" class="text-green-600 dark:text-green-400 text-sm font-medium">✓ 正确</span>
                    <span v-else class="text-red-600 dark:text-red-400 text-sm font-medium">✗ 错误</span>
                  </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-2">{{ quiz.question }}</p>
                <div class="space-y-1">
                  <div v-for="(choice, choiceIndex) in quiz.choices" :key="choiceIndex"
                       :class="[
                         'text-sm p-2 rounded',
                         choiceIndex === quiz.correctAnswer
                           ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                           : choiceIndex === userAnswers[index] && choiceIndex !== quiz.correctAnswer
                           ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                           : 'text-gray-600 dark:text-gray-400'
                       ]">
                    <span class="font-medium">{{ String.fromCharCode(65 + choiceIndex) }}.</span> {{ choice }}
                    <span v-if="choiceIndex === quiz.correctAnswer" class="ml-2 text-xs">(正确答案)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮固定在底部 -->
            <div class="flex justify-center space-x-4 border-t pt-4 mt-2 bg-white dark:bg-gray-800 sticky bottom-0 z-10">
              <button @click="retakeQuiz" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                重新测试
              </button>
              <button @click="closeQuizModal" class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 阅读进度提醒弹窗 -->
    <div v-if="showReadingProgressModal" class="fixed inset-0 z-[6000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden border border-gray-200 dark:border-gray-700">
        <!-- 弹窗头部 -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">阅读进度提醒</h2>
                <p class="text-blue-100 text-sm">继续您的阅读之旅</p>
              </div>
            </div>
            <button @click="closeReadingProgressModal" class="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-6 space-y-6">
          <!-- 上次阅读时间 -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex items-center space-x-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">上次阅读时间</span>
            </div>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ formatLastReadingTime() }}</p>
          </div>

          <!-- 上次阅读内容 -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
            <div class="flex items-center space-x-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-400">上次阅读总结</span>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded p-3 border min-h-[48px]">
              <template v-if="isGeneratingGeminiSummary">
                <span class="text-gray-400 dark:text-gray-500">AI总结生成中...</span>
              </template>
              <template v-else>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ lastReadingSummary || '暂无总结' }}</p>
              </template>
            </div>
          </div>

          <!-- 阅读统计 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ lastReadingInfo?.progress || 0 }}%</div>
              <div class="text-sm text-green-600 dark:text-green-400">阅读进度</div>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ lastReadingInfo?.duration || 0 }}分钟</div>
              <div class="text-sm text-purple-600 dark:text-purple-400">阅读时长</div>
            </div>
          </div>
        </div>

        <!-- 弹窗底部 -->
        <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
          <button @click="closeReadingProgressModal" class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
            稍后查看
          </button>
          <button @click="continueReading" class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
            继续阅读
          </button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import ePub from 'epubjs'
import localforage from 'localforage'
import CommonSidebar from '../components/common/Sidebar.vue'
import RelinkModal from '../components/common/RelinkModal.vue'
import { GoogleGenAI } from '@google/genai'

export default {
  name: 'BookReader',
  components: {
    CommonSidebar,
    RelinkModal
  },
  props: {
    fileName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      book: null,
      rendition: null,
      toc: [],
      resizeTimeout: null,
      isResizing: false,
      showSidebar: false,
      plainTextContent: '',
      summaryText: '',
      isGeneratingSummary: false,
      currentChapterId: '', // 当前章节ID
      currentAbortController: null, // 当前API请求的AbortController
      bookTitle: '', // 书籍标题
      geminiApiKey: process.env.VUE_APP_GEMINI_API_KEY, // 用户需要填写自己的API key
      ai: null, // GoogleGenAI 实例
      showContextMenu: false,
      contextMenuPosition: { x: 0, y: 0 },
      selectedText: '',
      highlights: [], // 存储高亮信息
      isRestoringHighlights: false, // 防止重复恢复高亮的标志
      shouldRestoreHighlights: false, // 控制是否应该恢复高亮
      isHoveringHighlight: false, // 是否悬停在高亮上
      hoveredHighlightId: null, // 悬停的高亮ID
      showNoteInput: false, // 是否显示笔记输入框
      noteInputPosition: { x: 0, y: 0 }, // 笔记输入框位置
      currentNoteText: '', // 当前笔记文本
      currentHighlightId: null, // 当前操作的高亮ID
      // 阅读进度跟踪
      showReadingProgressModal: false,
      lastReadingInfo: null,
      currentReadingContent: '',
      contextMenuHovering: false, // 鼠标是否在菜单上
      noteInputHovering: false, // 鼠标是否在笔记输入框上
      showRelinkModal: false, // 是否显示Relink弹窗
      relinkModalLoading: false, // Relink弹窗加载状态
      relinkModalError: '', // Relink弹窗错误信息
      relinkModalResults: [], // Relink弹窗搜索结果
      isGeneratingQuiz: false, // 是否正在生成小测试
      showQuizModal: false, // 是否显示Quiz弹窗
      quizData: [], // Quiz数据
      currentQuizIndex: 0, // 当前Quiz索引
      userAnswers: [], // 用户答案
      quizCompleted: false, // Quiz是否完成
      quizScore: 0, // Quiz得分
      showChatSidebar: false, // 是否显示聊天边栏
      chatMessages: [], // 聊天消息
      currentChatMessage: '', // 当前输入的消息
      isSendingMessage: false, // 是否正在发送消息
      lastReadingSummary: '', // 新增：上次阅读总结
      isGeneratingGeminiSummary: false, // 新增：Gemini生成状态
    }
  },
  methods: {
    async loadBook() {
      try {
        const bookItem = await localforage.getItem(this.fileName);
        if (bookItem && bookItem.data) {
          this.book = ePub(bookItem.data);

          this.rendition = this.book.renderTo("viewer", {
            flow: "scrolled-doc", // 将 flow 设置为 paginated
            width: "100%",
            height: "100%",
            fullsize: true,
          });

          this.defineHooks();
          await this.loadTOC(); 
          await this.displayBook();

          // Set the book title
          const metadata = await this.book.loaded.metadata;
          const fullTitle = metadata.title;
          const truncatedTitle = fullTitle.split(':')[0].trim();
          this.bookTitle = truncatedTitle; // 保存书籍标题
          document.getElementById('book-title').textContent = truncatedTitle;

          // 初始化 GoogleGenAI 实例
          this.ai = new GoogleGenAI({ apiKey: this.geminiApiKey });

          // 提取纯文本内容
          this.extractPlainText();
          
          // 初始加载时恢复高亮
          this.shouldRestoreHighlights = true;
          this.restoreHighlights();
          this.shouldRestoreHighlights = false;
          
          // 检查阅读进度并显示提醒
          this.checkReadingProgress();
        } else {
          console.error('Book not found in local storage or invalid book data');
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        console.error('Error loading book:', error);
        this.$router.push({ name: 'Home' });
      }
    },
    
    handleKeydown(event) {
      if (event.key === 'ArrowLeft') {
        this.goPrev(event);
      } else if (event.key === 'ArrowRight') {
        this.goNext(event);
      } else if (event.key === 'Escape') {
        this.goHome();
      }
    },
    
    defineHooks() {
      this.book.rendition.hooks.content.register((contents) => {
        let doc = contents.document;
        let head = doc.querySelector('head');

        // Remove existing stylesheets
        Array.from(head.querySelectorAll('link[rel="stylesheet"], style'))
          .forEach(el => el.remove());

          // Modify links
          const links = doc.querySelectorAll('a');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href) {
            if (href.startsWith('http://') || href.startsWith('https://')) {
              // External link: open in new tab
              link.setAttribute('target', '_blank');
            } else {  
              // Internal link: remove href and make it non-clickable
              link.removeAttribute('href');
              link.style.textDecoration = 'none';
              link.style.color = 'inherit';
              link.style.cursor = 'text';
            }
          }
        });


        // Inject minimal Tailwind styles
        let style = doc.createElement('style');
        style.textContent = this.getMinimalTailwindStyles();
        head.appendChild(style);

        // Remove empty paragraphs
        var paras = doc.getElementsByTagName('p');
        for (var i = paras.length - 1; i >= 0; i--) {
          if (paras[i].innerHTML.replace(/\s|&nbsp;/g, '').length == 0)
            paras[i].parentNode.removeChild(paras[i]);
        }
        // Convert all-caps headings to sentence case
        this.convertAllCapsHeadings(doc);

        // Add Tailwind-like typography classes to body
        doc.body.classList.add('prose', 'mx-auto', 'px-4');

        // Apply dark mode styles
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          doc.body.classList.add('dark');
        }

        // 添加文本选择事件监听器
        doc.removeEventListener('mouseup', this.handleTextSelection);
        doc.removeEventListener('click', (event) => this.hideContextMenu(event));
        
        doc.addEventListener('mouseup', this.handleTextSelection);
        doc.addEventListener('click', (event) => this.hideContextMenu(event));
        
        // 为高亮元素添加悬停事件
        this.addHighlightHoverEvents(doc);
        
        // 内容渲染完成后恢复当前页面的高亮（仅在翻页或重新进入时）
        if (this.shouldRestoreHighlights) {
          setTimeout(() => {
            this.restoreHighlightsForCurrentPage();
          }, 100);
        }
      });

      this.rendition.on("relocated", (location) => {
        localStorage.setItem(`epub-location-${this.fileName}`, location.start.cfi);
        // 不再在这里更新章节ID，只在翻页时更新
      });
    },
    convertAllCapsHeadings(doc) {
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        if (this.isAllCaps(heading.textContent)) {
          heading.textContent = this.toSentenceCase(heading.textContent);
        }
      });
    },

    isAllCaps(text) {
      return text === text.toUpperCase() && text !== text.toLowerCase();
    },

    toSentenceCase(text) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

    handleInternalLink(href) {
      if (href.startsWith('#')) {
        // It's an anchor within the current chapter
        this.rendition.display(href);
      } else {
        // It's a link to another chapter
        const item = this.book.spine.get(href);
        if (item) {
          this.rendition.display(item.href);
        } else {
          console.error(`Unable to find item for href: ${href}`);
        }
      }
    },

    getMinimalTailwindStyles() {
      return `
        @import url('https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        .prose { 
          font-family: 'Gentium Book Plus', sans-serif; 
          font-size: 20px;
          line-height: 180%;}
        .prose p { margin-bottom: 1em; }
        .prose h1, .prose h2, .prose h3, .prose h4 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; }
        .prose h1 { font-size: 2.25em; line-height: 120%; }
        .prose h2 { font-size: 1.5em; line-height: 120%;}
        .prose h3 { font-size: 1.25em; line-height: 120%;}
        .prose h4 { font-size: 1.2em; line-height: 120%;}
        .prose strong {font-weight: 700; }
        .prose a { color: #333; text-decoration: none; }
        .prose ul, .prose ol { margin-top: 1em; margin-bottom: 1em; padding-left: 1.5em; }
        .prose li { margin-bottom: 0.25em; }
        .prose li p { margin: 0;}
        .prose img { 
        margin-top: 1em; margin-bottom: 1em; 
        width: 80%;
        height: 100%;
        margin-left:auto;
        margin-right:auto;}
        @media (prefers-color-scheme: dark) {
          body.dark { background-color: #000; color: #e2e8f0; }
          body.dark a { color: #e2e8f0; }
        }
        
        /* 高亮样式 */
        .epub-highlight {
          background-color: #fef08a !important;
          color: #000 !important;
        }
      `;
    },

    goNext(event) {
      event.preventDefault();
      
      // 取消当前摘要请求
      this.cancelCurrentSummaryRequest();
      
      this.rendition.next();
      this.$nextTick(() => {
        // 更新当前章节ID
        const currentLocation = this.rendition.currentLocation();
        if (currentLocation && currentLocation.start) {
          this.currentChapterId = this.generateChapterId(currentLocation);
          console.log('翻页后章节ID更新:', this.currentChapterId);
        }
        
        this.extractPlainText();
        // 翻页后延迟恢复高亮，避免干扰翻页
        setTimeout(() => {
          this.shouldRestoreHighlights = true;
          this.restoreHighlightsForCurrentPage();
          this.shouldRestoreHighlights = false;
        }, 300);
        // 保存阅读进度
        this.saveReadingProgress();
      });
    },

    goPrev(event) {
      event.preventDefault();
      
      // 取消当前摘要请求
      this.cancelCurrentSummaryRequest();
      
      this.rendition.prev();
      this.$nextTick(() => {
        // 更新当前章节ID
        const currentLocation = this.rendition.currentLocation();
        if (currentLocation && currentLocation.start) {
          this.currentChapterId = this.generateChapterId(currentLocation);
          console.log('翻页后章节ID更新:', this.currentChapterId);
        }
        
        this.extractPlainText();
        // 翻页后延迟恢复高亮，避免干扰翻页
        setTimeout(() => {
          this.shouldRestoreHighlights = true;
          this.restoreHighlightsForCurrentPage();
          this.shouldRestoreHighlights = false;
        }, 300);
        // 保存阅读进度
        this.saveReadingProgress();
      });
    },

    async loadTOC() {
      const navigation = await this.book.loaded.navigation;
      this.toc = navigation.toc;
    },

    async displayBook() {
      try {
        const savedLocation = localStorage.getItem(`epub-location-${this.fileName}`);
        const currentSectionIndex = savedLocation || undefined;
        await this.rendition.display(currentSectionIndex);
        
        // 设置当前章节ID
        const currentLocation = this.rendition.currentLocation();
        if (currentLocation && currentLocation.start) {
          this.currentChapterId = this.generateChapterId(currentLocation);
          console.log('初始章节ID设置:', this.currentChapterId);
        }
        
        // 切换章节时也提取纯文本
        this.extractPlainText();
      } catch (error) {
        console.error('Error displaying book:', error);
      }
    },
    extractPlainText() {
      // 获取当前渲染的iframe或内容区域的纯文本
      const viewer = document.getElementById('viewer');
      if (!viewer) return;
      // epubjs会在viewer下插入iframe或div
      let text = '';
      const iframes = viewer.getElementsByTagName('iframe');
      if (iframes.length > 0) {
        // 多章节scrolled模式下可能有多个iframe
        for (let iframe of iframes) {
          try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (doc && doc.body) {
              text += doc.body.innerText + '\n';
            }
          } catch (e) {
            console.log(e)
          }
        }
      } else {
        // 也可能直接渲染div
        text = viewer.innerText;
      }
      this.plainTextContent = text.trim();
      // 如果边栏开启，就检查摘要（添加延迟等待内容更新）
      if (this.showSidebar) {
        // 延迟检查摘要，等待内容完全更新
        setTimeout(() => {
          this.checkCurrentChapterSummary();
        }, 500);
      }
    },
    // 检查当前章节摘要
    checkCurrentChapterSummary() {
      // 重新获取当前章节ID，确保获取到最新的
      const currentLocation = this.rendition.currentLocation();
      if (currentLocation && currentLocation.start) {
        this.currentChapterId = this.generateChapterId(currentLocation);
        console.log('延迟检查摘要，更新章节ID:', this.currentChapterId);
      }
      
      if (!this.currentChapterId) {
        console.log('当前章节ID未设置，跳过摘要检查');
        return;
      }
      
      // 设置生成中状态
      this.isGeneratingSummary = true;
      this.summaryText = '';
      
      // 尝试从本地存储加载当前章节的摘要
      const summary = this.loadChapterSummary(this.currentChapterId);
      
      if (summary) {
        // 如果找到已保存的摘要，延时1秒后显示
        console.log('已加载章节摘要:', this.currentChapterId);
        setTimeout(async () => {
          this.summaryText = summary;
          this.isGeneratingSummary = false;
          
          // 发送摘要到API
          const result = await this.submitSummaryToAPI(summary);
          if (result.success) {
            console.log('已保存摘要发送到API成功');
          } else {
            console.error('已保存摘要发送到API失败:', result.error);
          }
          
          // 摘要显示完成后，搜索相关知识点
          await this.searchWithSummary(summary);
        }, 1000);
      } else {
        // 如果没有找到摘要，生成新的
        console.log('未找到章节摘要，开始生成:', this.currentChapterId);
        this.generateSummary();
      }
    },

    async generateSummary() {
      if (!this.plainTextContent || !this.ai) {
        this.summaryText = '请先设置Gemini API Key';
        this.isGeneratingSummary = false;
        return;
      }
      
      // 取消之前的请求
      this.cancelCurrentSummaryRequest();
      
      // 创建新的AbortController
      this.currentAbortController = new AbortController();
      const currentController = this.currentAbortController;
      const currentChapterId = this.currentChapterId;
      
      console.log('开始生成摘要，章节ID:', currentChapterId);
      
      try {
        // 使用AbortController包装API请求
        const response = await this.ai.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: `Summarize those content within 100 words:\n\n${this.plainTextContent}`
        }, {
          signal: currentController.signal
        });
        
        // 检查请求是否已被取消
        if (currentController.signal.aborted) {
          console.log('摘要生成请求已被取消，章节ID:', currentChapterId);
          return;
        }
        
        // 检查章节ID是否仍然匹配
        if (this.currentChapterId !== currentChapterId) {
          console.log('章节已切换，忽略旧的摘要结果，章节ID:', currentChapterId);
          return;
        }
        
        console.log('摘要生成完成，章节ID:', currentChapterId);
        this.summaryText = response.text;
        
        // 保存当前章节的摘要
        this.saveChapterSummary(this.currentChapterId, response.text);
        
        // 发送新生成的摘要到API
        const result = await this.submitSummaryToAPI(response.text);
        if (result.success) {
          console.log('新生成摘要发送到API成功');
        } else {
          console.error('新生成摘要发送到API失败:', result.error);
        }
        
        // 摘要生成完成后，搜索相关知识点
        await this.searchWithSummary(response.text);
      } catch (error) {
        // 检查是否是取消错误
        if (error.name === 'AbortError') {
          console.log('摘要生成请求已被取消（AbortError），章节ID:', currentChapterId);
          return;
        }
        
        // 检查章节ID是否仍然匹配
        if (this.currentChapterId !== currentChapterId) {
          console.log('章节已切换，忽略错误结果，章节ID:', currentChapterId);
          return;
        }
        
        console.error('生成摘要时出错:', error);
        this.summaryText = '生成摘要时出错，请检查网络连接';
      } finally {
        // 只有当前控制器仍然匹配时才重置状态
        if (this.currentAbortController === currentController) {
          this.isGeneratingSummary = false;
          this.currentAbortController = null;
        }
      }
    },

    saveCurrentLocation() {
      if (this.rendition) {
        const currentLocation = this.rendition.currentLocation();
        if (currentLocation && currentLocation.start) {
          localStorage.setItem(`epub-location-${this.fileName}`, currentLocation.start.cfi);
        }
      }
      // 同时保存阅读进度
      this.saveReadingProgress();
    },

    displayChapter(href) {
      if (this.rendition) {
        // 取消当前摘要请求
        this.cancelCurrentSummaryRequest();
        
        this.closeSidebar();  
        this.rendition.display(href);
        this.$nextTick(() => {
          // 更新当前章节ID
          const currentLocation = this.rendition.currentLocation();
          if (currentLocation && currentLocation.start) {
            this.currentChapterId = this.generateChapterId(currentLocation);
            console.log('切换章节ID更新:', this.currentChapterId);
          }
          
          this.extractPlainText();
          // 跳转章节后延迟恢复高亮
          setTimeout(() => {
            this.shouldRestoreHighlights = true;
            this.restoreHighlightsForCurrentPage();
            this.shouldRestoreHighlights = false;
          }, 500);
        });
      }
    },


    openSidebar() {
      document.getElementById('toc-sidebar').classList.remove('translate-x-full');
      document.getElementById('overlay').classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    },

    closeSidebar() {
   // Use the third-party library to close the sidebar
   if (window.HSOverlay) {
        window.HSOverlay.close(document.querySelector('#hs-overlay-right'));
      } else {
        console.warn('HSOverlay not found. Make sure the library is properly loaded.');
      }
    },

    // 打开边栏并处理摘要
    openSidebarWithSummary() {
      // 显示边栏
      this.showSidebar = true;
      
      // 如果当前已经有文本内容，延迟检查摘要
      if (this.plainTextContent) {
        setTimeout(() => {
          this.checkCurrentChapterSummary();
        }, 500);
      }
    },

    // 关闭边栏并取消摘要请求
    closeSidebarWithCancel() {
      // 取消当前摘要请求
      this.cancelCurrentSummaryRequest();
      
      // 关闭边栏
      this.showSidebar = false;
    },

    // 发送摘要到API
    async submitSummaryToAPI(summary) {
      try {
        const formData = new FormData();
        formData.append('project_name', 'Hobby and Life');
        formData.append('article_title', this.bookTitle);
        formData.append('summary', summary);
        formData.append('chapter', this.currentChapterId);

        console.log('发送摘要到API:', {
          project_name: 'Hobby and Life',
          article_title: this.bookTitle,
          summary: summary,
          chapter: this.currentChapterId
        });

        const response = await fetch('https://graph-service.zeabur.app/submitsummary', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          console.log('摘要提交成功:', result);
          return { success: true, data: result };
        } else {
          console.error('摘要提交失败:', response.status, response.statusText);
          return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
        }
      } catch (error) {
        console.error('发送摘要到API时出错:', error);
        return { success: false, error: error.message };
      }
    },

    // 搜索相关知识点
    async searchWithSummary(summary) {
      if (!summary || !this.$refs.sidebar) {
        console.log('摘要为空或sidebar未找到，跳过搜索');
        return;
      }

      console.log('开始搜索相关知识点，摘要长度:', summary.length);
      
      // 设置sidebar的加载状态
      this.$refs.sidebar.setRelinkLoading(true);
      
      try {
        const formData = new FormData();
        const limitedQuery = summary.length > 200 ? summary.substring(0, 200) + '...' : summary;
        formData.append('query', limitedQuery);
        formData.append('project_name', 'Hobby and Life');
        
        const response = await fetch('https://graph-service.zeabur.app/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          body: formData
        });
        
        if (response.status === 200) {
          const data = await response.json();
          console.log('搜索成功，结果数量:', data.results ? data.results.length : 0);
          // 更新sidebar的搜索结果
          this.$refs.sidebar.updateRelinkResults(data);
        } else {
          console.error('搜索请求失败:', response.status, response.statusText);
          this.$refs.sidebar.setRelinkError(`请求失败: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('搜索时出错:', error);
        this.$refs.sidebar.setRelinkError(`网络错误: ${error.message}`);
      }
    },

    // 发送笔记到API
    async submitNoteToAPI(origin, comment) {
      try {
        const formData = new FormData();
        formData.append('project_name', 'Hobby and Life');
        formData.append('article_title', this.bookTitle || 'Unknown Book');
        formData.append('origin', origin);
        formData.append('comment', comment || '');
        
        console.log('发送笔记到API:', {
          project_name: 'Hobby and Life',
          article_title: this.bookTitle,
          origin: origin,
          comment: comment
        });

        const response = await fetch('https://graph-service.zeabur.app/submitnote', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          console.log('笔记提交成功:', result);
          return { success: true, data: result };
        } else {
          console.error('笔记提交失败:', response.status, response.statusText);
          return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
        }
      } catch (error) {
        console.error('发送笔记到API时出错:', error);
        return { success: false, error: error.message };
      }
    },

    // 显示高亮的Relink弹窗
    async showRelinkForHighlight() {
      if (!this.hoveredHighlightId) {
        console.log('没有高亮ID，无法显示Relink');
        return;
      }

      // 获取高亮信息
      const highlight = this.highlights.find(h => h.id === this.hoveredHighlightId);
      if (!highlight) {
        console.log('未找到高亮信息');
        return;
      }

      // 显示弹窗并开始搜索
      this.showRelinkModal = true;
      this.relinkModalLoading = true;
      this.relinkModalError = '';
      this.relinkModalResults = [];

      // 构建搜索查询：原文 + 笔记（如果有）
      let searchQuery = highlight.text;
      if (highlight.note) {
        searchQuery += ' ' + highlight.note;
      }

      console.log('开始Relink搜索，查询:', searchQuery);

      try {
        const formData = new FormData();
        const limitedQuery = searchQuery.length > 200 ? searchQuery.substring(0, 200) + '...' : searchQuery;
        formData.append('query', limitedQuery);
        formData.append('project_name', 'Hobby and Life');
        
        const response = await fetch('https://graph-service.zeabur.app/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          body: formData
        });
        
        if (response.status === 200) {
          const data = await response.json();
          console.log('Relink搜索成功，结果数量:', data.results ? data.results.length : 0);
          this.relinkModalResults = this.formatRelinkResults(data);
        } else {
          console.error('Relink搜索请求失败:', response.status, response.statusText);
          this.relinkModalError = `请求失败: ${response.status} ${response.statusText}`;
        }
      } catch (error) {
        console.error('Relink搜索时出错:', error);
        this.relinkModalError = `网络错误: ${error.message}`;
      } finally {
        this.relinkModalLoading = false;
      }
    },

    // 关闭Relink弹窗
    closeRelinkModal() {
      this.showRelinkModal = false;
      this.relinkModalLoading = false;
      this.relinkModalError = '';
      this.relinkModalResults = [];
    },

    // 格式化Relink结果
    formatRelinkResults(data) {
      if (!data.results || !Array.isArray(data.results)) {
        return [];
      }
      return data.results.map((item, index) => ({
        name: item.name,
        index: item.index,
        summary: item.summary,
        id: index
      }));
    },

    goHome() {
      console.log(this.$router)
      this.$router.push({ name: 'Home' });
    },

    handleFileInput(e) {
      var file = e.target.files[0];
      if (file.type !== "application/epub+zip") {
        alert("Please select an EPUB file.");
        return;
      }
    },

    highlightSelection() {
      // 获取iframe中的选中范围
      const range = this.getSelectedRangeFromIframe();
      if (range) {
        const text = range.toString();
        if (text) {
          // 在控制台输出高亮的文本
          console.log('高亮文本:', text);
          
          // 手动创建高亮效果
          this.createHighlight(range);
          
          // 隐藏上下文菜单
          this.showContextMenu = false;
          
          // 清除选择
          const selection = range.startContainer.ownerDocument.defaultView.getSelection();
          if (selection) {
            selection.removeAllRanges();
          }
        }
      }
    },

    showNoteInputDialog() {
      // 获取iframe中的选中范围
      const range = this.getSelectedRangeFromIframe();
      if (range) {
        const text = range.toString();
        if (text) {
          this.selectedText = text;
          this.currentNoteText = '';
          this.currentHighlightId = null;
          
          // 设置笔记输入框位置，并确保不超出屏幕边界
          this.noteInputPosition = this.calculateNoteInputPosition(this.contextMenuPosition);
          
          // 隐藏上下文菜单，显示笔记输入框
          this.showContextMenu = false;
          this.showNoteInput = true;
        }
      }
    },

    calculateNoteInputPosition(originalPosition) {
      // 笔记输入框的尺寸
      const noteInputWidth = 350; // 预估宽度
      const noteInputHeight = 280; // 预估高度（包含标题、选中文本、输入框、按钮等）
      const padding = 20; // 边距
      
      let x = originalPosition.x;
      let y = originalPosition.y;
      
      // 检查右边界
      if (x + noteInputWidth > window.innerWidth - padding) {
        x = window.innerWidth - noteInputWidth - padding;
      }
      
      // 检查左边界
      if (x < padding) {
        x = padding;
      }
      
      // 检查下边界 - 如果会超出屏幕底部，则显示在选中文本上方
      if (y + noteInputHeight > window.innerHeight - padding) {
        y = y - noteInputHeight - 20; // 向上偏移，留出一些间距
      }
      
      // 检查上边界
      if (y < padding) {
        y = padding;
      }
      
      return { x, y };
    },

    hideNoteInput() {
      this.showNoteInput = false;
      this.showContextMenu = false; // 同时隐藏上下文菜单
      this.currentNoteText = '';
      this.currentHighlightId = null;
    },

    async saveNote() {
      if (!this.currentNoteText.trim()) {
        return; // 如果没有笔记内容，不保存
      }

      // 获取iframe中的选中范围
      const range = this.getSelectedRangeFromIframe();
      if (range) {
        const text = range.toString();
        if (text) {
          // 创建高亮并保存笔记
          this.createHighlightWithNote(range, this.currentNoteText);
          
          // 发送笔记到API
          await this.submitNoteToAPI(text, this.currentNoteText);
          
          // 隐藏笔记输入框和上下文菜单
          this.hideNoteInput();
          this.showContextMenu = false;
          
          // 清除选择
          const selection = range.startContainer.ownerDocument.defaultView.getSelection();
          if (selection) {
            selection.removeAllRanges();
          }
        }
      }
    },

    getHighlightNote(highlightId) {
      if (!highlightId) return null;
      const highlight = this.highlights.find(h => h.id === highlightId);
      return highlight ? highlight.note : null;
    },

    createHighlight(range) {
      try {
        // 创建高亮元素
        const highlight = document.createElement('span');
        highlight.className = 'epub-highlight';
        highlight.style.backgroundColor = '#fef08a';
        highlight.style.color = '#000';
        
        // 生成唯一ID
        const highlightId = this.generateHighlightId();
        highlight.setAttribute('data-highlight-id', highlightId);
        
        // 将选中的内容包装在高亮元素中
        range.surroundContents(highlight);
        
        // 保存高亮信息
        this.saveHighlight(range, highlightId);
        
        // 发送高亮到API（comment为空）
        const text = range.toString();
        if (text) {
          this.submitNoteToAPI(text, '');
        }
        
        console.log('高亮创建成功，ID:', highlightId);
      } catch (error) {
        console.error('创建高亮失败:', error);
        
        // 备用方法：直接修改样式
        try {
          const selection = range.startContainer.ownerDocument.defaultView.getSelection();
          if (selection.rangeCount > 0) {
            const range2 = selection.getRangeAt(0);
            const contents = range2.extractContents();
            const highlight = document.createElement('span');
            highlight.className = 'epub-highlight';
            highlight.style.backgroundColor = '#fef08a';
            highlight.style.color = '#000';
            
            const highlightId = this.generateHighlightId();
            highlight.setAttribute('data-highlight-id', highlightId);
            highlight.appendChild(contents);
            highlight.appendChild(contents);
            range2.insertNode(highlight);
            
            // 保存高亮信息
            this.saveHighlight(range2, highlightId);
            
            // 发送高亮到API（comment为空）
            const text = range2.toString();
            if (text) {
              this.submitNoteToAPI(text, '');
            }
            
            console.log('备用高亮方法成功，ID:', highlightId);
          }
        } catch (error2) {
          console.error('备用高亮方法也失败:', error2);
        }
      }
    },

    createHighlightWithNote(range, noteText) {
      try {
        // 创建高亮元素
        const highlight = document.createElement('span');
        highlight.className = 'epub-highlight';
        highlight.style.backgroundColor = '#fef08a';
        highlight.style.color = '#000';
        
        // 生成唯一ID
        const highlightId = this.generateHighlightId();
        highlight.setAttribute('data-highlight-id', highlightId);
        
        // 将选中的内容包装在高亮元素中
        range.surroundContents(highlight);
        
        // 保存高亮信息（包含笔记）
        this.saveHighlight(range, highlightId, noteText);
        
        console.log('带笔记的高亮创建成功，ID:', highlightId);
      } catch (error) {
        console.error('创建带笔记的高亮失败:', error);
        
        // 备用方法：直接修改样式
        try {
          const selection = range.startContainer.ownerDocument.defaultView.getSelection();
          if (selection.rangeCount > 0) {
            const range2 = selection.getRangeAt(0);
            const contents = range2.extractContents();
            const highlight = document.createElement('span');
            highlight.className = 'epub-highlight';
            highlight.style.backgroundColor = '#fef08a';
            highlight.style.color = '#000';
            
            const highlightId = this.generateHighlightId();
            highlight.setAttribute('data-highlight-id', highlightId);
            highlight.appendChild(contents);
            range2.insertNode(highlight);
            
            // 保存高亮信息（包含笔记）
            this.saveHighlight(range2, highlightId, noteText);
            
            console.log('备用带笔记高亮方法成功，ID:', highlightId);
          }
        } catch (error2) {
          console.error('备用带笔记高亮方法也失败:', error2);
        }
      }
    },

    generateHighlightId() {
      return 'highlight_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    saveHighlight(range, highlightId, noteText = null) {
      try {
        // 获取高亮信息
        const highlightInfo = {
          id: highlightId,
          text: range.toString(),
          cfi: this.getCFIFromRange(range), // epubjs的CFI定位
          timestamp: Date.now(),
          bookId: this.fileName,
          note: noteText // 添加笔记字段
        };
        
        // 保存到本地存储
        this.saveHighlightToStorage(highlightInfo);
        
        // 添加到当前高亮列表
        this.highlights.push(highlightInfo);
        
        console.log('高亮信息已保存:', highlightInfo);
      } catch (error) {
        console.error('保存高亮信息失败:', error);
      }
    },

    getCFIFromRange() {
      try {
        // 尝试使用epubjs的CFI功能
        if (this.rendition && this.rendition.location) {
          const location = this.rendition.location;
          return location.start.cfi;
        }
        return null;
      } catch (error) {
        console.error('获取CFI失败:', error);
        return null;
      }
    },

    saveHighlightToStorage(highlightInfo) {
      try {
        const key = `highlights_${this.fileName}`;
        let highlights = JSON.parse(localStorage.getItem(key) || '[]');
        highlights.push(highlightInfo);
        localStorage.setItem(key, JSON.stringify(highlights));
      } catch (error) {
        console.error('保存到localStorage失败:', error);
      }
    },

    loadHighlights() {
      try {
        const key = `highlights_${this.fileName}`;
        const highlights = JSON.parse(localStorage.getItem(key) || '[]');
        this.highlights = highlights;
        console.log('加载高亮信息:', highlights);
        return highlights;
      } catch (error) {
        console.error('加载高亮信息失败:', error);
        return [];
      }
    },

    restoreHighlights() {
      const highlights = this.loadHighlights();
      if (highlights.length > 0) {
        // 等待内容加载完成后恢复高亮
        setTimeout(() => {
          this.restoreHighlightsForCurrentPage();
        }, 1000);
      }
    },

    restoreHighlightsForCurrentPage() {
      // 防止重复恢复
      if (this.isRestoringHighlights) {
        console.log('正在恢复高亮中，跳过重复调用');
        return;
      }
      
      const highlights = this.loadHighlights();
      if (highlights.length === 0) return;
      
      // 获取当前页面的CFI
      const currentCFI = this.rendition?.location?.start?.cfi;
      if (!currentCFI) return;
      
      // 设置恢复标志
      this.isRestoringHighlights = true;
      
      // 过滤出当前页面的高亮
      const currentPageHighlights = highlights.filter(highlight => {
        // 如果高亮有CFI信息，检查是否在当前页面
        if (highlight.cfi) {
          return this.isCFIInCurrentPage(highlight.cfi, currentCFI);
        }
        // 如果没有CFI信息，尝试在当前页面查找文本
        return true;
      });
      
      if (currentPageHighlights.length > 0) {
        console.log('恢复当前页面高亮，数量:', currentPageHighlights.length);
      }
      
      // 恢复当前页面的高亮（不改变页面位置）
      currentPageHighlights.forEach(highlight => {
        this.restoreHighlightWithoutNavigation(highlight);
      });
      
      // 延迟重置标志
      setTimeout(() => {
        this.isRestoringHighlights = false;
      }, 500);
    },

    isCFIInCurrentPage(highlightCFI, currentCFI) {
      try {
        // 简单的CFI比较：检查是否在同一章节
        const highlightChapter = highlightCFI.split('/')[1];
        const currentChapter = currentCFI.split('/')[1];
        return highlightChapter === currentChapter;
      } catch (error) {
        console.error('CFI比较失败:', error);
        return false;
      }
    },

    restoreHighlight(highlightInfo) {
      try {
        // 使用CFI定位到高亮位置
        if (highlightInfo.cfi && this.rendition) {
          this.rendition.display(highlightInfo.cfi).then(() => {
            // 在内容中查找并高亮文本
            this.findAndHighlightText(highlightInfo);
          });
        } else {
          // 如果没有CFI，直接查找文本
          this.findAndHighlightText(highlightInfo);
        }
      } catch (error) {
        console.error('恢复高亮失败:', error);
      }
    },

    restoreHighlightWithoutNavigation(highlightInfo) {
      try {
        // 直接在当前页面查找并高亮文本，不改变页面位置
        this.findAndHighlightText(highlightInfo);
      } catch (error) {
        console.error('恢复高亮失败:', error);
      }
    },

    findAndHighlightText(highlightInfo) {
      try {
        console.log('开始查找高亮文本:', highlightInfo.text);
        const viewer = document.getElementById('viewer');
        const iframes = viewer.getElementsByTagName('iframe');
        console.log('找到iframe数量:', iframes.length);
        
        for (let iframe of iframes) {
          try {
            const frameDocument = iframe.contentDocument;
            if (frameDocument) {
              // console.log('检查iframe:', iframe);
              
              // 检查是否已经存在这个高亮
              const existingHighlight = frameDocument.querySelector(`[data-highlight-id="${highlightInfo.id}"]`);
              if (existingHighlight) {
                console.log('高亮已存在，跳过:', highlightInfo.text);
                return;
              }
              
              // 查找包含高亮文本的元素（包括滚动内容）
              const allTextNodes = [];
              const walker = document.createTreeWalker(
                frameDocument.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
              );
              
              let node;
              while ((node = walker.nextNode())) {
                allTextNodes.push(node);
              }
              
              console.log('找到文本节点数量:', allTextNodes.length);
              
              // 在所有文本节点中查找高亮文本
              for (let textNode of allTextNodes) {
                if (textNode.textContent.includes(highlightInfo.text)) {
                  console.log('找到匹配的文本节点:', textNode.textContent.substring(0, 50) + '...');
                  
                  // 检查这个文本节点是否已经被高亮
                  const parent = textNode.parentNode;
                  if (parent && parent.classList && parent.classList.contains('epub-highlight')) {
                    console.log('文本已被高亮，跳过');
                    continue; // 跳过已经被高亮的文本
                  }
                  
                  // 找到文本，创建高亮
                  const range = document.createRange();
                  const startIndex = textNode.textContent.indexOf(highlightInfo.text);
                  range.setStart(textNode, startIndex);
                  range.setEnd(textNode, startIndex + highlightInfo.text.length);
                  
                                      const highlight = document.createElement('span');
                    highlight.className = 'epub-highlight';
                    highlight.style.backgroundColor = '#fef08a';
                    highlight.style.color = '#000';
                    highlight.setAttribute('data-highlight-id', highlightInfo.id);
                    
                    // 如果有笔记，添加特殊样式
                    if (highlightInfo.note) {
                      highlight.style.borderBottom = '2px solid #3b82f6';
                      highlight.style.borderBottomStyle = 'dotted';
                    }
                  
                  // 如果有笔记，添加特殊样式
                  if (highlightInfo.note) {
                    highlight.style.borderBottom = '2px solid #3b82f6';
                    highlight.style.borderBottomStyle = 'dotted';
                  }
                  
                  try {
                    range.surroundContents(highlight);
                    console.log('高亮已恢复:', highlightInfo.text);
                    
                    // 为新创建的高亮元素添加悬停事件
                    this.addHoverEventToHighlight(highlight);
                    
                    break;
                  } catch (error) {
                    console.log('高亮创建失败，尝试备用方法:', error);
                    // 备用方法：直接插入高亮元素
                    try {
                      const contents = range.extractContents();
                      highlight.appendChild(contents);
                      range.insertNode(highlight);
                      console.log('备用方法高亮已恢复:', highlightInfo.text);
                      
                      // 为新创建的高亮元素添加悬停事件
                      this.addHoverEventToHighlight(highlight);
                      
                      break;
                    } catch (error2) {
                      console.log('备用方法也失败:', error2);
                      continue;
                    }
                  }
                }
              }
            }
          } catch (e) {
            console.log('无法访问iframe:', e);
          }
        }
      } catch (error) {
        console.error('查找并高亮文本失败:', error);
      }
    },

    removeHighlight(highlightId) {
      try {
        // 从DOM中移除高亮元素
        const viewer = document.getElementById('viewer');
        const iframes = viewer.getElementsByTagName('iframe');
        
        for (let iframe of iframes) {
          try {
            const frameDocument = iframe.contentDocument;
            if (frameDocument) {
              const highlightElement = frameDocument.querySelector(`[data-highlight-id="${highlightId}"]`);
              if (highlightElement) {
                // 将高亮元素的内容替换为纯文本
                const parent = highlightElement.parentNode;
                const textContent = highlightElement.textContent;
                const textNode = document.createTextNode(textContent);
                parent.replaceChild(textNode, highlightElement);
                console.log('高亮已移除:', highlightId);
                break;
              }
            }
          } catch (e) {
            console.log('无法访问iframe:', e);
          }
        }
        
        // 从存储中移除高亮信息
        this.removeHighlightFromStorage(highlightId);
        
        // 从当前列表中移除
        this.highlights = this.highlights.filter(h => h.id !== highlightId);
        
      } catch (error) {
        console.error('移除高亮失败:', error);
      }
    },

    removeHighlightFromStorage(highlightId) {
      try {
        const key = `highlights_${this.fileName}`;
        let highlights = JSON.parse(localStorage.getItem(key) || '[]');
        highlights = highlights.filter(h => h.id !== highlightId);
        localStorage.setItem(key, JSON.stringify(highlights));
        console.log('高亮信息已从存储中移除:', highlightId);
      } catch (error) {
        console.error('从存储中移除高亮失败:', error);
      }
    },

    clearAllHighlights() {
      try {
        // 清除所有高亮元素
        const viewer = document.getElementById('viewer');
        const iframes = viewer.getElementsByTagName('iframe');
        
        for (let iframe of iframes) {
          try {
            const frameDocument = iframe.contentDocument;
            if (frameDocument) {
              const highlightElements = frameDocument.querySelectorAll('.epub-highlight');
              highlightElements.forEach(element => {
                const parent = element.parentNode;
                const textContent = element.textContent;
                const textNode = document.createTextNode(textContent);
                parent.replaceChild(textNode, element);
              });
            }
          } catch (e) {
            console.log('无法访问iframe:', e);
          }
        }
        
        // 清除存储
        const key = `highlights_${this.fileName}`;
        localStorage.removeItem(key);
        
        // 清空当前列表
        this.highlights = [];
        
        console.log('所有高亮已清除');
      } catch (error) {
        console.error('清除所有高亮失败:', error);
      }
    },

    addHighlightHoverEvents(doc) {
      // 为现有的高亮元素添加悬停事件
      const highlightElements = doc.querySelectorAll('.epub-highlight');
      highlightElements.forEach(element => {
        this.addHoverEventToHighlight(element);
      });
      
      // 监听新添加的高亮元素
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.classList && node.classList.contains('epub-highlight')) {
                this.addHoverEventToHighlight(node);
              }
              // 检查子元素
              const childHighlights = node.querySelectorAll('.epub-highlight');
              childHighlights.forEach(element => {
                this.addHoverEventToHighlight(element);
              });
            }
          });
        });
      });
      
      observer.observe(doc.body, {
        childList: true,
        subtree: true
      });
    },

    addHoverEventToHighlight(element) {
      // 移除现有的事件监听器（避免重复）
      element.removeEventListener('mouseenter', this.handleHighlightHover);
      element.removeEventListener('mouseleave', this.handleHighlightLeave);
      
      // 添加新的事件监听器
      element.addEventListener('mouseenter', this.handleHighlightHover);
      element.addEventListener('mouseleave', this.handleHighlightLeave);
    },

    handleHighlightHover(event) {
      const highlightElement = event.target;
      const highlightId = highlightElement.getAttribute('data-highlight-id');
      
      if (highlightId) {
        this.isHoveringHighlight = true;
        this.hoveredHighlightId = highlightId;
        
        // 获取正确的菜单位置，考虑iframe的偏移
        const viewer = document.getElementById('viewer');
        const iframes = viewer.getElementsByTagName('iframe');
        let menuX = 0;
        let menuY = 0;
        
        // 查找包含高亮元素的iframe
        for (let iframe of iframes) {
          try {
            const frameDocument = iframe.contentDocument;
            if (frameDocument && frameDocument.contains(highlightElement)) {
              // 获取iframe的位置
              const iframeRect = iframe.getBoundingClientRect();
              // 获取高亮元素在iframe内的位置
              const highlightRect = highlightElement.getBoundingClientRect();
              
              // 计算相对于页面的位置
              menuX = iframeRect.left + highlightRect.left + (highlightRect.width / 2);
              menuY = iframeRect.top + highlightRect.top - 10;
              break;
            }
          } catch (e) {
            console.log('无法访问iframe:', e);
          }
        }
        
        // 确保菜单在可视区域内
        const menuWidth = 120;
        const menuHeight = 80;
        const padding = 10;
        
        if (menuX + menuWidth > window.innerWidth) {
          menuX = window.innerWidth - menuWidth - padding;
        }
        
        if (menuY + menuHeight > window.innerHeight) {
          menuY = menuY - menuHeight - padding;
        }
        
        if (menuX < padding) {
          menuX = padding;
        }
        
        if (menuY < padding) {
          menuY = padding;
        }
        
        this.contextMenuPosition = { x: menuX, y: menuY };
        console.log("contextMenuPosition", this.contextMenuPosition);
        this.showContextMenu = true;
      }
    },

    handleHighlightLeave() {
      setTimeout(() => {
        if (!this.contextMenuHovering && !this.noteInputHovering) {
          this.isHoveringHighlight = false;
          this.hoveredHighlightId = null;
          this.showContextMenu = false;
          this.showNoteInput = false;
        }
      }, 200);
    },

    handleContextMenuLeave() {
      this.contextMenuHovering = false;
      setTimeout(() => {
        if (!this.isHoveringHighlight && !this.contextMenuHovering && !this.noteInputHovering) {
          this.showContextMenu = false;
        }
      }, 200);
    },

    handleNoteInputLeave() {
      this.noteInputHovering = false;
      setTimeout(() => {
        if (!this.isHoveringHighlight && !this.contextMenuHovering && !this.noteInputHovering) {
          this.showNoteInput = false;
        }
      }, 200);
    },

    getSelectedRangeFromIframe() {
      const viewer = document.getElementById('viewer');
      if (!viewer) return null;
      
      // 查找viewer内的iframe
      const iframes = viewer.getElementsByTagName('iframe');
      
      for (let iframe of iframes) {
        try {
          const frameWindow = iframe.contentWindow;
          const frameDocument = frameWindow && frameWindow.document;
          
          if (frameDocument && frameDocument.getSelection) {
            const selection = frameDocument.getSelection();
            if (selection.rangeCount > 0) {
              return selection.getRangeAt(0);
            }
          }
        } catch (e) {
          console.log('无法访问iframe内容:', e);
        }
      }
      
      return null;
    },

    handleTextSelection(event) {
      console.log("handleTextSelection", event)
      
      // 只处理左键点击 (button === 0)
      if (event.button !== 0) {
        console.log("非左键点击，忽略");
        return;
      }
      
      setTimeout(() => {
        // 获取选中的文本，支持iframe
        const selectedText = this.getSelectedTextFromIframe();
        console.log("selectedText", selectedText)
        
        if (!selectedText) {
          this.showContextMenu = false;
          return;
        }
        
        this.selectedText = selectedText;
        
        // 获取正确的鼠标位置，考虑iframe的滚动位置
        const viewer = document.getElementById('viewer');
        const iframes = viewer.getElementsByTagName('iframe');
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        
        // 如果事件来自iframe，需要调整位置
        for (let iframe of iframes) {
          try {
            const frameWindow = iframe.contentWindow;
            if (frameWindow && frameWindow.document === event.target.ownerDocument) {
              // 事件来自这个iframe，需要调整位置
              const iframeRect = iframe.getBoundingClientRect();
              
              // 使用iframe内的鼠标位置
              mouseX = iframeRect.left + event.clientX;
              mouseY = iframeRect.top + event.clientY;
              break;
            }
          } catch (e) {
            console.log('无法访问iframe:', e);
          }
        }
        
        // 计算上下文菜单位置，确保在可视区域内
        const menuWidth = 120; // 菜单宽度
        const menuHeight = 80; // 菜单高度
        const padding = 10;
        
        let x = mouseX;
        let y = mouseY + 10;
        
        // 确保菜单不超出右边界
        if (x + menuWidth > window.innerWidth) {
          x = window.innerWidth - menuWidth - padding;
        }
        
        // 确保菜单不超出下边界
        if (y + menuHeight > window.innerHeight) {
          y = mouseY - menuHeight - padding;
        }
        
        // 确保菜单不超出左边界
        if (x < padding) {
          x = padding;
        }
        
        // 确保菜单不超出上边界
        if (y < padding) {
          y = padding;
        }
        
        this.contextMenuPosition = { x, y };
        
        this.showContextMenu = true;
        console.log('showContextMenu设置为true，位置:', this.contextMenuPosition);
        console.log('窗口尺寸:', window.innerWidth, 'x', window.innerHeight);
        console.log('原始事件位置:', event.clientX, event.clientY);
        console.log('调整后位置:', mouseX, mouseY);
      }, 50);
    },

    getSelectedTextFromIframe() {
      const viewer = document.getElementById('viewer');
      if (!viewer) return '';
      
      // 查找viewer内的iframe
      const iframes = viewer.getElementsByTagName('iframe');
      
      for (let iframe of iframes) {
        try {
          const frameWindow = iframe.contentWindow;
          const frameDocument = frameWindow && frameWindow.document;
          
          if (frameDocument) {
            if (frameDocument.getSelection) {
              // 大多数浏览器
              const selection = frameDocument.getSelection();
              const text = String(selection);
              if (text && text.trim()) {
                return text.trim();
              }
            } else if (frameDocument.selection) {
              // Internet Explorer 8 及以下
              const text = frameDocument.selection.createRange().text;
              if (text && text.trim()) {
                return text.trim();
              }
            } else if (frameWindow.getSelection) {
              // Safari 3
              const selection = frameWindow.getSelection();
              const text = String(selection);
              if (text && text.trim()) {
                return text.trim();
              }
            }
          }
        } catch (e) {
          console.log('无法访问iframe内容:', e);
        }
      }
      
      // 如果没有找到iframe，尝试从主文档获取
      const selection = window.getSelection();
      const text = String(selection);
      return text ? text.trim() : '';
    },

    hideContextMenu(event) {
      console.log('hideContextMenu被调用', event);
      // 如果点击的是上下文菜单本身，不隐藏
      if (event && event.target && event.target.closest('.context-menu')) {
        console.log('点击的是上下文菜单本身，不隐藏');
        return;
      }
      this.showContextMenu = false;
      this.isHoveringHighlight = false;
      this.hoveredHighlightId = null;
      console.log('showContextMenu设置为false');
    },

    handleResize() {
      this.isResizing = true;
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.isResizing = false;
      }, 100);
    },

    // 阅读进度跟踪方法
    checkReadingProgress() {
      const readingKey = `reading-progress-${this.fileName}`;
      const lastReading = localStorage.getItem(readingKey);
      
      if (lastReading) {
        try {
          const lastReadingData = JSON.parse(lastReading);
          const now = new Date();
          const lastTime = new Date(lastReadingData.timestamp);
          const timeDiff = now - lastTime;
          
          // 如果距离上次阅读超过1小时，显示提醒
          if (timeDiff >  1000) {
            this.lastReadingInfo = {
              timestamp: lastReadingData.timestamp,
              content: lastReadingData.content,
              progress: lastReadingData.progress,
              duration: lastReadingData.duration
            };
            console.log("lastReadingInfo", this.lastReadingInfo)
            this.showReadingProgressModal = true;
          }
        } catch (error) {
          console.error('解析阅读进度数据失败:', error);
        }
      }
    },

    saveReadingProgress() {
      if (!this.rendition) return;
      
      try {
        const currentLocation = this.rendition.currentLocation();
        if (!currentLocation || !currentLocation.start) return;
        
        // 获取当前页面内容
        const currentContent = this.getCurrentPageContent();
        
        // 计算阅读进度（基于CFI位置）
        const progress = this.calculateReadingProgress();
        
        // 计算阅读时长（这里简化处理，实际可以更精确）
        const duration = this.calculateReadingDuration();
        
        const readingData = {
          timestamp: new Date().toISOString(),
          cfi: currentLocation.start.cfi,
          content: currentContent,
          progress: progress,
          duration: duration
        };
        
        const readingKey = `reading-progress-${this.fileName}`;
        localStorage.setItem(readingKey, JSON.stringify(readingData));
        
        // 触发进度更新事件
        window.dispatchEvent(new CustomEvent('reading-progress-updated', {
          detail: { fileName: this.fileName }
        }));
        
      } catch (error) {
        console.error('保存阅读进度失败:', error);
      }
    },

    getCurrentPageContent() {
      try {
        const viewer = document.getElementById('viewer');
        if (!viewer) return '';
        
        const iframes = viewer.getElementsByTagName('iframe');
        for (let iframe of iframes) {
          try {
            const frameDocument = iframe.contentDocument || iframe.contentWindow.document;
            if (frameDocument) {
              const textContent = frameDocument.body.textContent || '';
              // 返回前100个字符
              return textContent.substring(0, 100).trim() + (textContent.length > 100 ? '...' : '');
            }
          } catch (e) {
            console.log('无法访问iframe内容:', e);
          }
        }
        return '';
      } catch (error) {
        console.error('获取当前页面内容失败:', error);
        return '';
      }
    },

    calculateReadingProgress() {
      try {
        if (!this.book || !this.rendition) return 0;
        
        const currentLocation = this.rendition.currentLocation();
        if (!currentLocation || !currentLocation.start) return 0;
        
        // 获取总章节数
        const totalChapters = this.book.spine.length;
        const currentChapter = currentLocation.start.index;
        
        // 简化的进度计算（基于章节）
        return Math.round((currentChapter / totalChapters) * 100);
      } catch (error) {
        console.error('计算阅读进度失败:', error);
        return 0;
      }
    },

    calculateReadingDuration() {
      // 简化的阅读时长计算（这里返回固定值，实际可以基于时间差计算）
      return 15; // 假设上次阅读了15分钟
    },

    formatLastReadingTime() {
      if (!this.lastReadingInfo?.timestamp) return '未知时间';
      
      try {
        const lastTime = new Date(this.lastReadingInfo.timestamp);
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

    closeReadingProgressModal() {
      this.showReadingProgressModal = false;
    },

    continueReading() {
      this.closeReadingProgressModal();
      // 可以在这里添加跳转到上次阅读位置的逻辑
    },

    // 保存章节摘要到本地存储
    saveChapterSummary(chapterId, summaryText) {
      try {
        const summaryKey = `summary_${this.fileName}_${chapterId}`;
        const summaryData = {
          text: summaryText,
          timestamp: new Date().toISOString(),
          bookId: this.fileName,
          chapterId: chapterId
        };
        localStorage.setItem(summaryKey, JSON.stringify(summaryData));
        console.log('章节摘要已保存:', chapterId);
      } catch (error) {
        console.error('保存章节摘要失败:', error);
      }
    },

    // 从本地存储加载章节摘要
    loadChapterSummary(chapterId) {
      try {
        const summaryKey = `summary_${this.fileName}_${chapterId}`;
        const summaryData = localStorage.getItem(summaryKey);
        
        if (summaryData) {
          const parsedData = JSON.parse(summaryData);
          console.log('找到章节摘要:', chapterId);
          return parsedData.text;
        } else {
          console.log('未找到章节摘要:', chapterId);
          return null;
        }
      } catch (error) {
        console.error('加载章节摘要失败:', error);
        return null;
      }
    },

    // 取消当前摘要请求
    cancelCurrentSummaryRequest() {
      if (this.currentAbortController) {
        console.log('取消当前摘要请求');
        this.currentAbortController.abort();
        this.currentAbortController = null;
        this.isGeneratingSummary = false;
        this.summaryText = '';
      }
    },

    // 生成精确的章节ID
    generateChapterId(location) {
      try {
        if (!location || !location.start) {
          return null;
        }

        // 使用多个标识符组合生成唯一的章节ID
        const href = location.start.href || '';
        const cfi = location.start.cfi || '';
        const index = location.start.index || 0;
        
        // 提取章节文件名（去掉路径和扩展名）
        let chapterName = '';
        if (href) {
          const urlParts = href.split('/');
          const fileName = urlParts[urlParts.length - 1];
          chapterName = fileName.split('.')[0]; // 去掉扩展名
        }
        
        // 组合生成章节ID
        const chapterId = `${chapterName}_${index}`;
        
        console.log('生成章节ID详情:', {
          href,
          cfi: cfi.substring(0, 20),
          index,
          chapterName,
          finalId: chapterId
        });
        
        return chapterId;
      } catch (error) {
        console.error('生成章节ID失败:', error);
        // 备用方案：使用CFI的前20个字符
        return location.start.cfi ? location.start.cfi.substring(0, 20) : 'unknown';
      }
    },

    async generateQuiz() {
      if (!this.plainTextContent || !this.ai) {
        alert('请先设置Gemini API Key或等待内容加载完成');
        return;
      }

      this.isGeneratingQuiz = true;
      this.showQuizModal = true;
      this.quizData = [];
      this.currentQuizIndex = 0;
      this.userAnswers = [];
      this.quizCompleted = false;
      this.quizScore = 0;

      try {
        const prompt = `In order for me to better understand the content of the chapter, please give me 3 quizes, each with 3 choices. with the format: Question: ...... ||Choices: A......,B....,C....||Correct:A/B/C.

Content: ${this.plainTextContent.substring(0, 2000)}`;

        const response = await this.ai.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: prompt
        });

        const quizText = response.text;
        console.log('Quiz生成结果:', quizText);

        // 解析Quiz数据
        this.quizData = this.parseQuizResponse(quizText);
        
        if (this.quizData.length === 0) {
          throw new Error('无法解析Quiz数据');
        }

        console.log('解析后的Quiz数据:', this.quizData);

      } catch (error) {
        console.error('生成Quiz失败:', error);
        alert('生成Quiz失败，请重试');
        this.closeQuizModal();
      } finally {
        this.isGeneratingQuiz = false;
      }
    },

    parseQuizResponse(responseText) {
      const quizzes = [];
      
      // 尝试多种解析方式
      // const patterns = [
      //   // 模式1: Question: ... || Choices: A...,B...,C... || Correct: A/B/C
      //   /Question:\s*(.+?)\s*\|\|\s*Choices:\s*(A[^,]+),?\s*(B[^,]+),?\s*(C[^,]+)\s*\|\|\s*Correct:\s*(A|B|C)/gi,
        
      //   // 模式2: 分别匹配
      //   /Question:\s*(.+?)(?=\s*Choices:|$)/gi,
      //   /Choices:\s*(A[^,]+),?\s*(B[^,]+),?\s*(C[^,]+)/gi,
      //   /Correct:\s*(A|B|C)/gi
      // ];
      
      // 首先尝试模式1（完整匹配）
      let match;
      const fullPattern = /Question:\s*(.+?)\s*\|\|\s*Choices:\s*(A[^,]+),?\s*(B[^,]+),?\s*(C[^,]+)\s*\|\|\s*Correct:\s*(A|B|C)/gi;
      
      while ((match = fullPattern.exec(responseText)) !== null) {
        const question = match[1].trim();
        const choiceA = match[2].trim();
        const choiceB = match[3].trim();
        const choiceC = match[4].trim();
        const correct = match[5].trim();
        
        const correctMap = { 'A': 0, 'B': 1, 'C': 2 };
        
        quizzes.push({
          question: question,
          choices: [choiceA, choiceB, choiceC],
          correctAnswer: correctMap[correct]
        });
      }
      
      // 如果模式1没有找到，尝试模式2（分别匹配）
      if (quizzes.length === 0) {
        const lines = responseText.split('\n');
        let currentQuiz = null;
        
        for (let line of lines) {
          line = line.trim();
          if (!line) continue;
          
          // 匹配问题
          if (line.startsWith('Question:')) {
            if (currentQuiz && currentQuiz.choices.length === 3 && currentQuiz.correctAnswer !== null) {
              quizzes.push(currentQuiz);
            }
            currentQuiz = {
              question: line.replace('Question:', '').trim(),
              choices: [],
              correctAnswer: null
            };
          }
          // 匹配选项
          else if (line.startsWith('Choices:')) {
            const choicesText = line.replace('Choices:', '').trim();
            // 更灵活的选项分割
            const choices = choicesText.split(/[,，]/).map(c => c.trim()).filter(c => c);
            if (currentQuiz && choices.length >= 3) {
              currentQuiz.choices = choices.slice(0, 3);
            }
          }
          // 匹配正确答案
          else if (line.startsWith('Correct:')) {
            const correctText = line.replace('Correct:', '').trim();
            if (currentQuiz) {
              const correctMap = { 'A': 0, 'B': 1, 'C': 2 };
              currentQuiz.correctAnswer = correctMap[correctText];
            }
          }
        }
        
        // 添加最后一个quiz
        if (currentQuiz && currentQuiz.choices.length === 3 && currentQuiz.correctAnswer !== null) {
          quizzes.push(currentQuiz);
        }
      }
      
      // 如果还是没有找到，尝试更宽松的匹配
      if (quizzes.length === 0) {
        const questionMatches = responseText.match(/Question:\s*(.+?)(?=\s*Choices:|$)/gi);
        const choiceMatches = responseText.match(/Choices:\s*(.+?)(?=\s*Correct:|$)/gi);
        const correctMatches = responseText.match(/Correct:\s*(A|B|C)/gi);
        
        if (questionMatches && choiceMatches && correctMatches) {
          const minLength = Math.min(questionMatches.length, choiceMatches.length, correctMatches.length);
          
          for (let i = 0; i < minLength; i++) {
            const question = questionMatches[i].replace('Question:', '').trim();
            const choicesText = choiceMatches[i].replace('Choices:', '').trim();
            const choices = choicesText.split(/[,，]/).map(c => c.trim()).filter(c => c).slice(0, 3);
            const correct = correctMatches[i].replace('Correct:', '').trim();
            
            if (choices.length === 3) {
              const correctMap = { 'A': 0, 'B': 1, 'C': 2 };
              quizzes.push({
                question: question,
                choices: choices,
                correctAnswer: correctMap[correct]
              });
            }
          }
        }
      }
      
      console.log('解析结果:', quizzes);
      return quizzes;
    },

    selectAnswer(choiceIndex) {
      this.userAnswers[this.currentQuizIndex] = choiceIndex;
    },

    nextQuestion() {
      if (this.currentQuizIndex < this.quizData.length - 1) {
        this.currentQuizIndex++;
      }
    },

    previousQuestion() {
      if (this.currentQuizIndex > 0) {
        this.currentQuizIndex--;
      }
    },

    submitQuiz() {
      // 计算得分
      let score = 0;
      for (let i = 0; i < this.quizData.length; i++) {
        if (this.userAnswers[i] === this.quizData[i].correctAnswer) {
          score++;
        }
      }
      
      this.quizScore = score;
      this.quizCompleted = true;
    },

    retakeQuiz() {
      this.currentQuizIndex = 0;
      this.userAnswers = [];
      this.quizCompleted = false;
      this.quizScore = 0;
    },

    closeQuizModal() {
      this.showQuizModal = false;
      this.isGeneratingQuiz = false;
      this.quizData = [];
      this.currentQuizIndex = 0;
      this.userAnswers = [];
      this.quizCompleted = false;
      this.quizScore = 0;
    },

    // 聊天相关方法
    openChatSidebar() {
      this.showChatSidebar = true;
      // 如果边栏已打开，关闭它
      if (this.showSidebar) {
        this.closeSidebarWithCancel();
      }
    },

    closeChatSidebar() {
      this.showChatSidebar = false;
    },

    async sendMessage() {
      if (!this.currentChatMessage.trim() || this.isSendingMessage) {
        return;
      }

      const userMessage = this.currentChatMessage.trim();
      
      // 添加用户消息
      this.chatMessages.push({
        content: userMessage,
        isUser: true,
        timestamp: new Date()
      });

      // 清空输入框
      this.currentChatMessage = '';
      
      // 设置发送状态
      this.isSendingMessage = true;

      // 滚动到底部
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      try {
        // 构建上下文，包含当前章节内容
        const context = this.plainTextContent ? `当前章节内容：${this.plainTextContent.substring(0, 1000)}` : '';
        const prompt = `${context}\n\n用户问题：${userMessage}\n\n请用中文回答，回答要简洁明了。`;

        const response = await this.ai.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: prompt
        });

        // 添加AI回复
        this.chatMessages.push({
          content: response.text,
          isUser: false,
          timestamp: new Date()
        });

      } catch (error) {
        console.error('发送消息失败:', error);
        // 添加错误消息
        this.chatMessages.push({
          content: '抱歉，我遇到了一些问题，请稍后再试。',
          isUser: false,
          timestamp: new Date()
        });
      } finally {
        this.isSendingMessage = false;
        // 滚动到底部
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    scrollToBottom() {
      if (this.$refs.chatMessagesContainer) {
        this.$refs.chatMessagesContainer.scrollTop = this.$refs.chatMessagesContainer.scrollHeight;
      }
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },

    async generateGeminiSummary(content) {
      this.isGeneratingGeminiSummary = true;
      this.lastReadingSummary = '';
      try {
        if (!this.ai) {
          this.ai = new GoogleGenAI(this.geminiApiKey);
        }
        const prompt = `请用简洁的语言总结以下阅读内容的要点，突出核心信息和主要脉络(100字内）：\n${content}`;
        const result = await this.ai.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: prompt
        });
        this.lastReadingSummary = result.text;
      } catch (e) {
        this.lastReadingSummary = 'AI总结生成失败';
      } finally {
        this.isGeneratingGeminiSummary = false;
      }
    },

  },

  watch: {
    fileName: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadBook();
        }
      },
      immediate: true,
    },
    showReadingProgressModal(val) {
      if (val && this.lastReadingInfo?.content) {
        this.generateGeminiSummary(this.lastReadingInfo.content)
      }
    },
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('beforeunload', this.saveCurrentLocation);
    window.addEventListener('click', (event) => this.hideContextMenu(event));
    window.addEventListener('mouseup', this.handleTextSelection);

    if (!this.fileName) {
      const savedFileName = localStorage.getItem('currentBook');
      if (savedFileName) {
        this.$router.replace({ name: 'BookReader', params: { fileName: savedFileName } });
      } else {
        this.$router.push({ name: 'Home' });
      }
    } else {
      localStorage.setItem('currentBook', this.fileName);
      this.loadBook();
    }

  },

  beforeUnmount() {
    // 清理事件监听器
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('beforeunload', this.saveCurrentLocation);
    window.removeEventListener('click', (event) => this.hideContextMenu(event));
    window.removeEventListener('mouseup', this.handleTextSelection);

    // 清理定时器
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    // 清理 epub.js 资源
    if (this.rendition) {
      try {
        this.rendition.destroy();
      } catch (error) {
        console.log('清理 rendition 时出错:', error);
      }
    }

    if (this.book) {
      try {
        this.book.destroy();
      } catch (error) {
        console.log('清理 book 时出错:', error);
      }
    }

    // 清理高亮相关的定时器
    if (this.isRestoringHighlights) {
      this.isRestoringHighlights = false;
    }

    // 隐藏所有菜单
    this.showContextMenu = false;
    this.showNoteInput = false;
    this.isHoveringHighlight = false;
    this.hoveredHighlightId = null;

    // 清理 DOM 元素
    const viewer = document.getElementById('viewer');
    if (viewer) {
      viewer.innerHTML = '';
    }
  },
};
</script>

<style scoped>
.book-content {
  transition: margin-right 0.3s cubic-bezier(0.4,0,0.2,1), max-width 0.3s cubic-bezier(0.4,0,0.2,1);
  margin-right: 0;
  max-width: 100vw;
  margin-left: auto;
  margin-right: auto;
}
.book-content.with-sidebar {
  margin-right: 384px; /* Sidebar宽度w-96*/
  max-width: calc(100vw - 384px);
}
.book-content.with-chat-sidebar {
  margin-right: 384px; /* Chat Sidebar宽度w-96*/
  max-width: calc(100vw - 384px);
}
@media (max-width: 900px) {
  .book-content.with-sidebar {
    margin-right: 0;
    max-width: 100vw;
  }
}
</style>