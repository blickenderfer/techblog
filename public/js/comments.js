const commentFormHandler = async function(e){
    e.preventDefault()
    const blog_id = document.querySelector(".new-comment-form").dataset.blogid
    const comment_description = document.getElementById("comment_description").value.trim()
    if (comment_description){
        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                blog_id, comment_description
            }),
            headers: {"Content-Type": "application/json"}
        })
        document.location.reload()
    }
}

document.querySelector(".new-comment-form").addEventListener("submit", commentFormHandler);