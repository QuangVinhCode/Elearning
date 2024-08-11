import { Divider, PageHeader } from 'antd'
import React, { Component } from 'react'

export class ContentHeader extends Component {
  render() {
    const {navigate, title,className} = this.props;
    return (
        <>
        <PageHeader 
        className={className}
        style={{marginLeft: 0}}
        title={title}
        onBack={()=> navigate(-1)}
        ></PageHeader>
        <Divider></Divider>
      </>
    )
  }
}

export default ContentHeader
