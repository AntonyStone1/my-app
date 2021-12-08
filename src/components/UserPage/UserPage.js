import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import axios from '../../../node_modules/axios/index'
import useUserData from '../../hooks/userUserData/useUserData'

const UserPage = () => {
  const [disable, setDisable] = useState(true)
  const { userData, setUserData, isLoaded, setLoaded } = useUserData()
  const history = useHistory()
  const [inputValue, setInputValue] = useState({
    name: '',
    company: {
      name: '',
    },
    website: '',
  })
  const { id } = useParams()
  // eslint-disable-next-line no-console
  console.log(id)
  const currentUser = userData.find((user) => user.id === +id)
  useEffect(() => {
    if (isLoaded) {
      setInputValue(userData?.find((user) => user.id === +id))
    } else {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
        setInputValue(response)
        setLoaded((prev) => !prev)
      })
    }
  }, [])

  const handleStopPropag = (e) => {
    e.stopPropagation()
  }

  const toggleButton = () => {
    setDisable((prev) => !prev)
  }

  const handleValue = (e) => {
    setInputValue((prev) =>
      e.target.name !== 'company'
        ? { ...prev, [e.target.name]: e.target.value }
        : { ...prev, company: { name: e.target.value } },
    )
  }

  const closeHandle = () => {
    history.push({
      pathname: `/home/`,
    })
  }
  const SendForm = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        data: JSON.stringify(inputValue),
      })
      .then((response) => {
        if (response.data) {
          toggleButton()
          setUserData((prev) =>
            prev.map((user) => (user.id === +id ? { ...user, ...inputValue } : user)),
          )
        }
      })
  }
  return (
    <div className="user_page-container">
      <span className="close_btn" onClick={closeHandle} />
      <h1 className="user-page-heading">Home page of {currentUser?.name}</h1>
      <div className="user_page-item" onClick={handleStopPropag}>
        <div className="user_info">
          <label htmlFor="true">
            Full name:
            <input
              onChange={handleValue}
              name="name"
              type="text"
              value={inputValue.name}
              disabled={disable}
            />
          </label>
          <label htmlFor="true">
            Company:
            <input
              onChange={handleValue}
              name="company"
              type="text"
              value={inputValue.company.name}
              disabled={disable}
            />
          </label>
          <label htmlFor="true">
            Website:
            <input
              onChange={handleValue}
              name="website"
              type="text"
              value={inputValue.website}
              disabled={disable}
            />
          </label>
          {!disable && (
            <button type="button" onClick={SendForm} className="btn user_save-btn">
              Save
            </button>
          )}
        </div>
        <div className="user_edit-btns">
          <button type="button" className="btn" onClick={toggleButton}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserPage
