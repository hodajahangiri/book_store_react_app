
function EditButton({textButton,handleClick}) {
    return (
       <div className="flex flex-col wrap-normal items-center gap-7">
            <button className="mb-20! mt-10! w-full md:w-3/4 items-center self-center bg-orange-800 hover:bg-orange-900 text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
             onClick={handleClick}>
                {textButton}
            </button>
        </div>
    )
}

export default EditButton