// Blog system for loading and displaying posts
const blogSystem = {
  // Cache for storing fetched blog posts
  cache: {},

  // Initialize blog system - add necessary styles
  init() {
    // Add styles for markdown content rendering
    if (!document.getElementById('blog-markdown-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'blog-markdown-styles';
      styleEl.textContent = `
        .prose {
          color: #374151;
          max-width: 65ch;
          font-size: 1.125rem;
          line-height: 1.75;
        }
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.25;
        }
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.3;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.6rem;
          margin-bottom: 0.8rem;
          color: #111827;
          line-height: 1.4;
        }
        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }
        .prose p {
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .prose ul {
          list-style-type: disc;
          padding-left: 1.625rem;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.625rem;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .prose li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .prose a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
        }
        .prose a:hover {
          color: #1d4ed8;
        }
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          font-style: italic;
          color: #6b7280;
          margin: 1.5rem 0;
        }
        .prose code {
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: monospace;
        }
        .prose pre {
          background-color: #1f2937;
          color: #e5e7eb;
          overflow-x: auto;
          border-radius: 0.375rem;
          padding: 1rem;
          margin: 1.5rem 0;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
          font-size: 0.875em;
          color: inherit;
        }
        .prose img {
          border-radius: 0.375rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
          max-width: 100%;
          height: auto;
        }
        .prose hr {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        .prose table th {
          background-color: #f9fafb;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
        }
        .prose table td {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
        }
        .prose table tr:nth-child(even) {
          background-color: #f9fafb;
        }
      `;
      document.head.appendChild(styleEl);
    }
  },

  // Function to load blog posts from JSON file
  async loadBlogPosts() {
    try {
      const response = await fetch('../blogs.json'); // Changed from '/blogs.json' to '../blogs.json'
      if (!response.ok) throw new Error('Failed to load blog posts');
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  },

  // Function to load a single blog post by ID
  async loadBlogPost(id) {
    // Check cache first
    if (this.cache[id]) {
      return this.cache[id];
    }

    try {
      // Load all blog posts metadata
      const posts = await this.loadBlogPosts();
      const post = posts.find(p => p.id === id);
      
      if (!post) throw new Error(`Blog post with ID "${id}" not found`);
      
      // Fetch the markdown content
      const contentResponse = await fetch(`../${post.content}`); // Changed from '/${post.content}'
      if (!contentResponse.ok) throw new Error('Failed to load blog post content');
      
      const markdown = await contentResponse.text();
      
      // Parse markdown to HTML using marked
      const content = marked.parse(markdown);
      
      // Create the complete post object
      const completePost = {
        ...post,
        contentHtml: content
      };
      
      // Save to cache
      this.cache[id] = completePost;
      
      return completePost;
    } catch (error) {
      console.error('Error loading blog post:', error);
      return null;
    }
  },

  // Function to render blog posts list
  async renderBlogList(containerId) {
    // Ensure styles are added
    this.init();

    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const posts = await this.loadBlogPosts();
      
      // Clear container
      container.innerHTML = '';
      
      // Create blog post links with only date and title in a single horizontal line
      posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = '';
        
        postElement.innerHTML = `
          <a href="blog.html?id=${post.id}" class="flex items-center pb-1 mt-4">
            <span class="mx-1 text-black hover:text-blue-600 transition-colors">•</span>
            <time class="text-sm text-gray-500 mr-2">${post.date}</time>
            <h2 class="text-md font-bold text-gray-900 hover:text-blue-600 transition-colors">${post.title}</h2>
          </a>
        `;
        container.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error rendering blog list:', error);
      container.innerHTML = '<p class="text-center text-gray-600">Failed to load blog posts. Please try again later.</p>';
    }
  },

  // Function to render a single blog post
  async renderBlogPost(containerId, id) {
    // Ensure styles are added
    this.init();
    
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const post = await this.loadBlogPost(id);
      if (!post) {
        container.innerHTML = '<p class="text-center text-gray-600">Blog post not found.</p>';
        return;
      }

      // Render the blog post content
      container.innerHTML = `
        <article class="max-w-3xl mx-auto">
          <!-- Article header -->
          <div class="mb-8">
            <a href="blog.html" class="text-blue-600 hover:underline inline-flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </a>
            <span class="text-blue-600 text-sm font-medium">${post.category}</span>
            <h1 class="text-4xl font-bold text-gray-900 mt-2">${post.title}</h1>
            <div class="flex items-center mt-4">
              <time class="text-sm text-gray-500">${post.date}</time>
              <span class="mx-2 text-gray-300">•</span>
              <span class="text-sm text-gray-500">${post.readTime}</span>
            </div>
          </div>

          <!-- Featured image -->
          <img src="${post.image}" alt="${post.title}" class="w-full h-96 object-cover rounded-xl shadow-md mb-10">

          <!-- Article content -->
          <div class="prose max-w-none">
            ${post.contentHtml}
          </div>

          <!-- Author section -->
          <div class="border-t border-gray-200 mt-10 pt-10">
            <div class="flex items-center">
              <img src="https://avatars.githubusercontent.com/u/108178021?s=400&u=d5d3c95a3ccce0a2ca62ac115f541c81c7a60eed&v=4" alt="Ashish Prajapati" class="w-12 h-12 rounded-full">
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">Ashish Prajapati</h3>
                <p class="text-gray-600">Full stack developer passionate about JavaScript, Databases, and APIs. Sharing knowledge through blogs and posts is my way of giving back to the community.</p>
              </div>
            </div>
          </div>

          <!-- Share section -->
          <div class="mt-10">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
            <div class="flex space-x-4">
              <a href="#" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Twitter
              </a>
              <a href="#" class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors">
                LinkedIn
              </a>
              <a href="#" class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
                Copy Link
              </a>
            </div>
          </div>
        </article>
      `;
    } catch (error) {
      console.error('Error rendering blog post:', error);
      container.innerHTML = '<p class="text-center text-gray-600">Failed to load blog post. Please try again later.</p>';
    }
  }
};