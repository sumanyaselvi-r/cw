
import { Routes, Route, useParams } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Samples from "./sections/Samples";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

import ArticlePage from "./pages/ArticlePage";
import ProductPage from "./pages/ProductPage";
import LandingPage from "./pages/LandingPage";

import { samples } from "./data/samples";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Samples />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

function SamplePage() {
  const { slug } = useParams();

  const sample = samples.find((item) => item.slug === slug);

  if (!sample) {
    return (
      <main className="not-found-page">
        <h1>Sample not found</h1>
        <p>
          The writing sample you are looking for does not exist.
        </p>
        <a href="/">Back to home</a>
      </main>
    );
  }

  const category = (sample.category || "").toLowerCase();

  if (
    category.includes("product copy") ||
    category.includes("e-commerce") ||
    category.includes("ecommerce")
  ) {
    return <ProductPage />;
  }

  if (
    category.includes("landing page") ||
    category.includes("website copy") ||
    category.includes("website & landing")
  ) {
    return <LandingPage />;
  }

  return <ArticlePage />;
}

function NotFoundPage() {
  return (
    <>
      <Header />

      <main className="not-found-page">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Back to home</a>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/samples/:slug"
          element={
            <>
              <Header />
              <SamplePage />
              <Footer />
            </>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
