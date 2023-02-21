// @ts-nocheck
import { collection } from "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { FaSearch, FaTimes } from "react-icons/fa"
import { firestore } from "../../../firebase/clientApp"
import Event from "../../Event"
import { GoSettings } from "react-icons/go"
import axios from "axios"
import FilterModel from "./FilterModel"
import styled from "styled-components"
import SearchCard from "./SearchCard"

// TODO finish modal button picker filter

const useOutsideAlerter = (
  ref: any,
  setFocused: Function,
  setFiltered: Function,
  setWhishlistcard: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFocused(false)
        setFiltered(false)
        setWhishlistcard(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

const SearchBar = () => {
  const [data, dataLoading, dataError] = useCollection(
    collection(firestore, "fl_content"),
    {}
  )
  const [whishlistcard, setWhishlistcard] = useState(false)
  const [provience, setprovience] = useState([])
  const [listaEventi, setListaEventi] = useState<any[]>([])
  const [categorie, setCategorie] = useState<any[]>([])

  useEffect(() => {
    data?.docs.forEach((d) => {
      d.data()._fl_meta_.schema === "evento"
        ? setListaEventi((listaEventi) => [...listaEventi, d.data()])
        : setCategorie((categorie) => [...categorie, d.data()])
    })
  }, [data])
  useEffect(() => {
    axios
      .get("https://comuni-ita.herokuapp.com/api/province")
      .then(function (response) {
        // handle success
        setprovience(response.data)
      })
      .catch(function (error) {
        console.log("there is an error in the api")
      })
  }, [])

  const [searchValue, setSearchValue] = useState("")
  const [focused, setFocused] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [categoria, setCategoria] = useState("")

  const inputRef = useRef(null)
  useOutsideAlerter(inputRef, setFocused, setFiltered, setWhishlistcard)

  return (
    <div ref={inputRef} className="relative z-40 w-full">
      <div className="group flex w-full items-center rounded-full bg-gray-100">
        <button
          onClick={() => {
            focused && setFiltered(!filtered)
          }}
          className={`flex h-12 w-16 items-center justify-center ${
            filtered ? "text-primary-400" : "text-gray-400"
          }`}
        >
          <GoSettings
            size={20}
            style={{ transform: "rotate(90deg)" }}
            onClick={() => {
              whishlistcard ? setWhishlistcard(false) : setWhishlistcard(true)
              setFocused(true)
            }}
          />
        </button>

        {categoria !== "" && (
          <button
            onClick={() => setCategoria("")}
            className="flex w-fit items-center space-x-1 rounded-md bg-primary-100 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
          >
            <span>{categoria}</span>
            <FaTimes size={20} />
          </button>
        )}

        <input
          type="text"
          className="form-input h-full w-full border-0 bg-transparent px-4 py-3 text-gray-800 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
          placeholder="Cerca un luogo meraviglioso...."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          onFocus={() => {
            setFocused(true)
            setWhishlistcard(false)
          }}
        />

        <span className="flex h-12 w-16 items-center justify-center text-gray-400">
          <FaSearch />
        </span>
      </div>

      <SearchModel
        className={`${
          (!searchValue || !focused || whishlistcard) && "hidden"
        } py-4 px-4 shadow-md transition-all`}
      >
        <div className="grid grid-cols-2 gap-2">
          {categorie?.length > 0 &&
            filtered &&
            categorie?.map((cat, index) => (
              <button
                key={index}
                onClick={() => setCategoria(cat?.titolo)}
                className="w-full rounded-md bg-primary-100 px-2 text-lg font-medium text-primary-600 transition duration-200 hover:bg-primary-200"
              >
                {cat?.titolo}
              </button>
            ))}
        </div>

        {listaEventi &&
        listaEventi?.filter((doc) => {
          let cats = []

          doc?.categorie?.forEach((c) => {
            cats.push(categorie?.filter((l) => l?.id === c?.id)[0]?.titolo)
          })

          return doc?.titolo?.match(new RegExp(searchValue, "i")) &&
            categoria === ""
            ? true
            : cats
                .map((el) => el.replace(/\s/g, "").toLowerCase())
                .includes(categoria)
        })?.length > 0 ? (
          listaEventi
            ?.filter((doc) => {
              let cats = []

              doc?.categorie?.forEach((c) => {
                cats.push(categorie?.filter((l) => l?.id === c?.id)[0]?.titolo)
              })

              return categoria !== ""
                ? doc?.titolo?.match(new RegExp(searchValue, "i")) &&
                    cats.includes(categoria)
                : doc?.titolo?.match(new RegExp(searchValue, "i")) ||
                    cats.includes(categoria)
            })
            .map((evento, index) => {
              return (
                <SearchCard
                  key={index}
                  image={evento?.copertina}
                  heading={evento?.titolo}
                  location={evento?.luogo}
                  btnText="Scopri di più"
                  to={`/eventi/${evento?.slug}`}
                />
              )
            })
        ) : (
          <p className="font-medium text-gray-500">Nessun risultato trovato</p>
        )}
      </SearchModel>

      <FilterModel
        provience={provience}
        whishlistcard={whishlistcard && focused}
        setWhishlistcard={setWhishlistcard}
        categorie={categorie}
      />
    </div>
  )
}

export default SearchBar

const SearchModel = styled.div`
  position: absolute;
  top: 4rem;
  left: 0px;
  z-index: 50;
  max-height: 24rem;
  width: 100%;
  overflow-y: scroll;
  border-radius: 6px;
  background-color: white;

  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    margin: 10px auto;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #49475f;
    border-radius: 31px;
  }
`
