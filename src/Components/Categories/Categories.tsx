import './Categories.css';
import Add from "../../../public/assets/SVGs/add.svg";
import close from "../../../public/assets/SVGs/Close.svg";

import useFotos from "../../hook/useFotos";
import useNewFotos from "../../hook/useNewFotos";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldValuesCreateFoto, schema } from './ValidationSchemaFotos';

import { zodResolver } from '@hookform/resolvers/zod';
import useUser from '../../hook/useUser';
import { useState } from 'react';

function Categories() {
  const [toggle, setToggle] = useState<boolean>(false);

  const { fotos, handleCreateFoto } = useFotos();
  const { setNewFotos, resetNewFotos } = useNewFotos();
  const { user } = useUser();
  
  const uniqueCategories = Array.from(
    new Set(fotos.map((foto) => foto.category))
    );
    
    function handleChange(category: string) {
      resetNewFotos();
      setNewFotos((prev) => prev.filter((foto) => foto.category === category));
    }

    const addNewFoto = () => {
      setToggle(prev => !prev)
    }
    
    const closeWrapper = () => {
      setToggle(prev => !prev)
    }

    const appearDesappear = toggle === true ? 'appear' : 'desappear';
    
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FieldValuesCreateFoto>({
      resolver: zodResolver(schema),
      defaultValues: {
        title: '',
        category: '',
        image_url: '',
        user_id: user!.id
      }
    })
    
    const onSubmit: SubmitHandler<FieldValuesCreateFoto> = (data, event) => {
      event?.preventDefault();
      handleCreateFoto(data);
      reset();
      closeWrapper();
    }

  return (
    <div className="container-categories">
      <h1 onClick={() => resetNewFotos()}>all photos</h1>
      {uniqueCategories.map((foto, index) => (
        <h1 key={index} onClick={() => handleChange(foto)}>
          {foto}
        </h1>
      ))}
      <button onClick={addNewFoto} type="button">
        <img src={Add} alt="Add Fotos" />
      </button>
      <div className={`add-fotos-wrapper ${appearDesappear}`}>
        <img
          src={close}
          alt="close"
          className="close-wrapper"
          onClick={closeWrapper}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title:</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input {...field}  id="title" />}
          />
          {errors.title && <p className='error'>{errors.title.message}</p>}

          <label htmlFor="category">Category:</label>
          <Controller
            name='category'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} id="category"
            />}
          />
          {errors.category && <p className='error'>{errors.category.message}</p>}
          
          <label htmlFor="image url">Image URL:</label>
          <Controller
            name='image_url'
            control={control}
            render={({field}) => <input {...field} id='image_url'/>}
          />
          {errors.image_url && <p className='error'>{errors.image_url.message}</p>}

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default Categories;
