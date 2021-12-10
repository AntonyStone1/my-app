import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react/cjs/react.development'
import axios from '../../../node_modules/axios/index'
import useUserData from '../../hooks/userUserData/useUserData'

const UserPage = () => {
  const [disable, setDisable] = useState(true)
  const { userData, setUserData, isLoaded, setLoaded } = useUserData()
  const { id } = useParams()
  const history = useHistory()
  const currentUser = userData.find((user) => user.id === +id)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '...',
      company: '...',
      email: '...',
    },
  })
  useEffect(() => {
    // if (!isLoaded) {
    //   axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
    //     currentUser = { ...currentUser, ...response.data }
    //     setLoaded((prev) => !prev)
    //   })
    // }
    if (currentUser) {
      reset({ name: currentUser.name, company: currentUser.company.name, email: currentUser.email })
    }
  }, [userData])
  // eslint-disable-next-line no-console
  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      company: {
        name: data.company,
      },
      email: data.email,
    }
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        data: JSON.stringify({ ...newData, ...currentUser }),
      })
      .then((response) => {
        if (response.data) {
          // eslint-disable-next-line no-use-before-define
          toggleButton()
          setUserData((prev) =>
            prev.map((user) => (user.id === +id ? { ...user, ...newData } : user)),
          )
        }
      })
  }
  const toggleButton = () => {
    setDisable((prev) => !prev)
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
      <div className="user_page-item">
        <form className="user_info" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="true">
            Full name:
            <input
              {...register('name', {
                required: true,
                maxLength: 20,
                minLength: 3,
                pattern: /^[a-zA-Z ]+$/,
              })}
              // defaultValue={currentUser?.name}
              type="text"
              autoComplete="off"
              disabled={disable}
            />
          </label>
          {errors?.name?.type === 'required' && <p>This field is required</p>}
          {errors?.name?.type === 'maxLength' && <p>First name cannot exceed 20 characters</p>}
          {errors?.name?.type === 'minLength' && <p>Password must be at least 3 characters long</p>}
          {errors?.name?.type === 'pattern' && <p>Alphabetical characters only</p>}
          <label htmlFor="true">
            Company:
            <input
              {...register('company', {
                required: true,
                maxLength: 25,
                minLength: 10,
              })}
              // defaultValue={currentUser?.company?.name}
              type="text"
              autoComplete="off"
              disabled={disable}
            />
          </label>
          {errors?.company?.type === 'required' && <p>This field is required</p>}
          {errors?.company?.type === 'maxLength' && <p>First name cannot exceed 20 characters</p>}
          {errors?.company?.type === 'minLength' && (
            <p>Password must be at least 10 characters long</p>
          )}

          <label htmlFor="true">
            Email:
            <input
              {...register('email', {
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
              // defaultValue={currentUser?.email}
              type="email"
              autoComplete="off"
              disabled={disable}
            />
          </label>
          {errors?.email?.type === 'required' && <p>This field is required</p>}
          {errors?.email?.type === 'maxLength' && <p>First name cannot exceed 20 characters</p>}
          {errors?.email?.type === 'minLength' && (
            <p>Password must be at least 3 characters long</p>
          )}
          {!disable && (
            <button type="submit" className="btn user_save-btn">
              Save
            </button>
          )}
        </form>
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
