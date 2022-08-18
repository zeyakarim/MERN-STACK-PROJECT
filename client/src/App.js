import React , {useState, useEffect} from "react";
import axios from 'axios';


function App() {
  const [products, setProduct] = useState([])
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
        .then((searchProduct) => {
          if(searchProduct.length > 0 ){
            console.log(searchProduct);
            setProduct(searchProduct);
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
    .then((product) => {
      console.log(product);
      setProduct(product);
    });
  },[data]);
  


  function handleChange(event){
    // const {name, value} = event.target;
    
    // searchProduct((prevInput) => {
    //   return {
    //     ...prevInput,
    //     [name]: value
    //   }
    // })
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
    }).then((res) =>{
     searchData(res.data.product)
    });
  }

  function ShowAddProductFrom(e){
    let showForm = document.querySelector('table');
    showForm.style.display = 'block';
   
  }

 

  return (
    <div className="App">
      <div className="page-header">
        <p className="header">
          <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png" alt="cart-icon"></img>
        </p>
        <h1 className="header">Shopping Cart</h1>
      </div>
      <div className="products">
        <div className="product-header">
          <h1>Products</h1>
        </div>

        <div id="addProduct">
          
            <form method="post" encType='multipart/form-data' onSubmit={handleSubmit} id="form">
              <table>
                <tr>
                  <td>Name:</td>
                  <td><input type="text" name="productName" onChange={handleChange}></input></td>
                </tr>
              
                <tr>
                  <td>qty:</td>
                  <td><input type="number" name="qty" onChange={handleChange}></input></td>
                </tr>

                <tr>
                  <td>price:</td>
                  <td><input type="number" name="price" onChange={handleChange}></input></td>
                </tr>
              
                <tr>
                  <td>img:</td>
                  <td><input type="file" name="image" onChange={handleChange}></input></td>
                </tr>
              
                <button className="submit">Create Products</button>
              </table>
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
            {products.map((product) => (
            <div style={{display:'flex'}} className="product-box">
              <div>
                <p><img src={`http://localhost:3001${product.image}`} style={{width:200}} alt="product-img"></img></p>
              </div>

              <div key={product._id} style={{margin: '5px 30px'}}>
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

