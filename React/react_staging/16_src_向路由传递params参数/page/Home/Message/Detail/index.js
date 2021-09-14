import React, {Component} from 'react';

//申明参数
const DetailData = [
  {id: "01", content: "锄禾日当午"},
  {id: "02", content: "汗滴禾下土"},
  {id: "03", content: "谁知盘中餐"},
]

class Detail extends Component {
  render() {
    // 路由组件默认接收三个参数 在match中
    const {id, title} = this.props.match.params
    const findResult = DetailData.find((detailObj) => {
      return detailObj.id === id
    })
    return (
        <ul key={findResult.id}>
          <li>ID:{id}</li>
          <li>TITLE:{title}</li>
          <li>CONTENT:{findResult.content}</li>
        </ul>
    );
  }
}

export default Detail;
