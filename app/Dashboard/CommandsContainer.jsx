import React, {useState} from 'react'


export default function CommandsContainer(props) {
    const [activeElement, setActiveElement] = useState(null);

    const handleClick = (e) => {
        setActiveElement(e)
        console.log(activeElement)
    }



  return (
    <div className="flex flex-col w-1/3 h-7/8 mt-12 ml-4 mb-12 rounded-md border-2 border-slate-800 2/1">
      <div>
        <ul className="flex space-x-4 bg-slate-800 py-4">
            <li onClick={() => handleClick('SHS') } 
            className={`cursor-pointer border-2 border-white my-2 mx-1 px-6 py-2 ${activeElement === 'SHS' ? 'bg-white text-bg-slate-800' : 'text-white '}`}>
                SHS
            </li>
            <li onClick={() => handleClick('SHC') } 
            className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${activeElement === 'SHC' ? 'bg-white text-bg-slate-800' : 'text-white'}`}>
                SHC
            </li>
            <li onClick={() => handleClick('SHP') } 
            className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${activeElement === 'SHP' ? 'bg-white text-bg-slate-800' : 'text-white'}`}>
                SHP
            </li>
            <li onClick={() => handleClick('SHH') } 
            className={`cursor-pointer border-2 border-white mx-1 my-2 px-6 py-2  ${activeElement === 'SHH' ? 'bg-white text-bg-slate-800' : 'text-white border-1'}`}>
                SHH
            </li>
        </ul>
        </div>
        {activeElement}
        {/* {props.children} */}
    </div>
    
  )
}
