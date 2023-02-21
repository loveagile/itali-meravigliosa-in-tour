import React from "react"

interface InputProps {
  id: string
  label: string
  type: string
  placeholder: string
  showLabel?: boolean
  className?: string
  value?: string
  onChange?: (e: any) => void
}

const Input = ({
  id,
  label,
  type,
  placeholder,
  showLabel = true,
  className,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {showLabel && (
        <label
          htmlFor={id}
          className="text-md mb-1 font-semibold text-gray-500"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="searchInput form-input rounded-full border-0
        px-4 py-3 caret-primary-500
        outline-none file:mr-4
        file:rounded-full file:border-0 file:bg-primary-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-primary-700 placeholder:text-gray-400 hover:file:bg-primary-100 focus:border-0 focus:ring-0"
      />
    </div>
  )
}

export default Input
