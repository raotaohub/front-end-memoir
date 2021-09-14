import React, {Component} from 'react';
// import qs from "querystring"
//申明参数
const DetailData = [
  {id: "01", content: "锄禾日当午"},
  {id: "02", content: "汗滴禾下土"},
  {id: "03", content: "谁知盘中餐"},
  {id: "04", content: "粒粒皆辛苦"},
]

class Detail extends Component {
  render() {

    // 1. 接收params参数
    // const {id, title} = this.props.match.params

    // 2. 接收search参数
    // const {search} = this.props.location
    // const {id, title} = qs.parse(search.slice(1))

    // 3. 接收state参数 ##【注意浏览器没有历史记录时会出错，因此要判空】
    const {id, title} = this.props.location.state || {}
    const findResult = DetailData.find((detailObj) => {
      return detailObj.id === id
    }) || {}
    return (
        <ul>
          <li>ID:{id}</li>
          <li>TITLE:{title}</li>
          <li>CONTENT:{findResult.content}</li>
        </ul>
    )
  }
}

export default Detail;
