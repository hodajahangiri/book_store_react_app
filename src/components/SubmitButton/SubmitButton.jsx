
function SubmitButton({textButton}) {
    return (
        <>
            <button className="w-full self-center bg-green-600 hover:bg-green-800 text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
                type="submit">
                {textButton}
            </button>
        </>
    )
}

export default SubmitButton