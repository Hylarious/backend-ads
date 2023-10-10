import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { editAdRequest, getAdById } from "../../../redux/adsRedux";
import AdForm from "../../features/AdForm/AdForm";
import { Spinner } from "react-bootstrap";
import { checkIfLoggedIn } from "../../../redux/usersRedux";

const EditAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));

  
  const user = useSelector(state => checkIfLoggedIn(state))
  
const handleEdit = data => {
  dispatch(editAdRequest({...data, user: user.login}, id));
  navigate(`/ad/${id}`)
} 

  console.log(adData);
  if (!user) return <Navigate to='/'/>
  else return (
    <div>
      {adData === undefined ? (
        <Spinner key="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <AdForm action={handleEdit}{...adData}>Edit your ad!</AdForm>
      )}
    </div>
  );
};

export default EditAd;
