<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader @upload-books="uploadBooks" />

    <div class="drop flex-grow h-full w-full " @dragover.prevent @drop="uploadBooks">
     
      <div class="content w-full px-4 sm:px-6">

        <!-- 主标题和诗意正文 -->
        <div class="text-center py-12 mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            Reading about:<br>
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hobby and Life
            </span>
          </h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed italic">
              "To wander pages, to unearth life's poetry in words. Every book, a mark of time; every read, a soul's quiet conversation. Weave passions into living, and plumb the boundless depths of knowledge."
            </p>
            <p class="text-base text-gray-500 dark:text-gray-400 mt-4">
              Here, every book becomes a chapter in your life's own story.
            </p>
          </div>
        </div>

        <!-- 视图切换开关 -->
        <div class="flex justify-center mb-8">
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
            <button
              @click="currentView = 'shelf'"
              :class="[
                'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                currentView === 'shelf'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              📚 Shelf
            </button>
            <button
              @click="currentView = 'graph'"
              :class="[
                'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                currentView === 'graph'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              📊 Graph
            </button>
          </div>
        </div>

        <!-- Shelf 视图 -->
        <div v-if="currentView === 'shelf'">
          <!-- 书架标题 -->
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            📚 Shelf
          </h2>

          <!-- 空状态 -->
          <div v-if="books.length === 0" class="text-center py-16">
            <div class="max-w-md mx-auto mb-8">
              <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">你的书架还是空的</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">点击下方的"添加书籍"按钮开始你的阅读之旅</p>
            </div>
          </div>

          <!-- 书籍列表 -->
          <div id="bookCatalog" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            <!-- 添加书籍按钮 - 始终显示 -->
            <AddBook 
              :color="getRandomColor()"
              @upload-books="uploadBooks"
            />

            <!-- 现有书籍 -->
            <BookThumbnail
              v-for="(book, index) in books"
              :key="index"
              :book="book"
              @open-book="openBook"
              @delete-book="deleteBook"
            />
          </div>
        </div>

        <!-- Graph 视图 -->
        <div v-if="currentView === 'graph'" class="min-h-[500px] relative">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            📊 Graph
          </h2>
          <div class="flex justify-end mb-4">
            <button id="reload-graph-btn"
              @click="reloadGraph"
              style="padding: 8px 18px; font-size: 14px; background: #2f2f2f; border: 1px solid #444; border-radius: 8px; color: #eee; cursor: pointer; transition: background 0.2s ease;"
              @mouseover="hoverReloadBtn = true"
              @mouseout="hoverReloadBtn = false"
              :style="hoverReloadBtn ? 'background:#444' : 'background:#2f2f2f'"
            >刷新图谱</button>
          </div>
          <div
            id="mynetwork"
            class="rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-all duration-300"
            style="height:500px;width:100%;min-height:500px;box-sizing:border-box;overflow:hidden;"
          ></div>
          <!-- 图谱节点弹窗 -->
          <div id="node-popup" class="fixed inset-0 flex items-center justify-center z-[6000]" style="display:none;" @click="closePopup">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div class="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col max-w-4xl w-full mx-4 max-h-[90vh]" @click.stop>
            <!-- 弹窗头部 -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-t-2xl">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-white" id="popup-header">节点信息</h3>
                    <p class="text-blue-100 text-sm">知识图谱节点详情</p>
                  </div>
                </div>
                <button @click="closePopup" class="text-white/80 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 弹窗内容区域（可滚动） -->
            <div class="flex-1 overflow-y-auto p-6" id="popup-content">
              <!-- 内容将通过JavaScript动态插入 -->
            </div>

            <!-- 弹窗底部 -->
            <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-2xl border-t border-gray-200 dark:border-gray-600">
              <div class="flex justify-end space-x-3">
                <button @click="closePopup" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  关闭
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter class="mt-auto" />

    <AlertToast v-if="showAlert" :message="alertMessage" @close="showAlert = false" />
  </div>
</template>

