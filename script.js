async function shortenMultiple() {
    const longUrl = document.getElementById('longUrl').value;
    const container = document.getElementById('results-container');
    if (!longUrl) return alert("Enter a URL");
    container.innerHTML = "Shortening...";
    const apis = [
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`,
        `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`,
        `https://v.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`
    ];
    try {
        const results = await Promise.all(apis.map(api => fetch(api).then(res => res.text())));
        container.innerHTML = ""; 
        
        results.forEach(link => {
            const div = document.createElement('div');
            div.className = "result-item";
            div.innerText = link;
            container.appendChild(div);
        });
    } catch (e) { container.innerHTML = "Error!"; }
}

