# Hobinix

A hobby-sharing platform for users to showcase and engage in music, dance, and photography-related hobbies. Hobinix allows users to connect and share their passion for hobbies in a secure and interactive environment.

## 🔮 Features

-   🎼 Showcase and share hobbies like music, dance, and photography
-   🔐 Secure user authentication with JWT
-   🌐 Media upload to AWS S3 for a scalable storage solution
-   📊 User data management for tracking hobbies and interactions
-   🗂️ Organized user profile pages to display uploaded hobbies
-   📬 Notifications for new uploads and user interactions
-   📄 Dynamic news feed displaying latest hobby posts from active users
-   📝 React and Redux-Toolkit for seamless front-end state management

## 💻 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux-Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## ⚙️ Installation

1. **Fork this repository:** Click the Fork button located in the top-right corner of this page to fork the repository.
2. **Clone the repository:**
    ```bash
    git clone https://github.com/<your-username>/Hobinix.git
    ```
3. **Set .env file:**
   Inside the client and server directories, rename the `.env.example` file to `.env` and set the following environment variables:

    Frontend:

    ```bash
    REACT_SERVER _URL=<your_server_url>
    ```

    Backend:

    ```bash
    PORT=<your_server_url>
    JWT_SECRET=<your_jwt_secret>
    AWS_ACCESS_KEY=<your_aws_access_key>
    AWS_SECRET_KEY=<your_aws_secret_key>
    AWS_S3_BUCKET_NAME=<your_s3_bucket_name>
    MONGO_URI=<your_mongodb_uri>
    ```

4. **Install dependencies:**
   Navigate to the frontend and backend directories separately and run:
    ```bash
    npm install
    ```
5. **Start the frontend and backend servers:**  
   Frontend:
    ```bash
    cd client
    npm start
    ```
    Backend:
    ```bash
    cd server
    npm run dev
    ```
6. **Access the application:**
   Open a browser and enter the following URL:
    ```bash
    http://localhost:3000/
    ```
