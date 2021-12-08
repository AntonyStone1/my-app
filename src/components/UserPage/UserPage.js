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
    website: '',
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
      company: {
        name: data.company,
      },
      website: data.website,
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
              Company:
              <input
                {...register('company', {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                  pattern: /^[A-Za-z]+$/i,
                })}
                type="text"
                autoComplete="off"
              />
            </label>
            {errors?.company?.type === 'required' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>This field is required</p>
            )}
            {errors?.company?.type === 'maxLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                First name cannot exceed 20 characters
              </p>
            )}
            {errors?.company?.type === 'minLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                Password must be at least 3 characters long
              </p>
            )}
            {errors?.company?.type === 'pattern' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>Alphabetical characters only</p>
            )}
            <label htmlFor="true">
              Website:
              <input
                {...register('website', {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                  pattern: /^[A-Za-z]+$/i,
                })}
                type="text"
                autoComplete="off"
              />
            </label>
            {errors?.website?.type === 'required' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>This field is required</p>
            )}
            {errors?.website?.type === 'maxLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                First name cannot exceed 20 characters
              </p>
            )}
            {errors?.website?.type === 'minLength' && (
              <p style={{ color: 'red', marginLeft: '50px' }}>
                Password must be at least 3 characters long
              </p>
            )}
            {errors?.website?.type === 'pattern' && (
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
              Company:
              <input
                onChange={handleValue}
                name="company"
                type="text"
                value={inputValue.company.name}
                disabled
              />
            </label>
            <label htmlFor="true">
              Website:
              <input
                onChange={handleValue}
                name="website"
                type="text"
                value={inputValue.website}
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
