import React from "react"
import { Wrapper, ActivatorButton, DropdownList, SelectSkills} from "./styles";

interface IDropdownItem {
  id: number;
  text: string;
}

interface IProps {
  activatorText?: string;
  items?: IDropdownItem[];
  selectedProfession: any
}

const dropdownItems = [
  {
    id: 1,
    text: "Photographer"
  },
  {
    id: 2,
    text: "Artist"
  },
  {
    id: 3,
    text: "Video-Maker"
  },
  {
    id: 4,
    text: "Content Creator"
  },
  {
    id: 5,
    text: "Influencer"
  }
];

const Dropdown = ({
  items = dropdownItems,
  activatorText = "Select your role",
  selectedProfession = () => { }
}: IProps) => {



  return <div>
    <SelectSkills 
      id="dropdown1"
      name="role"
      placeholder="Select your role"
      className="form-input rounded-2xl border-0 bg-gray-100 px-4 py-3 text-gray-800 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
      onChange={(e: any) => {
        selectedProfession(e.target.value)
      }}>
        {dropdownItems.map((item) => {
          return (
            <option key={item.id}>
              {item.text}
            </option>
          )
        }
    )}
  </SelectSkills>
  </div>
   
};

export default Dropdown;
