import {PiArrowFatLineRightBold}from 'react-icons/pi'

export default function Search({Value,setValue,result})
{
    return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-10">
        <form className="flex flex-row justify-between w-1/3">
        <input value={Value} onChange={setValue} placeholder="Lecture's name" className="bg-gray-100 placeholder:text-gray-400 w-1/3 rounded-3xl py-3 pl-10 pr-3 placeholder:italic min-w-[15rem]"></input>
        <button className="bg-orange-400 text-white rounded-3xl w-fit px-10">Search</button>
        </form>
        <div className="w-1/3 h-fit flex  p-10 border-orange-400 border-4 rounded-md min-h-[25%]">
            <div className='flex flex-row justify-between items-center w-full'> 
            {result?(<div><span className='text-xl'>{result}</span><div className='text-4xl'><PiArrowFatLineRightBold/></div></div>):(<></>)}
            </div>
        </div>
    </div>
    )
}