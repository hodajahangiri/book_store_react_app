import LayoutPhoto from '../../components/LayoutPhoto/LayoutPhoto';
import aboutPic from '../../assets/bookStore_1.jpg';
import storyPic from '../../assets/bookStore_2.jpg';
import missionPic from '../../assets/bookStore_3.jpg';

function About() {
  return (
    <>
      <LayoutPhoto />
      <div className='flex flex-col items-center w-full'>
        <div className="flex flex-col my-15! mx-5!  md:w-3/4 min-h-100 border-3 border-[#ffb703]  bg-[#f8f6f0] shadow-2xl shadow-[#dad7cd] rounded-2xl p-3!">
          <p className='text-black font-bold'>ABOUT US</p>
          <hr className="h-px my-3! text-black border w-full col-span-2" />
          <div className='grid grid-cols-1 md:grid-cols-2 place-items-center pt-3!'>
            <img src={aboutPic} alt='bookStorePic'
              className='border-4 border-amber-800 w-60 h-60 rounded-2xl self-center'
            />
            <div className='px-3! py-3!'>
              <p className='text-black font-bold'>🤗 Welcome to Our BookStore</p>
              <hr className="h-px my-3! text-gray-500 border w-9/10 col-span-2" />
              <p className='text-black text-xs md:text-sm text-justify leading-loose'>
                Founded in 2026, NextChapter Books was created with one simple mission: to make great books accessible to everyone, everywhere. Whether you love gripping thrillers, heartwarming romance, personal development, academic resources, or children’s classics,
                we bring thousands of titles right to your fingertips.</p>
            </div>
          </div>
          <hr className="h-px my-3! text-black border w-full col-span-2" />
          <div className='grid grid-cols-1 md:grid-cols-2 place-items-center pt-3!'>
            <div className='px-3! py-3!'>
              <p className='text-black font-bold'>📚 Our Story</p>
              <hr className="h-px my-3! text-gray-500 border w-9/10 col-span-2" />
              <p className='text-black text-xs md:text-sm text-justify leading-loose'>
                What started as a small passion project by a group of lifelong readers has grown into a trusted online bookstore serving book lovers around the world. We believe books have the power to spark imagination, build knowledge, and connect communities.
                <br />
                <span>
                  <b>👍 What We Offer</b>
                  <br />
                  . A wide selection of fiction and non-fiction titles
                  <br />
                  . Secure online ordering
                  <br />
                  . Fast and reliable delivery
                  <br />
                  . Friendly customer support
                </span>
              </p>
            </div>
            <img src={storyPic} alt='bookStorePic'
              className='border-4 border-amber-800 w-60 h-60 rounded-2xl hidden md:block'
            />
          </div>
          <hr className="h-px my-3! text-black border w-full col-span-2" />
          <div className='grid grid-cols-1 md:grid-cols-2 place-items-center pt-3!'>
            <img src={missionPic} alt='bookStorePic'
              className='border-4 border-amber-800 w-60 h-60 rounded-2xl self-center'
            />
            <div className='px-3! py-3!'>
              <p className='text-black font-bold'>💡 Our Mission</p>
              <hr className="h-px my-3! text-gray-500 border w-9/10 col-span-2" />
              <p className='text-black text-xs md:text-sm text-justify leading-loose'>
                Our mission is to promote a culture of reading by providing affordable books, personalized recommendations, and a seamless shopping experience.
                <br />
                <span>
                  <b>❤️ Why Choose Us?</b>
                  <br />
                  . Competitive pricing
                  <br />
                  . Easy-to-use website
                  <br />
                  . Secure payment options
                  <br />
                  . Dedicated customer care team
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About