# ⚡ Pokedex App (Simple Auth & Search)

## 🌟 Project Overview

This is a modern Pokedex web application built with **React/Next.js** and a simple client-side authentication system. The application allows users to register, log in, view a paginated list of Pokémon, search for specific Pokémon, and view detailed information for each entry. User authentication data is managed locally using the browser's `localStorage` and **React Context API**.

-----

## ✨ Features

### 🔐 Authentication & Security

  * **Registration/Login:** Full authentication flow implemented on the client-side. Passwords are **Base64 encoded** using `btoa()` before being stored in `localStorage`.
  * **Logout:** Clears the session state managed by the `AuthContext`.
  * **Profile Page (`/profile`):** Displays personalized information for the logged-in user.
  * **Route Protection:** The Pokedex content, search functionality, and Profile page are **protected routes**, accessible only after successful login.

### 🔍 Pokedex Functionality

  * **Pokémon Listing:** Displays a paginated list of all available Pokémon.
  * **Search:** Allows users to search for Pokémon by name.
  * **Pagination:** Users can navigate through different pages of the Pokémon list.
  * **Details View:** Clicking a Pokémon card redirects the user to a detailed view (`/pokemon/[name]`) showing stats, abilities, and other information.

-----

## 🛠️ Technology & API

### Frontend Stack

  * **React / Next.js:** Framework for building the UI and handling routing.
  * **Tailwind CSS:** Used for utility-first styling.
  * **React Context API:** Used for global state management of the authentication flow.

### External API

This project utilizes the **PokeAPI** (Pokémon API) to fetch all required data.

| Endpoint Usage | Description |
| :--- | :--- |
| `https://pokeapi.co/api/v2/pokemon` | Used for fetching the paginated list of Pokémon. |
| `https://pokeapi.co/api/v2/pokemon/{name or id}` | Used to fetch detailed information for a specific Pokémon. |

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (LTS version recommended)
  * npm or yarn

### Installation

1.  **Clone the Repository:**

    ```bash
    git clone [Your Repository URL Here]
    cd [your-project-directory]
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the Development Server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Usage Instructions

Open your browser and navigate to `http://localhost:3000`.

1.  **Register:** You will first be greeted by the authentication form. Click "Register" to create a new user account.
2.  **Login:** Use your newly registered credentials to log in.
3.  **Navigate:**
      * The home page will display the Pokémon list upon successful login.
      * Click the **Profile Icon** in the navbar to visit `/profile`.
      * Use the search bar and pagination controls to explore the Pokedex.

-----