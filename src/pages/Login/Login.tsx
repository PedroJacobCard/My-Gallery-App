import './Login.css';
import GalleryLogin from "../../../public/assets/images/Gallery-login.jpg";
import Logo from "../../../public/assets/SVGs/Logo.svg";
import Close from "../../../public/assets/SVGs/Close-sidebar.svg";

import { schema, FieldValuesLogin } from './ValidationSchemaLogin';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useUser from '../../hook/useUser';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

function LoginPage() {
  const {
    handleGetUser,
    errorMessage,
    setErrorMessage,
    loading,
    successfullyCreated,
    setSuccessfullyCreated,
  } = useUser();
  
  const {
    control, handleSubmit, formState: { errors }
  } = useForm<FieldValuesLogin>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValuesLogin> = (data, event) => {
    event?.preventDefault();
    handleGetUser(data);
  }

  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');
  }

  const closeError = () => {
    setErrorMessage(null)
  }
  
  const closeSuccess = () => {
    setSuccessfullyCreated(false);
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
            <img className='logo' src={Logo} alt="logo" />
          </div>
          <h2>Sign in</h2>
          <div className="form-inputs">
            <label htmlFor="name or email">Email:</label>
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
          </div>
          <div className="buttons">
            <button type="submit">Sign in</button>
            <button type="button" onClick={navigateToSignup}>
              Sign up
            </button>
          </div>
        </form>
        {
          errorMessage && (
            <div className="error">
              <p>
              {errorMessage.response?.data as string}
              </p>
              <img src={Close} alt="close" onClick= {closeError} />
            </div>
          )
        }
        {loading && <Loading />}
        {successfullyCreated && (
          <div className="success">
            <p>
            User created! You can now log in with your new account.
            </p>
            <img src={Close} alt="close" onClick={closeSuccess} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;