<script>
import ePub from 'epubjs'
import localforage from 'localforage'
import AppHeader from '@/components/common/Header.vue'
import AppFooter from '@/components/common/Footer.vue'
import BookThumbnail from '@/components/common/BookThumbnail.vue'
import AddBook from '@/components/common/AddBook.vue'
import AlertToast from '@/components/common/AlertToast.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    AppFooter,
    BookThumbnail,
    AddBook,
    AlertToast
  },
  data() {
    return {
      books: [],
      currentView: 'shelf',
      hoverReloadBtn: false,
      colors: [
        '#BC5377', '#B04C63', '#B25564', '#C15859', '#BF6150', '#C76849', '#C57140', 
        '#C68245', '#D0953E', '#DAB062', '#D9AB60', '#C4AC58', '#B6AC56', '#B0BB6D', 
        '#969F68', '#83A86B', '#69A076', '#5CA58A', '#47938F', '#3C8585', '#6B7096'
      ],
      showAlert: false,
      alertMessage: ''
    }
  },
  watch: {
    currentView(val) {
      if (val === 'graph') {
        this.$nextTick(() => {
          this.reloadGraph();
        });
      }
    }
  },
  mounted() {
    if (this.currentView === 'graph') {
      this.reloadGraph();
    }
  },
  methods: {
    getRandomColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
    async uploadBooks(event) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer ? event.dataTransfer.files : event.target.files);
      const duplicateTitles = [];
      const errorFiles = [];

      for (let file of files) {
        try {
          const bookData = await new Response(file).arrayBuffer();
          const book = ePub(bookData);
          await book.loaded.metadata;

          const metadata = await book.loaded.metadata;
          const title = metadata.title || 'Untitled';

          // Check if a book with the same title already exists
          const existingBook = this.books.find(b => b.title.toLowerCase() === title.toLowerCase());
          if (existingBook) {
            duplicateTitles.push(title);
            continue; // Skip to the next file
          }

          let coverUrl = null;
          if (book.cover) {
            try {
              coverUrl = await book.archive.createUrl(book.cover);
            } catch (error) {
              console.error(`Error creating URL for book cover: ${error}`);
            }
          }

          const bookInfo = {
            fileName: file.name,
            title: title,
            author: metadata.creator || '',
            coverUrl: coverUrl,
            color: this.getRandomColor()
          };

          // Store both book data and info in the same object
          await localforage.setItem(file.name, { data: bookData, info: bookInfo });

          this.books.push(bookInfo);

          console.log(`Successfully added ${file.name} to the library.`);
        } catch (error) {
          console.error(`Error processing file "${file.name}":`, error);
          errorFiles.push(file.name);
        }
      }

      // Show alert for duplicate titles
      if (duplicateTitles.length > 0) {
        const message = duplicateTitles.length === 1
          ? `"${duplicateTitles[0]}" already exists in your library.`
          : `The following books already exist in your library: ${duplicateTitles.join(', ')}`;
        this.showAlertMessage(message);
      }

      // Show alert for error files
      if (errorFiles.length > 0) {
        const message = errorFiles.length === 1
          ? `Unable to process "${errorFiles[0]}". It may not be a valid EPUB file.`
          : `Unable to process the following files: ${errorFiles.join(', ')}. They may not be valid EPUB files.`;
        this.showAlertMessage(message);
      }
    },
    openBook(fileName) {
      this.$router.push({ name: 'BookReader', params: { fileName } });
    },
    async deleteBook(fileName) {
      await localforage.removeItem(fileName);
      this.books = this.books.filter(book => book.fileName !== fileName);
    },
    showAlertMessage(message) {
      this.alertMessage = message;
      this.showAlert = true;
    },
    reloadGraph() {
      // 你可以根据实际情况修改 user_id 获取方式
      const userId = 'Hobby and Life'; // 或从登录信息获取
      fetch(`https://graph-service.zeabur.app/graph_data?user_id=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => {
          if (data.status !== "success") {
            alert("图谱加载失败：" + data.message);
            return;
          }
          const nodes = new window.vis.DataSet(this.processNodes(data.nodes));
          const edges = new window.vis.DataSet(data.edges);
          const container = document.getElementById("mynetwork");
          const options = {
                    nodes: {
                    shape: "dot",
                    size: 30,  // 节点基础大小，后续可根据 degree 动态映射
                    font: {
                        face: "Helvetica Neue, Inter, sans-serif",
                        size: 16,
                        color: "#FFFFFF",
                        strokeWidth: 0,
                        bold: {
                        color: "#FFFFFF",
                        size: 18, // 鼠标悬浮时稍大
                        face: "Helvetica Neue"
                        }
                    },
                    color: {
                        background: "#2C2C2E",
                        border: "#4F4F4F",
                        highlight: {
                        background: "#444",  // 改为深灰
                        border: "#888"       // 柔和边框高亮
                        },
                        hover: {
                        background: "#555",
                        border: "#AAA"
                        }
                    },
                    borderWidth: 1,
                    borderWidthSelected: 2
                    },
                    edges: {
                    color: {
                        color: "#999999",
                        highlight: "#ffffff",
                        hover: "#ffffff"
                    },
                    width: 1,
                    smooth: {
                        type: "dynamic"
                    },
                    font: {
                        color: "#bbbbbb",
                        size: 12,
                        face: "Inter, Helvetica Neue, sans-serif",
                        background: "rgba(30, 30, 30, 0.5)",
                        strokeWidth: 0,
                        align: "middle",
                        vadjust: -2
                    },
                    arrows: {
                        to: { enabled: false }
                    }
                    },
                    interaction: {
                        hover: true,
                        tooltipDelay: 100,
                        hideEdgesOnDrag: false
                    },
                    physics: {
                        enabled: true,
                        solver: "forceAtlas2Based",
                        forceAtlas2Based: {
                        gravitationalConstant: -100,
                        centralGravity: 0.02,
                        springLength: 150,
                        springConstant: 0.05,
                        damping: 0.65
                        },
                        stabilization: {
                        enabled: true,
                        iterations: 250,
                        fit: true
                        }
                    },
                    layout: {
                        improvedLayout: true,
                    }
                    };
          const network = new window.vis.Network(container, { nodes, edges }, options);
          network.on("click", params => this.handleNodeClick(params, nodes));
        });
    },
    processNodes(rawNodes) {
      return rawNodes.map(n => ({
        ...n,
        shape: "circle",
        fixed: { width: true, height: true },
        widthConstraint: { maximum: 80 },
        font: { size: 14 }
      }));
    },
    handleNodeClick(params, nodes) {
      if (params.nodes.length === 0) return;
      const nodeId = params.nodes[0];
      const nodeData = nodes.get(nodeId);
      const nodeUUID = nodeData.id;
      const popup = document.getElementById("node-popup");
      const popupContent = document.getElementById("popup-content");
      popup.style.display = "flex";
      popupContent.innerHTML = `
        <div class="space-y-6">
          <!-- 节点基本信息 -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">节点信息</h4>
            <div class="space-y-2">
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">节点名称：</span>
                <span class="text-gray-800 dark:text-gray-200">${nodeData.label}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">创建时间：</span>
                <span class="text-gray-800 dark:text-gray-200">${this.formatDate(nodeData.created_at) || "(未知)"}</span>
              </div>
            </div>
          </div>

          <!-- 知识描述 -->
          <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border-l-4 border-blue-500">
            <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">知识描述</h4>
            <div class="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              ${nodeData.title || "(无描述)"}
            </div>
          </div>

          <!-- 加载状态 -->
          <div id="episode-loading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p class="text-gray-600 dark:text-gray-400">正在加载相关笔记与摘要...</p>
          </div>
        </div>
      `;
      popup.style.display = "block";
      fetch(`https://graph-service.zeabur.app/node_episodes?node_uuid=${encodeURIComponent(nodeUUID)}`)
        .then(res => res.json())
        .then(data => {
          const loadingDiv = document.getElementById("episode-loading");
          if (data.status !== "success") {
            loadingDiv.innerHTML = `
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span class="text-red-700 dark:text-red-300">加载失败：${data.message}</span>
                </div>
              </div>
            `;
            return;
          }
          if (data.episodes.length === 0) {
            loadingDiv.innerHTML = `
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-400 mx-auto mb-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <p class="text-gray-600 dark:text-gray-400">暂无关联笔记或摘要</p>
              </div>
            `;
            return;
          }
          const notes = data.episodes.filter(ep => ep.type === "note");
          const summaries = data.episodes.filter(ep => ep.type === "summary");
          let combinedHTML = "";
          
          if (notes.length > 0) {
            combinedHTML += `
              <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border-l-4 border-green-500">
                <h4 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  关联笔记 (${notes.length})
                </h4>
                <div class="space-y-4">
                  ${notes.map(ep => `
                    <div class="bg-white dark:bg-gray-700 rounded-lg p-3 border border-green-200 dark:border-green-800">
                      <div class="flex items-center justify-between mb-2">
                        <h5 class="font-semibold text-gray-800 dark:text-gray-200">${ep.article_title}</h5>
                        <span class="text-xs text-gray-500 dark:text-gray-400">${this.formatDate(ep.created_at)}</span>
                      </div>
                      <div class="text-gray-700 dark:text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
                        ${ep.comment || "(无内容)"}
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            `;
          }
          
          if (summaries.length > 0) {
            combinedHTML += `
              <div class="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border-l-4 border-purple-500">
                <h4 class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  关联摘要 (${summaries.length})
                </h4>
                <div class="space-y-4">
                  ${summaries.map(ep => `
                    <div class="bg-white dark:bg-gray-700 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                      <div class="flex items-center justify-between mb-2">
                        <h5 class="font-semibold text-gray-800 dark:text-gray-200">${ep.article_title}</h5>
                        <span class="text-xs text-gray-500 dark:text-gray-400">${this.formatDate(ep.created_at)}</span>
                      </div>
                      ${ep.chapter ? `<div class="text-xs text-purple-600 dark:text-purple-400 mb-2">📖 章节：${ep.chapter}</div>` : ""}
                      <div class="text-gray-700 dark:text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
                        ${ep.summary || "(无摘要内容)"}
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            `;
          }
          
          loadingDiv.outerHTML = `<div class="space-y-6">${combinedHTML}</div>`;
        })
        .catch(err => {
          document.getElementById("episode-loading").innerHTML = `
            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span class="text-red-700 dark:text-red-300">网络错误：${err.message}</span>
              </div>
            </div>
          `;
        });
    },
    formatDate(raw) {
      if (!raw) return null;
      const date = new Date(raw);
      return isNaN(date) ? raw : date.toLocaleString();
    },
    closePopup() {
      document.getElementById('node-popup').style.display = 'none';
    }
  },
  async created() {
    const keys = await localforage.keys();
    for (const key of keys) {
      try {
        const bookItem = await localforage.getItem(key);
        if (bookItem && bookItem.info) {
          this.books.push(bookItem.info);
        }
      } catch (error) {
        console.error(`Error loading book "${key}":`, error);
      }
    }
  }
}
</script>

<style scoped>
/* Apple风格的Graph画布样式 */
#mynetwork {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}
#mynetwork:hover {
  border-color: #007aff !important;
  box-shadow: 0 8px 32px rgba(0, 122, 255, 0.12);
  transform: translateY(-1px);
}
#mynetwork .vis-network .vis-stabilization,
#mynetwork .vis-network .vis-stabilization__progress {
  display: none !important;
  background: none !important;
}
/* Apple风格的节点弹窗 */
#node-popup {
  backdrop-filter: blur(20px);
}

#node-popup > div:last-child {
  background: rgba(255, 255, 255, 0.98) !important;
  color: #1d1d1f !important;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

/* 暗色模式下的弹窗样式 */
.dark #node-popup > div:last-child {
  background: rgba(31, 41, 55, 0.98) !important;
  color: #f9fafb !important;
  border: 1px solid rgba(75, 85, 99, 0.3);
}
#node-popup #popup-header {
  color: #1d1d1f !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
#node-popup #popup-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
}
#node-popup button {
  background: #007aff !important;
  color: white !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
}
#node-popup button:hover {
  background: #0056cc !important;
  transform: translateY(-1px);
}
</style>