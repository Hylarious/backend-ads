import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteAdRequest, getAdById } from "../../../redux/adsRedux";
import { checkIfLoggedIn } from "../../../redux/usersRedux";

const DeleteAd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector((state) => checkIfLoggedIn(state));
  const ad = useSelector((state) => getAdById(state, id));

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAdRequest(id));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/ad/${id}`);
  };
  if (!user) return <Navigate to="/" />;
  else
    return (
      <div className="col-sm-6 mx-auto">
        <p>
          Are you sure you want to delete the ad? This action cannot be
          reversed!
        </p>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    );
};

export default DeleteAd;
