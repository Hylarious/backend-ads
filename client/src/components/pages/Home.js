import { Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllAds } from "../../redux/adsRedux";
import AdsList from "../features/AdsList";
import Search from "../features/Search/Search";

const Home = () => {
  const ads = useSelector(getAllAds);
  console.log(ads);
  return (
    <Row>
      {ads.length === 0 ? (
        <Spinner key="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <Search />
          <AdsList ads={ads} />
        </div>
      )}
    </Row>
  );
};

export default Home;
