import { Row } from "react-bootstrap";
import AdsListItem from "./AdsListItem";

const AdsList = (props) => {
  return (
    <Row className="my-3">
      {props.ads.map((ad) => {
        return (
          <AdsListItem
            key={ad._id}
            id={ad._id}
            title={ad.title}
            loc={ad.loc}
            photo={ad.photo}
          />
        );
      })}
    </Row>
  );
};

export default AdsList;
