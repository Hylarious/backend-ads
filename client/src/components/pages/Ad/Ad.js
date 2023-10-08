import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { Button, Spinner } from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import styles from "./Ad.module.scss";

const Ad = () => {
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
        <div className="my-5">
          <h2>{adData.title}</h2>
          <div>
            <p>{adData.user.login}</p>
            <img
              className={styles.avatar}
              src={`${IMGS_URL}/${adData.user.avatar}`}
              alt=""
            ></img>
          </div>
          <div>
            <img
              className={styles.img}
              src={`${IMGS_URL}/${adData.photo}`}
              alt=""
            ></img>
          </div>
          <div>
            <p>{adData.content}</p>
            <p>Price: {adData.price}</p>
            <p>Location: {adData.loc}</p>
            <p>Date: {adData.date}</p>
          </div>
          <Button className="ms-auto" as={NavLink} to={`/ad/edit/${adData._id}`}>
            Edit Post
          </Button>
          <Button
            className="ms-auto"
            as={NavLink}
            to={`/ad/delete/${adData._id}`}
          >
            Delete Post
          </Button>
        </div>
      )}
    </div>
  );
};

export default Ad;
