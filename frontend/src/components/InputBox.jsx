export function InputBox({label,placeholder,onChange}){
    return <div className="w-full">
        <div className="block text-gray-700 text-sm font-bold mb-2">{label}</div>
        <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={placeholder}/>
    </div>
}