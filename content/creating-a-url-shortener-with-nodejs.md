## Introduction

In the internet age, long and complicated URLs can be a hassle to share or remember. A URL shortener service provides an elegant solution by converting lengthy URLs into compact, shareable links. In this blog post, we will learn how to build a simple yet robust URL shortener service using **Node.js**, **Express**, and **MongoDB**. This project is perfect for honing your skills in full-stack development.

## Features

* **URL Shortening:** Converts long URLs into short, easy-to-share links.
    
* **Redirection:** Automatically redirects users from a short URL to the original URL.
    
* **User-Friendly Interface:** A clean and intuitive frontend built with HTML, CSS, and JavaScript.
    
* **Backend Efficiency:** Powered by Node.js and Express for seamless server-side operations.
    
* **Database Integration:** MongoDB is used to store and retrieve URL mappings efficiently.
    

---

## Technologies Used

* **Backend:** Node.js, Express.js, MongoDB, Mongoose
    
* **Frontend:** HTML, CSS, JavaScript
    
* **Deployment:** Render
    
* **Other Tools:** Body-Parser, CORS, dotenv
    

## Project Structure

```javascript
url-shortening-service/
├── client/
│   ├── app.js
│   ├── index.html
│   └── style.css
├── server/
│   ├── constants.js
│   ├── db.js
│   ├── server.js
│   └── url.model.js
├── .gitignore
├── package.json
├── README.md
└── render.yaml
```

### Client-Side

* `index.html`**:** The main HTML file provides the structure of the interface.
    
* `style.css`**:** Stylesheet to enhance the look and feel of the front end
    
* `app.js`**:** Contains the logic for user interaction, sending requests, and handling responses from the backend.
    

### Server-Side

* `server.js`**:** The entry point for the backend. Sets up the Express server, defines routes, and connects to MongoDB.
    
* `db.js`**:** Manages the MongoDB connection using Mongoose.
    
* `url.model.js`**:** Defines the Mongoose schema for storing original and shortened URLs.
    
* `constants.js`**:** Contains constants such as database configuration and other reusable values.
    

## Setting Up the Project

### Prerequisites

1. **Node.js:** Ensure Node.js is installed on your machine.
    
2. **MongoDB Atlas:** Create a MongoDB Atlas account and set up a database.
    

### Installation Steps

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/codingashishdev/url-shortening-service.git
    ```
    
2. **Navigate to the Project Directory:**
    
    ```bash
    cd url-shortening-service
    ```
    
3. **Install Dependencies:**
    
    ```bash
    npm install
    ```
    
4. **Set Up Environment Variables:**
    
    * Create a `.env` file in the root directory.
        
    * Add the following variables:
        
        ```javascript
        MONGODB_URI=your_mongodb_atlas_connection_string
        BASE_URL=your_bash_url
        ```
        
5. **Start the Server:**
    
    ```bash
    npm run dev
    ```
    
6. **Access the Application:**
    
    * Open `http://localhost:3000` in your browser.
        
    * Enter the URL to shorten and click "Shorten URL" to generate a shareable link.
        

---

## How It Works

### 1\. Frontend Interaction

* Users input a long URL into the form provided on the interface.
    
* When the user submits, a POST request is sent to the backend API with the long URL.
    

### 2\. Backend Processing

* **URL Validation:** The backend validates the input URL format.
    
* **Database Check:**
    
    * If the URL already exists in the database, the existing short key is returned.
        
    * If it's new, a unique short key is generated and saved along with the original URL.
        
* **Response:** The shortened URL is sent back to the front end for display.
    

### 3\. Redirection

* When users visit a shortened URL, the server fetches the corresponding original URL from the database and redirects the user to it.
    

---

## Deployment

The application can be deployed on **Render**, a cloud platform for hosting web applications. The `render.yaml` file contains all the configurations required for deployment, including environment variables and build commands.

---

## Conclusion

Creating a URL shortener service is a great way to improve your full-stack development skills. This project uses important technologies like Node.js, Express, and MongoDB to build a working and scalable app. It also gives you practical experience with API design, database management, and connecting the frontend and backend.

Check out the [GitHub repository](https://github.com/codingashishdev/url-shortening-service) for the full source code. Contributions and suggestions are always welcome.