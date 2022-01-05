import React from "react";

const YellowHOC = (WrapperComponent) => {
  return class extends React.Component {
    render() {
      <div style={{ backgroundColor: "yellow" }}>
        <WrapperComponent {...this.props} />
      </div>;
    }
  };
};

const TableList = () => {
  return (
    <div>
      <h1>你好我好</h1>
      <h1>2022</h1>
      <h1>虎虎生威</h1>
    </div>
  );
};

export default YellowHOC(TableList);
