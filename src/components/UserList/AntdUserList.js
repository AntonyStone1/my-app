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
      if (user.name === e.target.innerText) {
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
      key: 'id',
      id: 'id',
      render: (name) => <a onClick={handleClick}>{name}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'id',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'id',
    },
  ]

  return <Table dataSource={userData} columns={columns} onClick={handleClick} />
}

export default AntdUserList
