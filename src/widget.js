(function () {
    const username = document.currentScript.getAttribute("data-username");
  
    async function fetchLatestRepo(user) {
      const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated`);
      const data = await res.json();
      return data?.[0];
    }
  
    function showToast(repo) {
      const toast = document.createElement("div");
      toast.id = "devpulse-toast";
      toast.innerHTML = `
        🛠️ Currently working on <strong>${repo.name}</strong><br/>
        <a href="${repo.html_url}" target="_blank" style="color: #3b82f6; text-decoration: underline;">View on GitHub</a>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 8000);
    }
  
    fetchLatestRepo(username)
      .then(repo => {
        if (repo) showToast(repo);
      })
      .catch(err => console.error("DevPulse error:", err));
  })();
  