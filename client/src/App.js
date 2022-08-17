import React , {useState, useEffect} from "react";
import axios from 'axios';


function App() {
  const [products, searchProduct] = useState([{
    productName: '',
    qty: '',
    price: '',
    image: ''
  }])
  const [data, searchData] = useState([]);
  const [result, searchResult] = useState([]);

  function handleSearch(e) {
    searchResult(e.target.value);
  }

  useEffect(() => {
    if(result.length > 0){
      const search = `http://localhost:3001/searchProduct?search=${result}`
      fetch(search)
        .then((response) => response.json())
        .then((data) => {
          if(data.length > 0 ){
            console.log(data);
            searchData(data);
            return;
          }
          console.log('No Product Found');
        })
    }
    
  },[result])
  

  useEffect(() => { 
    const searchItem = `http://localhost:3001/fetchProduct`
    fetch(searchItem)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchData(data);
    });
  },[products]);
  


  function handleChange(event){
    const {name, value} = event.target;
    
    searchProduct((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }


  function handleSubmit(event) {
    event.preventDefault();
    let form = document.getElementById('form');   
    let formData = new FormData(form);

    axios({
      url: "http://localhost:3001/create",
      method: "POST",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  function ShowAddProductFrom(e){
    let showForm = document.getElementById('addProduct');
    showForm.style.display = 'block';
   
  }

 

  return (
    <div className="App">
      <div className="header">
        <p>
          <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png" alt="cart-icon"></img>
        </p>
        <h1>Shopping Cart</h1>
      </div>
      <div className="products">
        <div className="product-header">
          <h1>Products</h1>
        </div>

        <div id="addProduct">
        <form method="post" encType='multipart/form-data' onSubmit={handleSubmit} id="form">
          Name:
          <input type="text" name="productName" value={products.productName} onChange={handleChange}></input>
          qty:
          <input type="number" name="qty" value={products.qty} onChange={handleChange}></input>
          price:
          <input type="number" name="price" value={products.price} onChange={handleChange}></input>
          img:
          <input type="file" name="image" value={products.image} onChange={handleChange}></input>
          <button className="submit">Create Products</button>
        </form>
        </div>

        <div className="input-btn">
          <div className="btn">
            <button onClick={ShowAddProductFrom} data-toggle='true'>Add Product</button>
          </div>

          <div>
            <input className="search" type="text" onChange={handleSearch} placeholder="Search Product.."></input>
          </div>
        </div>
        

        <div className="product-container">
          {data.map((product) => (
            <div style={{display:'flex'}} className="product-box">
              <div>
                <p><img src={`http://localhost:3001${product.image}`} style={{width:200}} alt="product-img"></img></p>
              </div>

              <div key={product._id} style={{margin: '0px 30px'}}>
                <h2>{product.productName}</h2>
                <p>Qty: {product.qty}</p>
                <p>Price: {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default App;

