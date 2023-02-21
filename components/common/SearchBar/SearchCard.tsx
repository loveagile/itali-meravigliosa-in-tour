import React from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useDocument } from "react-firebase-hooks/firestore"
import { doc, getFirestore } from "firebase/firestore"

import styled from "styled-components"
import { firebaseApp } from "../../../firebase/clientApp"

interface EventProps {
  image: string
  heading: string
  location: string
  btnText: string
  to: string
  icon?: string
}

const SearchCard = ({
  image,
  heading,
  location,
  btnText,
  to,
  icon,
}: EventProps) => {
  const [value, loading, error] = useDocument(
    doc(
      getFirestore(firebaseApp),
      "fl_content",
      icon ? icon : "AD1ipx98fV1rmI7pEo4C"
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <Container>
      <div className="image" style={{ backgroundImage: `url("${image}")` }}>
        {/* <img src={value?.data()?.icona} alt="" className="eventIcon" /> */}
      </div>

      <div className="content text-black">
        <h4 title={heading}>
          {heading.length > 16 ? heading.slice(0, 16) + ".." : heading}
        </h4>
        <div className="map">
          <FaMapMarkerAlt />{" "}
          <span>
            {location.length > 16 ? location.slice(0, 16) + ".." : location}
          </span>
        </div>

        <a href={to}>{btnText}</a>
      </div>
    </Container>
  )
}

export default SearchCard

const Container = styled.div`
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 35% 65%;
  height: 100px;
  min-width: 100%;
  margin-bottom: 20px;
  column-gap: 5px;
  border-radius: 5px;
  .image {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 98px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 5px;
    backdrop-filter: blur(5px);
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      right: -9px;
      bottom: -2px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    padding: 5px;
    h4 {
      font-size: 15px;
    }
    .map {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
    }
    a {
      display: block;
      padding: 5px 8px;
      text-align: center;
      background: #ff000096;
      border-radius: 30px;
      color: white;
    }
  }
`
