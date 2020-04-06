import React, {Component} from 'react';
import './App.css';

class App extends Component {
state ={
  books: [],
  title: "",
}

//Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hdGV1c3ogR3JhYmllYyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.NwsgtHGyo24jVn4FnYrPUqeagPRs5JTUxjQ0Zg6dVWvzpSFMabLRNrKVfn66ISkc9liwIxu4_3HNFIJHemmUWA
// asymetric
//eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.ICwvTRz5jYgV-f2Mfyt1v-qFi-XnjCoLKekrmq56up9GMxbQ8UTUfL1nVLIzH3F7QEjwo564kTsJiM-iLG_RjJ5nTw5hT2h39b56L9ke3qLTeEB6G3XZDjZG51nWXGJSAFziluC1n0lh82wjUf7bHVw8a8zNAVhYiLli-SlH_gMZA1zln-hHmzRXJdkkff0dPpoDRKuZm1rfXRqqD3e_py8GCI-P3SekT1n_W-S_PcfY_9bpOzjDu1J6LPtCcKx0EPfOxl7uJUb_SSref-mL17-bmbZ-bSEQ7fveEolGy88QbcQVhTwK94ybuxKyLPC0Urctq2GSNKNtzY5uozZYBw
handeDateChange = (e) =>{
  let token= this.refs.inputKey.value
  fetch('http://localhost:8080/api/books', {
    method: 'GET',
    mode:'cors',
    redirect: 'follow',
    headers: {
      'Cache-Control': 'no-cahe',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer '+token
    },
  })
  .then(res => {
    if(res.ok){
      return res
    }else{
    throw Error(res.statusText)
    }
  })
  .then(res => res.json())
  .then(data => this.setState({
    books: data
  }))
  .catch(err => console.log(err))


  // http://numbersapi.com/{value}/year?json
}

handleChangeBody=(e) =>{
  this.setState({title:this.refs.inputBody.value})
}

handleButton=()=>{
  if(this.state.title!=null){
    let token= this.refs.inputKey.value
    fetch('http://localhost:8080/api/books', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer '+token
      },
      body: this.state.title
    })
    .then(res => {
      if(res.ok){
        return res
      }else{
      throw Error(res.statusText)
      }
    })
    .then(res => res.json())
    .then(data => this.setState({
      books: data
    }))
    .catch(err => console.log(err));
    this.setState({chkbox:true})
  }
}

render(){
  return (
    <div className="App">
      <buutton onClick={this.handleButton}>Dodaj</buutton>

      <input onChange={this.handeDateChange} type="text" ref="inputKey"/>
      <input onChange={this.handleChangeBody} type="text" ref="inputBody"/>
  <p>Odpowiedź:</p>
  <ul>
    {
      this.state.books.map(function (book){
        return <li key={book.id}>{book.title}</li>
      })
    }
  </ul>
    </div>
  );
}
}

export default App;
