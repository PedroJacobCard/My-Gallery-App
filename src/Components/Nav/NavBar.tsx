import './NavBar.css'
import Lupe from '../../../public/assets/SVGs/Magnifying glass.svg'
import Logo from "../../../public/assets/SVGs/Logo.svg";
import User from "../../../public/assets/SVGs/User.svg";
import closeSidebar from "../../../public/assets/SVGs/Close-sidebar.svg";
import Burger from "../../../public/assets/SVGs/Burger.svg";

import { schema, FieldValuesUpdateUser } from './ValidationSchemaUpdate';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useNewFotos from '../../hook/useNewFotos';
import useFotos from '../../hook/useFotos';
import { useEffect, useState } from 'react';
import useUser from '../../hook/useUser';

const NavBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [toggle, setToggle] = useState(false);
  const [userAccount, setUserAccount] = useState(false);
  const [userAccountWrapper, setUserAccountWrapper] = useState(false);

  const { fotos } = useFotos();
  const { setNewFotos, resetNewFotos } = useNewFotos();
  const { user, logout, handleUpdateUser, handleDeleteUser } = useUser();
  
  const filteredFotos = fotos.filter(foto => foto.title.toLowerCase().includes(inputValue.toLowerCase()))

  useEffect(() => {
    setNewFotos(filteredFotos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])
  
  const handleSearchClick = (title: string) => {
    const searchedFoto = fotos.filter(foto => foto.title === title)
    setNewFotos(searchedFoto)
  }
  
  const openSidebar = () => {
    setToggle(prev => !prev)
  }
  
  const closeNavSidebar = () => {
    setToggle(prev => !prev)
  }
  
  const toggleSidebar = toggle === true ? 'show' : 'hide';
  
  const toggleUserAccount = () => {
    setUserAccount(prev => !prev)
  }
  
  const toggleUserAccountWrapper = () => {
    setUserAccountWrapper(prev => !prev)
  }

  const deleteUser = (id: number) => {
    
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmed) {
      handleDeleteUser(id);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValuesUpdateUser>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_name: user?.user_name || undefined,
      email: user?.email || undefined,
      oldPassword: '',
      password: undefined,
      confirmPassword: undefined
    }
  });

  const onSubmit: SubmitHandler<FieldValuesUpdateUser> = (data, event) => {
    event?.preventDefault();
    handleUpdateUser(data)
  };
    
    return (
      <div className="container-nav">
        <div className="container-nav-logo">
          <img src={Logo} alt="search-loepe" onClick={() => resetNewFotos()} />
        </div>
        <div className="container-nav-search">
          <div className="search-wrapper">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <div className="filtered-fotos">
              {filteredFotos.map((foto, key) => {
                return (
                  <p key={key} onClick={() => handleSearchClick(foto.title)}>
                    {foto.title}
                  </p>
                );
              })}
            </div>
            <img src={Lupe} alt="search-lupe" className="lupe" />
          </div>
        </div>
        <div
          onClick={toggleUserAccount}
          className={`user-photo ${!userAccount ? "display" : "none"}`}
        >
          {user ? (
            <img src={User} alt="user photo" />
          ) : (
            <img src={User} alt="user photo" />
          )}
        </div>
        <div className={`account ${userAccount ? "display" : "none"}`}>
          <img
            src={closeSidebar}
            alt="close"
            className="close-account"
            onClick={toggleUserAccount}
          />
          {user ? (
            <img src={User} alt="user photo" />
          ) : (
            <img src={User} alt="user photo" />
          )}
          <span>{user?.user_name}</span>
          <button onClick={logout}>Log Out</button>
          <button onClick={toggleUserAccountWrapper}>Account Settings</button>
        </div>
        <div className={`burger ${!toggle ? "show" : "hide"}`}>
          <img src={Burger} alt="Burger" onClick={openSidebar} />
        </div>
        <div className={`side-navbar ${toggleSidebar}`}>
          <img
            src={closeSidebar}
            alt="close"
            className="close-sidebar"
            onClick={closeNavSidebar}
          />
          <div className="user-photo-sidebar">
            {user ? (
              <img src={User} alt="user photo" />
            ) : (
              <img src={User} alt="user photo" />
            )}
            <span>{user?.user_name}</span>
            <button onClick={logout}>Log Out</button>
            <button onClick={toggleUserAccountWrapper}>Account Settings</button>
          </div>
          <div className="container-nav-search-sidebar">
            <div className="search-wrapper-sidebar">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Search..."
                className="search-input-sidebar"
              />
              <div className="filtered-fotos-sidebar" onClick={closeNavSidebar}>
                {filteredFotos.map((foto, key) => {
                  return (
                    <p key={key} onClick={() => handleSearchClick(foto.title)}>
                      {foto.title}
                    </p>
                  );
                })}
              </div>
              <img src={Lupe} alt="search-lupe" className="lupe-sidebar" />
            </div>
          </div>
        </div>
        <div className={`account-wrapper ${userAccountWrapper ? "show" : "hide"}`}>
          <img
            src={closeSidebar}
            alt="close"
            className="close-account-wrapper"
            onClick={toggleUserAccountWrapper}
          />
          <div
            className="user-photo-account-wrapper"
          >
            {user ? (
              <img src={User} alt="user photo" />
            ) : (
              <img src={User} alt="user photo" />
            )}
            <span>{user?.user_name}</span>
            <div className="buttons-container">
              <button className="logout-account" onClick={logout}>
                Log Out
              </button>
              <button
                className="delete-account"
                onClick={() => deleteUser(user!.id)}
              >
                Delete Account
              </button>
            </div>
          </div>
          <div className="update-form">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="user_name">User Name:</label>
              <Controller
                name="user_name"
                control={control}
                render={({ field }) => (
                  <input type="text" id="username" {...field} />
                )}
              />
              {errors.user_name && (
                <p style={{ color: "red" }}>{errors.user_name.message}</p>
              )}
              <label htmlFor="email">Email:</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input type="text" id="email" {...field} />
                )}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
              <label htmlFor="oldPassword">Old Password:</label>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <input type="password" id="oldPassword" {...field} />
                )}
              />
              {errors.oldPassword && (
                <p style={{ color: "red" }}>{errors.oldPassword.message}</p>
              )}
              <label htmlFor="password">New Password:</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input type="password" id="password" {...field} />
                )}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input type="password" id="confirmPassword" {...field} />
                )}
              />
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default NavBar;