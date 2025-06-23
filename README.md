# 📰 Angular Post Management App

This is a functional Angular application that allows users to **view**, **create**, **edit**, and **delete** posts using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). It also includes a comments section for each post and utilizes modern Angular features such as **standalone components**, **Angular Signals**, and **RxJS** for reactive programming.

---

## 📦 Project Setup & Run Instructions

### ✅ Prerequisites

- Node.js and npm installed
- Angular CLI installed globally  
  ```bash
  npm install -g @angular/cli
  ```

### 🚀 Install & Run

1. **Clone the repository**

```bash
git clone https://github.com/esihackman/angular-post-app.git
cd angular-post-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
ng serve
```

4. Visit the app in your browser at [http://localhost:4200](http://localhost:4200)

---

## 📜 Available NPM Scripts

| Script              | Purpose                                              |
|---------------------|------------------------------------------------------|
| `ng serve`          | Compiles and serves the app locally with live reload |
| `ng build`          | Compiles the app for production                      |
| `ng test`           | Runs unit tests using Karma                          |
| `ng lint`           | Runs code linter to check for errors                 |
| `ng generate`       | Used to generate components/services/etc.            |

---

## 📁 Project Structure & Key Features

```
src/
├── app/
│   ├── components/
│   │   ├── post-list/        # Lists all posts with pagination
│   │   ├── post-detail/      # Displays a single post with comments
│   │   ├── post-edit/        # Edit form for a post
│   │   ├── post-create/      # Form to create a new post
│   │   └── confirm-modal/    # Reusable confirmation modal
│   ├── services/
│   │   ├── post.service.ts   # Handles all HTTP requests for posts
│   │   └── auth.guard.ts     # Simple route protection
│   ├── models/
│   │   └── post.model.ts     # Post interface definition
│   └── app.routes.ts         # Application routes
├── environments/
│   ├── environment.ts        # Environment config (API base URL)
```

---

## 🌟 Key Features

- **CRUD Operations**: Users can Create, Read, Update, and Delete posts.
- **Pagination**: Loads posts page by page.
- **Comments**: Each post shows its associated comments.
- **Confirmation Modal**: Safely delete posts with a user confirmation step.
- **Success/Error Feedback**: Users get real-time feedback on actions.
- **Authentication Guard**: Routes like create/edit are protected.
- **Angular Signals**: `signal<Post[]>` used for reactive state management.

---

## 📌 Requirements Checklist

- ✅ View post list with pagination
- ✅ View single post and comments
- ✅ Create post
- ✅ Edit post
- ✅ Delete post with confirmation
- ✅ Signals for reactivity
- ✅ Standalone components
- ✅ Error and success messages
- ✅ Route guards
- ✅ Functional UI


