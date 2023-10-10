import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../config";
import AdForm from "../../features/AdForm/AdForm";
import { checkIfLoggedIn } from "../../../redux/usersRedux";
import { Navigate } from "react-router-dom";
import { addAdRequest, editAdRequest } from "../../../redux/adsRedux";

const AddAd = () => {
const dispatch = useDispatch()
  const user = useSelector(state => checkIfLoggedIn(state))
  
const handleAdd = data => dispatch(addAdRequest({...data, user: user.login}))


  // const options = {
  //   method: "GET",
  //   credentials: "include",
  // };

  // fetch(`${API_URL}/auth/user`, options)
  // .then((res) => {
  //   if (res.status === 200) {
  //     console.log(res)
  //     return (res);
  //   }
  // }).catch((e) => {console.log(e)})
  
if (!user) return <Navigate to='/'/>
  return (
    <div>
      <AdForm action={handleAdd} >Add your ad!</AdForm>
    </div>
  );
};

export default AddAd;
