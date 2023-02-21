import React from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useDocument } from "react-firebase-hooks/firestore"
import { doc, getFirestore } from "firebase/firestore"
import { firebaseApp, firestore } from "../firebase/clientApp"

interface EventProps {
  image: string
  heading: string
  location: string
  btnText: string
  to: string
  icon?: string
}

const Event = ({ image, heading, location, btnText, to, icon }: EventProps) => {
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
    <div className={`!z-0 flex space-x-6 py-3`}>
      <div className={`relative h-44 w-40`}>
        <img
          src={image}
          className="eventImage h-full w-full min-w-[10rem] object-cover"
          alt={heading}
        />

        <img
          className="eventIcon absolute -bottom-4 -right-4 h-12 w-12 rounded-full object-contain p-2"
          src={value?.data()?.icona}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-evenly -space-y-10">
        <div className="space-y-1">
          <h4 className="text-lg font-medium line-clamp-2">{heading}</h4>
          <p className="flex items-center space-x-1 text-sm">
            <FaMapMarkerAlt /> <span>{location}</span>
          </p>
        </div>
        <br />

        <a href={to}>
          <button className="w-fit rounded-full bg-red-500 py-2 px-6 font-bold text-white hover:bg-red-700">
            {btnText}
          </button>
        </a>
      </div>
    </div>
  )
}

export default Event
