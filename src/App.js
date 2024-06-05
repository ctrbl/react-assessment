import './App.css';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProductCard 
          image="https://theaudioguestbook.co/wp-content/uploads/2023/06/Speaker-white.webp"
          name="Retro Speaker"
          price={19.99}
          description="Vintage-inspired retro speaker delivers rich, warm sound for a nostalgic audio experience. "
        />
      </header>
    </div>
  );
}

export default App;
