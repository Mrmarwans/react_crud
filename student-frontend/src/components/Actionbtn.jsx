export default function Actionbtn({text,icon,onclick}){
    return (
        <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors" onClick={onclick}>
            {text}
        </button>
        
    );
}

