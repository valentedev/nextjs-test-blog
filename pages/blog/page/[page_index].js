import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";

export default function BlogPage({ posts, currentPage, numPages, categories }) {
  return (
    <Layout className="flex gap-1 bg-pink-200 p-2">
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <Pagination currentPage={currentPage} numPages={numPages} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>

      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);
  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts();
  // vai criar uma lista de categories com itens repetidos
  const categories = posts.map(post => post.frontmatter.category);
  // var criar uma lista de categories com itens unicos
  const uniqueCategories = [...new Set(categories)];
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const page_index = page - 1;
  const orderedPosts = posts.slice(
    page_index * POSTS_PER_PAGE,
    (page_index + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
