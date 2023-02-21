import { Key, SetStateAction, useState } from "react"
import styled from "styled-components"
import { regions } from "./RegionsData"

interface Props {
  province: []
  categorie: []
  whishlistcard: Boolean
  setWhishlistcard: (arg: Boolean) => void
}

const FilterModel: React.FC<Props> = ({
  province,
  categorie,
  whishlistcard,
  setWhishlistcard,
}) => {
  const [CollapseSetting, setCollapseSetting] = useState("")
  const [open, setOpen] = useState(false)

  const data = [
    {
      title: "Regioni",
      collapseData: regions,
    },
    {
      title: "Categorie",
      collapseData: categorie,
    },
  ]

  const collapseHandle = (value: SetStateAction<string>) => {
    if (value === "collapse1") {
      setCollapseSetting(value)
      open ? setOpen(false) : setOpen(true)
    }
    if (value === "collapse2") {
      setCollapseSetting(value)
      open ? setOpen(false) : setOpen(true)
    }
    if (value === "collapse3") {
      setCollapseSetting(value)
      open ? setOpen(false) : setOpen(true)
    }
    if (value === "collapse4") {
      setCollapseSetting(value)
      open ? setOpen(false) : setOpen(true)
    }
  }
  const ClickHandle = (value: any) => {
    if (value.titolo) {
      window.open(`/categoria/${value.titolo.toLowerCase()}`, "_self")
    }
    if (value.nome) {
      window.open(`/provincia/${value.nome.toLowerCase()}`, "_self")
    }
    if (value.slug) {
      window.open(`/regione/${value.slug.toLowerCase()}`, "_self")
    }
  }

  return (
    <>
      {whishlistcard && (
        <FilterContainer>
          <div className="relative w-full rounded-lg bg-white shadow">
            {/* close Btn */}
            <button 
              type="button"
              onClick={() =>
                whishlistcard ? setWhishlistcard(false) : setWhishlistcard(true)
              }
              className="absolute top-0 right-0 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            {/* Body */}
            <div className="p-5 ">
              {/*  collapse data started  */}
              <div id="accordion-collapse" data-accordion="collapse">
                {data.map(({ title, collapseData }, index) => (
                  <>
                    <button
                      onClick={() => collapseHandle(`collapse${index + 1}`)}
                    >
                      <span>{title}</span>
                      <svg
                        className={`h-6 w-6 ${
                          CollapseSetting === `collapse${index + 1}` && open
                            ? "rotate-180"
                            : ""
                        }  shrink-0`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>

                    <div
                      className={`${
                        CollapseSetting === `collapse${index + 1}` && open
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      <div className="dataFields border border-b-0 border-gray-200 py-2">
                        {collapseData.map(
                          (value: any, index: Key | null | undefined) => (
                            <button
                              onClick={() => ClickHandle(value)}
                              key={index}
                            >
                              <div className="flex h-full items-center justify-center gap-3 font-semibold text-green-600">
                                {value.icona && (
                                  <div className=" flex  max-h-5 w-[30px] items-center justify-center p-1 ">
                                    <img
                                      src={value.icona}
                                      className="h-full w-full"
                                    />
                                  </div>
                                )}
                                {value.titolo && <span>{value.titolo}</span>}
                                {value.regione && <span>{value.regione}</span>}
                                {value.name && <span>{value.name}</span>}
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
              {/*  collapse data ended  */}
            </div>
          </div>
        </FilterContainer>
      )}
    </>
  )
}

export default FilterModel

// Css
const FilterContainer = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 53px;
  left: 10px;
  width: calc(100% - 20px);
  z-index: 9999;
  h2 {
    -webkit-box-shadow: 1px 3px 3px -3px #000000;
    box-shadow: 1px 3px 3px -3px #000000;
    background: #91be855d;
  }
  #accordion-collapse {
    button {
      width: 100%;
      min-height: 40px;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid gainsboro;
      border-radius: 3px;
      margin-bottom: 5px;
      background: rgba(154, 156, 153, 0.3);
    }
    .dataFields {
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
      max-height: 250px;
      overflow-y: auto;
      button {
        background: rgba(36, 108, 39, 0.3);
      }
    }
  }
`
