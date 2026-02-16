import BookShelf from '../../assets/bookshelf.png';

function LayoutPhoto() {
  return (
    <div className="w-full h-30 md:h-60 border-b-black border-b-2">
      <img className='h-full w-full object-cover object-center'
        src={BookShelf} alt="Books" />
    </div>
  )
}

export default LayoutPhoto