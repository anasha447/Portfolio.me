import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import IntroSequence from './components/IntroSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy-loaded: Three.js (~600KB) is deferred until after the intro animation
const Antigravity = lazy(() => import('./components/Antigravity'));

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="sync">
      <LayoutGroup>
        {showIntro ? (
          <IntroSequence key="intro" />
        ) : (
          <div key="main">
            {/* 3D particle background — fills the viewport, sits behind content */}
            <div
              className="fixed inset-0 w-screen h-screen z-0"
              style={{ background: 'radial-gradient(ellipse at center, #003049, #001c2b, black)' }}
            >
              <Suspense fallback={null}>
                <Antigravity color="#F77F00" />
              </Suspense>
            </div>

            {/* Navbar — floats above everything */}
            <Navbar />

            {/* Main scrollable content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Certificates />
              <Contact />
              <Footer />
            </main>
          </div>
        )}
      </LayoutGroup>
    </AnimatePresence>
  );
}

export default App;
