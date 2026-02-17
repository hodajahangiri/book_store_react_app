
function EditButton({ textButton, handleClick }) {
    return (
        <div className="flex flex-col wrap-normal items-center gap-7">
            <button className="mt-10! w-full md:w-3/4 items-center self-center border-2 border-[#005f73] bg-[#0a9396] hover:bg-[#005f73] text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
                onClick={handleClick}>
                {textButton}
            </button>
        </div>
    )
}

export default EditButton