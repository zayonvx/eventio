import React from "react"
import { useStringParam } from "../../utils/utils"

const BlogPostPage = () => {
  const slug = useStringParam("slug")
  return <div>Welcome to our blog post page {slug}</div>
}

export default BlogPostPage
