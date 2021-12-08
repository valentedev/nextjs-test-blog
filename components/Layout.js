import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

export default function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Bem-vindo ao Blog valente.dev",
  description: "Interação entre diferentes tecnologias",
  keywords:
    "go, javascript, next.js, react.js, postgres, development, coding, programming",
};
