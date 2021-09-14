import React, {Component} from 'react';
import "./index.css"
import PubSub from 'pubsub-js'

class List extends Component {
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: ''
  }

  componentDidMount() {
    this.token = PubSub.subscribe("mysub", (msg, data) => {
      this.setState(data)
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }

  render() {
    const {users, isFirst, isLoading, err} = this.state
    return (
        <div className="row">
          {
            isFirst ? <h2>欢迎大家来使用！</h2> :
                isLoading ? <h2>加载中。。。。</h2> :
                    err ? <h2 style={{color: "red"}}>{err}</h2> :
                        users.map((itemObj, index) => {
                              return (
                                  <div key={itemObj.id} className="card">
                                    <a rel="noreferrer" href={itemObj.html_url} target="_blank">
                                      <img src={itemObj.avatar_url} style={{width: "100px"}}/>
                                    </a>
                                    <p className="card-text">{itemObj.login}</p>
                                  </div>
                              )
                            }
                        )}
        </div>

    );
  }
}

export default List;


