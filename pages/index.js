import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Layout from "../components/Layout";

export default function HomePage({ posts }) {
  console.log(posts);
  return (
    <Layout className="flex gap-1 bg-pink-200 p-2">
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <h3 key={index}>{post.frontmatter.title}</h3>
        ))}
      </div>

      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map(fn => {
    const slug = fn.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", fn), "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return {
    props: { posts },
  };
}
