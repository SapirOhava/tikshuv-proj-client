import 'bootstrap/dist/css/bootstrap.min.css';
import AddProductForm from './components/AddProductForm';
import ProductList from './components/ProductList';
function App() {
  return (
    <div className="container mt-3">
      <AddProductForm />
      <ProductList />
    </div>
  );
}

export default App;
