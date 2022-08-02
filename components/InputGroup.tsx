import className from "classnames"
interface InputGroupProps {
    classNames?: string;
    type: string;
    placeholder: string;
    value: string;
    error: string | undefined;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputGroup: React.FC<InputGroupProps> = ({
    classNames,
    type,
    placeholder,
    value,
    onChange,
    error,
    name
}) => {
  return (
    <div className={classNames}>
            <input type={type} name={name} id="" className={className('w-full border h-[48px] px-3 pb-5 pt-5 bg-gray-50 rounded outline-none placeholder:uppercase placeholder:text-xs placeholder:text-gray-400 placeholder:font-medium focus:bg-white hover:bg-white transition', {'border-rose-600 bg-rose-50': error})} placeholder={placeholder} value={value} onChange={onChange} />
            <span className='block text-rose-600 text-[13px] font-medium mt-1'>{error}</span>
            </div>
  )
}

export default InputGroup