import React, {Component} from 'react';
import axios from "axios";
import PubSub from 'pubsub-js'

class Search extends Component {

  search = () => {
    console.log("22")
    const {keyWordElm: {value: keyWord}} = this
    PubSub.publish("mysub", {isFirst: false, isLoading: true})
    axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
      res => {
        PubSub.publish("mysub", {isLoading: false, users: res.data.items})
      }, err => {
        console.log(err)
        PubSub.publish("mysub", {isLoading: false, err: err.message})
      })
  }

  render() {
    return (
      <div>
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <div>
            <input ref={c => this.keyWordElm = c} type="text" placeholder="enter the name you search"/>&nbsp;
            <button onClick={this.search}>Search</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
