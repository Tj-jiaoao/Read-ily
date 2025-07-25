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

        <!-- 空状态 -->
        <div v-if="books.length === 0" class="text-center py-16">
          <div class="max-w-md mx-auto">
            <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">你的书架还是空的</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">点击下方的"添加书籍"按钮开始你的阅读之旅</p>
          </div>
        </div>

        <!-- 书架标题和书籍列表 -->
        <div v-else>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            📚 Shelf
          </h2>
          <div id="bookCatalog" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">

            <!-- 添加书籍按钮 - 放在第一位 -->
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
      colors: [
        '#BC5377', '#B04C63', '#B25564', '#C15859', '#BF6150', '#C76849', '#C57140', 
        '#C68245', '#D0953E', '#DAB062', '#D9AB60', '#C4AC58', '#B6AC56', '#B0BB6D', 
        '#969F68', '#83A86B', '#69A076', '#5CA58A', '#47938F', '#3C8585', '#6B7096'
      ],
      showAlert: false,
      alertMessage: ''
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
/* Styles remain unchanged */
</style>