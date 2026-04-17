// --- KONFIGURASI ---
const SECRET_PASSWORD = "12345";
// const SESSION_TIMEOUT = 5 * 60 * 60 * 1000; // 5 Jam dalam milidetik
const SESSION_TIMEOUT = 30 * 1000; // 5 Jam dalam milidetik

// --- SELEKTOR ELEMEN ---
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");

/**
 * FUNGSI LOGIN
 */
function handleLogin() {
  const inputVal = passwordInput.value;

  if (inputVal === SECRET_PASSWORD) {
    const now = new Date().getTime();
    
    // Simpan status dan waktu login ke localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginTimestamp", now.toString());

    alert("Login Berhasil! Sesi berlaku selama 5 jam.");
    window.location.href = "home.html"; 
  } else {
    // Tampilkan pesan error jika salah
    errorMessage.classList.remove("hidden");
    passwordInput.classList.add("border-red-500");
    passwordInput.value = ""; // Reset input
  }
}

/**
 * FUNGSI CEK SESI (Validasi 5 Jam)
 */
function checkSession() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  const now = new Date().getTime();

  if (isLoggedIn && loginTimestamp) {
    // Hitung selisih waktu
    const timeElapsed = now - parseInt(loginTimestamp);

    if (timeElapsed > SESSION_TIMEOUT) {
      // Jika sudah lebih dari 5 jam, hapus session dan tendang ke login
      localStorage.clear();
      alert("Sesi Anda telah berakhir. Silakan login kembali.");
      window.location.href = "login.html";
    }
  }
}

/**
 * EVENT LISTENERS
 */

// Klik tombol login
if (loginBtn) {
  loginBtn.addEventListener("click", handleLogin);
}

// Tekan Enter pada input
if (passwordInput) {
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });
}

/**
 * EKSEKUSI OTOMATIS
 */

// Jalankan pengecekan saat halaman dimuat
checkSession();

// Jalankan pengecekan setiap 1 menit secara background 
// (Agar user otomatis logout meskipun tidak refresh halaman)
setInterval(checkSession, 60000);