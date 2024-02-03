export function Button({label,onClick}){
    return <button onClick={onClick} className="bg-black hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {label}
    </button>
}