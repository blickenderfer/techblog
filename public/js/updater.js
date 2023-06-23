const updatePost = async function(e){
    e.preventDefault()
    const postID = e.target.getAttribute("data-id")
    const newTitle = document.querySelector("#blog-title").value.trim()
    const newDesc = document.querySelector("#blog-desc").value.trim()
    const response = await fetch(`/api/blogs/${postID}`, {
        method: "PUT",
        body: JSON.stringify({
            title: newTitle,
            description: newDesc
        }),
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        document.location.replace("dashboard")
    } else {
        console.log("response is not okay")
    }
}

document.querySelector("#submit").addEventListener("click", updatePost)