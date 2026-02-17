
function SubmitButton({ textButton }) {
    return (
        <>
            <button className="w-full self-center border-2 border-[#3a5a40] bg-[#588157] hover:bg-[#3a5a40] text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
                type="submit">
                {textButton}
            </button>
        </>
    )
}

export default SubmitButton