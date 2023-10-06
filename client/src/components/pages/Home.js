import { Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllAds } from "../../redux/adsRedux";
import AdsList from "../features/AdsList";

const Home = () => {

  const ads = useSelector(getAllAds)
  console.log(ads)
  return (
   <Row>
    {ads.length === 0 ? 
				<Spinner key="spinner" animation="border" role="status">
      				<span className="visually-hidden">Loading...</span>
              </Spinner> 
              : <AdsList ads={ads}/>}
   </Row>
  );
};

export default Home;
