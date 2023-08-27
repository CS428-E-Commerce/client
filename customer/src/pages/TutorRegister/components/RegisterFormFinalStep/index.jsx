import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";

import Button from "components/Button";
import yup from "config/yupGlobal";

import classes from "./styles.module.scss";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  certificates: yup.string().required("Certificates is required"),
  skills: yup.string().required("Skills is required"),
  yearExperience: yup.number().required("YearExperience is required"),
  description: yup.string().required("Description is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
});

const RegisterFormFinalStep = memo(({ next }) => {
  const avatar = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    next({ ...data, avatar: avatar?.current });
  };

  const encodeImageToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = event => {
      const encodedImage =
        "data:" + file.type + ";base64," + event.target.result.split(",")[1];
      callback(encodedImage);
    };
    reader.readAsDataURL(file);
  };

  const onChangeImage = event => {
    const selectedFile = event.target.files[0];
    encodeImageToBase64(selectedFile, encodedImageString => {
      avatar.current = encodedImageString;
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Username</label>
        <input
          {...register("username")}
          className={classes.input}
          placeholder="Your Name"
        />
        {errors.username?.message && (
          <p className={classes.error}>{errors.username.message}</p>
        )}
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Avatar</label>
        <input
          className="w-100"
          type="file"
          accept="image/*"
          onChange={onChangeImage}
        />
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Certificates</label>
        <input
          {...register("certificates")}
          className={classes.input}
          placeholder="Your Certificates"
        />
        {errors.certificates?.message && (
          <p className={classes.error}>{errors.certificates.message}</p>
        )}
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Skills</label>
        <input
          {...register("skills")}
          className={classes.input}
          placeholder="Your Skills"
        />
        {errors.skills?.message && (
          <p className={classes.error}>{errors.skills.message}</p>
        )}
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Year Experience</label>
        <input
          {...register("yearExperience")}
          className={classes.input}
          placeholder="Your Year Experience"
        />
        {errors.yearExperience?.message && (
          <p className={classes.error}>{errors.yearExperience.message}</p>
        )}
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Description</label>
        <input
          {...register("description")}
          className={classes.input}
          placeholder="Your Description"
        />
        {errors.description?.message && (
          <p className={classes.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Address</label>
        <input
          {...register("address")}
          className={classes.input}
          placeholder="Your Address"
        />
        {errors.address?.message && (
          <p className={classes.error}>{errors.address.message}</p>
        )}
      </div>

      <div className={clsx(classes.formGroup, classes.formGroupMarginTop)}>
        <label className={classes.formLabel}>Phone</label>
        <input
          {...register("phone")}
          className={classes.input}
          placeholder="Your Phone"
        />
        {errors.phone?.message && (
          <p className={classes.error}>{errors.phone.message}</p>
        )}
      </div>
      <Button width="100%">Register</Button>
    </form>
  );
});

export default RegisterFormFinalStep;
