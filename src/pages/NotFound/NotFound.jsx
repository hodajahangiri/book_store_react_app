import notFoundPic from '../../assets/notFoundPic.jpg'

function NotFound() {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className="relative flex flex-col justify-center my-15! mx-5!  md:w-3/4 min-h-100 border-3 border-[#ffb703]  bg-[#f8f6f0] shadow-2xl shadow-[#dad7cd] rounded-2xl p-3!">
        <div className='grid grid-cols-1 md:grid-cols-2 place-items-center pt-3!'>
          <img src={notFoundPic} alt='bookStorePic'
            className='border-4 border-gray-500 w-60 h-60 rounded-2xl self-center'
          />
          <div className='px-3! py-3! text-center'>
            <p className='text-gray-500 font-bold text-6xl'>OOPS!!!</p>
            <p className='text-gray-400 font-bold text-xl'>PAGE NOT FOUND</p>
            <p className='text-gray-500 font-bold text-9xl'>404</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound