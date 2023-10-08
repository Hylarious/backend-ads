import { API_URL } from "../../../config";
import AdForm from "../../features/AdForm/AdForm";

const AddAd = () => {
  const options = {
    method: "GET",
    credentials: "include",
  };

  fetch(`${API_URL}/auth/user`, options)
    .then((res) => {
      console.log("loggedIn: ", res);
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <div>
      <AdForm>Add your ad!</AdForm>
    </div>
  );
};

export default AddAd;
