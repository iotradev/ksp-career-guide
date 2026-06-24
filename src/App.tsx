import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import Section from './pages/Section'
import Tools from './pages/Tools'
import DvCalculator from './pages/DvCalculator'
import TransferCalculator from './pages/TransferCalculator'
import LaunchWindow from './pages/LaunchWindow'
import OrbitViewer from './pages/OrbitViewer'
import Glossary from './pages/Glossary'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProgressProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/chapter/:id" element={<Chapter />} />
                <Route path="/chapter/:chapterId/:sectionId" element={<Section />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/dv-calculator" element={<DvCalculator />} />
                <Route path="/tools/transfer" element={<TransferCalculator />} />
                <Route path="/tools/launch-window" element={<LaunchWindow />} />
                <Route path="/tools/orbit-viewer" element={<OrbitViewer />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
