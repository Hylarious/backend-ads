import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IMGS_URL } from "../../config";

const AdsListItem = (props) => {
  return (
    <Card className=" col-sm-4 text-center">
      <Card.Img variant="top" src={`${IMGS_URL}/${props.photo}`} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.loc}</Card.Text>
        <Button className="ms-auto" as={NavLink} to={`/ad/${props.id}`}>
          Show more
        </Button>
      </Card.Body>
    </Card>
  );
};
export default AdsListItem;
