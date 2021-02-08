import React, {Component} from 'react';
// import axios from "axios";
import PubSub from 'pubsub-js'

class Search extends Component {

  search = async () => {
    const {keyWordElm: {value: keyWord}} = this
    PubSub.publish("mysub", {isFirst: false, isLoading: true})
    /** 使用axios发送 **/
    // axios.get(`http://localhost:3000/api1/search/users2?q=${keyWord}`).then(
    //   res => {
    //     PubSub.publish("mysub", {isLoading: false, users: res.data.items})
    //   }, err => {
    //     console.log(err)
    //     PubSub.publish("mysub", {isLoading: false, err: err.message})
    //   })
    /** 使用fetch发送 **/
    // fetch(`http://localhost:3000/api1/search/users2?q=${keyWord}`).then(
    //   res => {
    //     console.log("联系服务器成功")
    //     return res.json()// res.json()是一个Promise对象。请求成功或者失败取决于这个对象的状态
    //   }
    // ).then(
    //   res => {console.log(res)},
    // ).catch(err => {
    //   console.log("失败的原因", err)
    // })
    try {
      const result = await fetch(`http://localhost:3000/api1/search/users2?q=${keyWord}`)
      const data = await result.json()
      PubSub.publish("mysub", {isLoading: false, users: data.items})
    } catch (e) {
      console.log("请求出错", e)
      PubSub.publish("mysub", {isLoading: false, err: e.message})
    }
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
