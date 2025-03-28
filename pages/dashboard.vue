<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);


// Fetch user details from backend

const fetchUserDetails = async () => {
  try {
    const response = await fetch("https://rogito.me/api/userinfo", {
      method: "GET",
      credentials: "include" // ✅ Ensures cookie with access_token is sent
    })

    console.log("Response status:", response.status)

    if (response.ok) {
      user.value = await response.json()
      console.log("User data:", user.value)
    } else if (response.status === 401 || response.status === 403) {
      console.warn("Not authorized. Redirecting to login.")
      window.location.href = "https://rogito.me/auth/login" // Or your preferred login route
    } else {
      console.error("Unexpected error:", response.status)
    }
  } catch (error) {
    console.error("Fetch error:", error)
    window.location.href = "https://rogito.me/auth/login"
  }
}

onMounted(fetchUserDetails)

// Logout handler
const handleLogout = async () => {
  try {
    const response = await fetch("https://rogito.me/auth/logout", {
      method: "POST",
      credentials: "include", // ✅ send cookies
    });

    if (response.ok) {
      console.log("Logout successful");
      window.location.href = "http://app.rogito.me"; // or your login page
    } else {
      console.error("Logout failed:", response.status);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-white shadow" v-if="user">
      <div class="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-600">Dashboard</h1>
        <button @click="handleLogout" class="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100">
    Logout
  </button>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div v-if="user" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Welcome to Your Dashboard</h2>
        <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <div v-else class="text-center text-lg font-semibold">
        <p>Redirecting...</p>
        <svg class="animate-spin h-5 w-5 text-gray-900 mx-auto mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </main>
  </div>
</template>
