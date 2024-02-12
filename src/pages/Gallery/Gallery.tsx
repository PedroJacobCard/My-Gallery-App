import './Gallery.css'
import next from '../../../public/assets/SVGs/Next.svg';
import prev from "../../../public/assets/SVGs/Previous.svg";
import close from "../../../public/assets/SVGs/Close.svg";
import closeWhite from "../../../public/assets/SVGs/Close-sidebar.svg";
import garbage from "../../../public/assets/SVGs/Garbage.svg";
import rotate from "../../../public/assets/SVGs/Rotate.svg";

import { schema, FieldValuesUpdateFoto } from './ValidationSchemaUpdateFoto';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Head from '../../Components/Head/Head'
import Categories from '../../Components/Categories/Categories';
import NotFound from '../../Components/NotFound/NotFound';

import useNewFotos from '../../hook/useNewFotos'
import { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import useFotos from '../../hook/useFotos';
import { FotosType } from '../../Context/FotosProvider';

const AllFotos = () => {
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [updateFotoWrapper, setUpdateFotoWrapper] = useState(false);
  const [fotoData, setFotoData] = useState<FotosType>();

  const { handleUpdateFoto, handleDeleteFoto } = useFotos();
  const { newFotos } = useNewFotos();
  
  const uniqueCategory = Array.from(new Set(newFotos.map(foto => foto.category)))

  const allFotosHaveTheSameCategory = newFotos.every((foto, _index, arr) => foto.category === arr[0].category)

  const handleNextIndex = () => {
    setIndex((prev) =>
      prev < newFotos.length - 1 ? prev + 1 : prev = newFotos.length - 1
    );
  }

  const handlePrevIndex = () => {
    setIndex(prev => prev > 0 ? prev - 1 : 0)
  }

  const closeWrapper = () => {
    setToggle(prev => !prev)
  }

  const openWrapper = (i: number) => {
    setToggle(prev => !prev)
    setIndex(i)
  }

  const wrapperCarrousel = newFotos.filter((foto, i) => foto && i === index)

  const togglePrevAppearance = index > 0 ? 'show' : 'hide';
  const toggleNextAppearance = index === newFotos.length - 1 ? "hide" : "show";
  const toggleWrapperAppearance = toggle ? "show" : "hide";

  const openUpdateFoto = (foto: FotosType) => {
    setUpdateFotoWrapper(prev => !prev)
    setFotoData(foto)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValuesUpdateFoto>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: fotoData?.id,
      title: fotoData?.title,
      category: fotoData?.category,
      image_url: fotoData?.image_url
    }
  });
  
  const onSubmit: SubmitHandler<FieldValuesUpdateFoto> = (data, event) => {
    event?.preventDefault();
    if (fotoData) {
      handleUpdateFoto(fotoData?.id, data);
      reset(); 
    }
  };

  const deleteFoto = (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this picture?')

    if (confirm) {
      handleDeleteFoto(id)
    }
  }

  return (
    <>
      <div className={`wrapper ${toggleWrapperAppearance}`}>
        <img
          onClick={handlePrevIndex}
          src={prev}
          alt="previous"
          className={`prev ${togglePrevAppearance}`}
        />

        {wrapperCarrousel.map((newFoto, index) => (
          <div key={index}>
            <img
              src={newFoto.image_url}
              alt={newFoto.title}
              title={newFoto.title}
              className="wrapper-foto"
            />
            <img
              src={rotate}
              alt="garbage"
              className="rotate"
              title="update foto"
              onClick={() => openUpdateFoto(newFoto)}
            />
            <img
              src={garbage}
              alt="garbage"
              className="garbage"
              title="Delete foto"
              onClick={() => deleteFoto(newFoto.id)}
            />
          </div>
        ))}

        <img
          onClick={handleNextIndex}
          src={next}
          alt="next"
          className={`next ${toggleNextAppearance}`}
        />
        <img
          src={close}
          alt="close"
          className="close-wrapper"
          onClick={closeWrapper}
        />
      </div>
      <div
        className={`foto-update-wrapper ${
          updateFotoWrapper ? "appear-update-foto" : "desappear-update-foto"
        }`}
      >
        <img
          src={closeWhite}
          alt="close"
          className="close-foto-update-wrapper"
          onClick={() => setUpdateFotoWrapper(prev => !prev)}
        />
        <div className="update-foto-form">
          <h2>Update Photo</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title:</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title.message}</p>
            )}
            <label htmlFor="category">Category:</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
            {errors.category && (
              <p style={{ color: "red" }}>{errors.category.message}</p>
            )}
            <label htmlFor="image_url">Image URL:</label>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
            {errors.image_url && (
              <p style={{ color: "red" }}>{errors.image_url.message}</p>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Head />
      <Categories />
      <div className="container-all-fotos">
        {allFotosHaveTheSameCategory ? (
          <h1>{uniqueCategory.map((foto) => foto.toLocaleUpperCase())}</h1>
        ) : (
          <h1>ALL PHOTOS</h1>
        )}
        <div className="all-fotos">
          {newFotos.length > 0 ? (
            newFotos.map((newFoto, index) => (
              <img
                src={newFoto.image_url}
                alt={newFoto.title}
                key={index}
                onClick={() => openWrapper(index)}
              />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllFotos
