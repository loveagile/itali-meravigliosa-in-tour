import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useContext, useState } from "react"
import { FaTimes } from "react-icons/fa"
import WishContext from "./context/WishContext"
import Event from "./Event"

interface Props {
  modalOpen: boolean
  setModalOpen: Function
}

const WishModal: React.FC<Props> = ({ modalOpen, setModalOpen }) => {
  const { items, remove } = useContext(WishContext)
  const removeFromWish = (id: string) => {
    if (remove) {
      remove(id)
    }
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all">
              <div className="px-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Wishlist
                </Dialog.Title>
                <div className="mb-6 mt-2">
                  <p className="text-sm text-gray-500">
                    Ecco i luoghi che hai aggiunto alla wishlist:
                  </p>
                </div>
              </div>

              <div className="max-h-96 overflow-y-scroll">
                {items?.length ? (
                  items?.map((item) => (
                    <div className="flex items-center space-x-2 px-6">
                      <button
                        title="wishlist"
                        onClick={() => removeFromWish(item.id)}
                        className="h-fit rounded-md bg-secondary-100 p-2 text-secondary-500 outline-none ring-secondary-200 ring-offset-2 transition duration-200 hover:bg-secondary-200 focus:ring-2"
                      >
                        <FaTimes />
                      </button>

                      <Event
                        image={item.image}
                        heading={item.heading}
                        location={item.location}
                        btnText="Visita"
                        to={item.to}
                      />
                    </div>
                  ))
                ) : (
                  <p className="mt-4 px-6 text-lg text-gray-800">
                    Non hai aggiunto luoghi alla Wishlist
                  </p>
                )}
              </div>

              <div className="mt-4 px-6">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-500 transition duration-200 hover:bg-secondary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Fatto
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default WishModal
