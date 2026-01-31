import { BsCheck } from "react-icons/bs";

export const Checkbox = ({ checked, ...props }) => (
  <div className="flex items-center">
    <input
      id="checkbox-all-search"
      type="checkbox"
      checked={checked}
      className="opacity-0 absolute peer"
      {...props}
    />
    <label
      htmlFor="checkbox-all-search"
      className="w-4 h-4 flex justify-center items-center border border-primary rounded-full cursor-pointer
                                peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-1 peer-focus:ring-primary"
    >
      {checked && <BsCheck
        htmlFor="checkbox-all-search"
        className="  text-secondary" />}
    </label>
  </div>
)