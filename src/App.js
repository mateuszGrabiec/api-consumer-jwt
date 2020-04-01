import React, {Component} from 'react';
import './App.css';

class App extends Component {
state ={
  books: [],
  title: "",
  text: "Jutro wszyscy zginiemy",
  chkbox: false,
  error: ""
}

//Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hdGV1c3ogR3JhYmllYyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.NwsgtHGyo24jVn4FnYrPUqeagPRs5JTUxjQ0Zg6dVWvzpSFMabLRNrKVfn66ISkc9liwIxu4_3HNFIJHemmUWA

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

handleChangeChk = (e) =>{
  if(!this.state.chkbox){
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
  }else this.setState({chkbox:false})
}

render(){
  return (
    <div className="App">
      <input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
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
