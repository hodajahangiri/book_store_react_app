import React from 'react'

function DeleteButton({ textButton, handleClick }) {
    return (
        <div className="flex flex-col wrap-normal items-center">
            <button className="mt-10! w-full md:w-3/4 items-center self-center border-2 border-[#9b2226] bg-[#ae2012] hover:bg-[#9b2226] text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
                onClick={handleClick}>
                {textButton}
            </button>
        </div>
    )
}

export default DeleteButton