(async () => {
    const a = await fetch("http://localhost:5000/api/v1/list", {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => err);
    const app_root = document.getElementById("app-root");
    a.files.map((file) => {
        let elem = document.createElement("div");
        elem.className = "file";
        elem.innerHTML = file.name;
        elem.ondblclick = () => getFileContent(file.name);
        app_root.appendChild(elem);
    });
})();

async function getFileContent(name) {
    const a = await fetch(`http://localhost:5000/api/v1/getFile?name=${name}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => err);
        const modal = document.getElementById("modal");
        modal.style.display = "block";
    document.getElementById('file-content').innerHTML = a.content
}


