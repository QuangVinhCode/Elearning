import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'

class Home extends Component {
  render() {
    return (
      <>
       <h1>Chào mừng người dùng đã đến trang quản trị</h1>
      </>
    )
  }
}

export default withRouter(Home)
