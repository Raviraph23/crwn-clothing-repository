import {
  signInWithGooglePopup,
  createDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import { useState } from "react";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import FormInput from "../../components/formInput/form-input.component.jsx";

const defaultSignInFields = {
  email: "",
  password: "",
};

const Authentication = () => {
  const [signInFields, setSignInFields] = useState(defaultSignInFields);
  const { email, password } = signInFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignInFields({ ...signInFields, [name]: value });
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createDocumentFromAuth(user);
  };

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In with Google popup</button>
      <SignUpForm />
    </div>
  );
};

export default Authentication;
