import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import AdForm from "../../features/AdForm/AdForm";
import { Spinner } from "react-bootstrap";

const EditAd = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  console.log(adData);
  return (
    <div>
      {adData === undefined ? (
        <Spinner key="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <AdForm {...adData}>Edit your ad!</AdForm>
      )}
    </div>
  );
};

export default EditAd;
