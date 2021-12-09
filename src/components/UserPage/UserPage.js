import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react/cjs/react.development'
import axios from '../../../node_modules/axios/index'
import useUserData from '../../hooks/userUserData/useUserData'

const UserPage = () => {
  const [disable, setDisable] = useState(true)
  const { userData, setUserData, isLoaded, setLoaded } = useUserData()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const history = useHistory()
  const [inputValue, setInputValue] = useState({
    name: '',
    company: {
      name: '',
    },
    email: '',
  })
  const { id } = useParams()

  const currentUser = userData.find((user) => user.id === +id)
  useEffect(() => {
    if (isLoaded) {
      setInputValue(userData?.find((user) => user.id === +id))
    } else {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
        setInputValue(response.data)
        setLoaded((prev) => !prev)
      })
    }
  }, [])
  // eslint-disable-next-line no-console
  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
    }
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        data: JSON.stringify({ ...newData, ...inputValue }),
      })
      .then((response) => {
        if (response.data) {
          // eslint-disable-next-line no-use-before-define
          toggleButton()
          setUserData((prev) =>
            prev.map((user) => (user.id === +id ? { ...user, ...newData } : user)),
          )
          setInputValue((prev) => ({ ...prev, ...newData }))
        }
      })
  }
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

  return (
    <div className="user_page-container">
      <span className="close_btn" onClick={closeHandle} />
      <h1 className="user-page-heading">Home page of {currentUser?.name}</h1>
      <div className="user_page-item" onClick={handleStopPropag}>
        {!disable ? (
          <form className="user_info" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="true">
              Full name:
              <input
                {...register('name', {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                  pattern: /^[A-Za-z]+$/i,
                })}
                type="text"
                autoComplete="off"
              />
            </label>
            {errors?.name?.type === 'required' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>This field is required</p>
            )}
            {errors?.name?.type === 'maxLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                First name cannot exceed 20 characters
              </p>
            )}
            {errors?.name?.type === 'minLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                Password must be at least 3 characters long
              </p>
            )}
            {errors?.name?.type === 'pattern' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>Alphabetical characters only</p>
            )}
            <label htmlFor="true">
              Phone:
              <input
                {...register('phone', {
                  required: true,
                  maxLength: 20,
                  minLength: 10,
                  // pattern: /^[0-9]+$/i,
                })}
                type="phone"
                autoComplete="off"
              />
            </label>
            {errors?.phone?.type === 'required' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>This field is required</p>
            )}
            {errors?.phone?.type === 'maxLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                First name cannot exceed 20 characters
              </p>
            )}
            {errors?.phone?.type === 'minLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                Password must be at least 10 characters long
              </p>
            )}
            {/* {errors?.phone?.type === 'pattern' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>Alphabetical characters only</p>
            )} */}
            <label htmlFor="true">
              Email:
              <input
                {...register('email', {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                  pattern: /^[A-Za-z]+$/i,
                })}
                type="text"
                autoComplete="off"
              />
            </label>
            {errors?.email?.type === 'required' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>This field is required</p>
            )}
            {errors?.email?.type === 'maxLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                First name cannot exceed 20 characters
              </p>
            )}
            {errors?.email?.type === 'minLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                Password must be at least 3 characters long
              </p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>Alphabetical characters only</p>
            )}
            {!disable && (
              <button type="submit" className="btn user_save-btn">
                Save
              </button>
            )}
          </form>
        ) : (
          <div className="user_info">
            <label htmlFor="true">
              Full name:
              <input
                onChange={handleValue}
                name="name"
                type="text"
                value={inputValue.name}
                disabled
              />
            </label>
            <label htmlFor="true">
              Phone:
              <input
                onChange={handleValue}
                name="phone"
                type="text"
                value={inputValue.phone}
                disabled
              />
            </label>
            <label htmlFor="true">
              Email:
              <input
                onChange={handleValue}
                name="email"
                type="text"
                value={inputValue.email}
                disabled
              />
            </label>
          </div>
        )}
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
