const newPostHandler = async (e) => {
    e.preventDefault()
    const title = document.getElementById("blog-title").value.trim()
    const description = document.getElementById("blog-desc").value.trim()
    if (title && description) {
        const response = await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({
                title,
                description
            }),
            headers: {"Content-Type": "application/json"}
        })
        if (response.ok){
            document.location.replace("/dashboard")
        } else {
            alert ("Post creation failed!")
        }
    }
}

const buttonHandler = async (e) => {
    if (e.target.hasAttribute("data-id")) {
        const id = e.target.getAttribute("data-id")
        if (e.target.classList.contains("update")) { // check this!
        try {
            const response = await fetch(`/updater/${id}`)
            if (response.ok) {
                document.location.replace(`/updater/${id}`)
            } else {
                alert ("Failed to fetch data!")
            }
        } catch (error) {
            alert ("An error occured.")
        }
    } else {
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        })
        if (response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert ("Post did not delete.")
        }
    }
} 
}

document.querySelector(".new-blog-form").addEventListener("submit", newPostHandler) //check
document.querySelector(".blog-list").addEventListener("click", buttonHandler) //check