import './Login.css';
import GalleryLogin from "../../../public/assets/images/Gallery-login.jpg";
import Logo from "../../../public/assets/SVGs/Logo.svg";
import Close from "../../../public/assets/SVGs/Close-sidebar.svg";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValuesSignupLogin, schema } from './ValidationSchemaSignupLogin';

import useUser from '../../hook/useUser';

function SignupLoginPage() {
  const { handleCreateUser, errorMessage, setErrorMessage } = useUser();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValuesSignupLogin>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValuesSignupLogin> = (data) => handleCreateUser(data);

  
  const closeError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="container-login">
      <div className="image-login">
        <img src={GalleryLogin} alt="Gallery login foto" />
      </div>
      <div className="form-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="welcome">
            <h1>Welcome to</h1>
            <img className="logo" src={Logo} alt="logo" />
          </div>
          <h2>Sign Up</h2>
          <div className="form-inputs">
            <label htmlFor="name">User Name:</label>
            <Controller
              name="user_name"
              control={control}
              render={({ field }) => (
                <input type="text" autoComplete="User Name" {...field} />
              )}
            />
            {errors.user_name && (
              <p className="error">{errors.user_name.message}</p>
            )}
            <label htmlFor="email">Email:</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="text" autoComplete="Email" {...field} />
              )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <label htmlFor="password">Password:</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input type="password" autoComplete="Password" {...field} />
              )}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <label htmlFor="confirm-password">Confirm Password:</label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  autoComplete="Password confirmation"
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="button-signup">
            {errorMessage && (
              <div className="error">
                <p>
                  {(errorMessage.response?.data as string) ||
                    "An error occurred"}
                </p>
                <img src={Close} alt="close" onClick={closeError} />
              </div>
            )}
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupLoginPage;
