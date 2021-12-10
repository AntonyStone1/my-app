import React from 'react'
import { useHistory } from 'react-router'
import { Table } from 'antd'
import useUserData from 'hooks/userUserData/useUserData'
import 'antd/dist/antd.css'

const AntdUserList = () => {
  const { userData } = useUserData()
  const history = useHistory()

  const handleClick = (e) => {
    userData.forEach((user) => {
      if (user.id === e.id) {
        history.push({
          pathname: `/home/user/${user.id}`,
        })
      }
    })
  }

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ]

  return (
    <Table
      dataSource={userData}
      columns={columns}
      rowClassName="atnd_row-styles"
      onRow={(r) => ({
        onClick: () => handleClick(r),
      })}
    />
  )
}

export default AntdUserList
