# Fork & Flavor

[Live URL](https://fandf-client.vercel.app/)

# Fork & Flavor Sever Side Github Repo
[Live URL](https://github.com/kazirahat89/Fork-Flavor-SSide)

## Introduction

This Recipe Sharing Community is a full-stack web application designed for cooking enthusiasts to discover, share, and organize recipes. The platform targets home cooks, culinary students, and passionate food lovers, allowing users to share their favorite recipes, interact with ingredient checklists, and manage cooking time estimates. It promotes culinary knowledge-sharing and social interaction through comments, ratings, following users, and upvoting/downvoting recipes. Premium membership unlocks exclusive content, accessible through a subscription-based model, allowing users to access additional features and content.

## Features

- **User Authentication & Authorization:**:
  - User Registration
  - Login & JWT-Based Authentication
  - Role-based Access Control (Admin and User)
  - Secure Password Change
- **User Profile Management:**:
  - Profile Customization
  - Social Connectivity
  - Premium Membership Subscription
- **Recipe Management**:

  - My Recipes
  - Recipe Creation & Update
  - Recipe Deletion

- **Rating, Commenting & Upvote/Downvote System**:
  - Rate Recipes
  - Commenting
  - Upvote/Downvote System
- **Validation**:
  - Input validation using Zod
- **Recipe Feed**:
  - Recipe Display
  - Advanced Search & Filter
  - Infinite Scroll
- **User Management**:
  - Admins can block/unblock users, publish/unpublish recipe posts, manage user accounts, and perform CRUD operations on all recipes and admin accounts.

## Technology Stack

- Next JS
- TypeScript
- Next UI
- Tanstack Query
- Tailwind CSS

## Installation Guideline

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above) or yarn (version 1.22 or above)

### Installation Steps

1. **Clone the repository**

   ```sh
   https://github.com/yasin-arafat-389/Fork & Flavor-Client
   ```

   2. **Navigate to the project directory**

   ```sh
   cd Fork & Flavor-Client

   ```

   3. **Install the dependencies**

   ```sh
   npm install
   ```

### Configuration

1.  **Replace base URL according to your local machine**

```sh
const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});
```

## Usage

1.  **Start the development server**

```sh
npm run dev

```

