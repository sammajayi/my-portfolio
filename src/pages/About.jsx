
const About = () => {
  return (
    <div className="flex gap-60 p-10">
          <div className="w-[30rem]">
            <h1>Hey there, I am a Frontend Developer</h1>
            <p className="w-[30rem] text-justify text-lg">
              I am a frontend developer with experience in building websites and
              web applications. I specialize in JavaScript and have professional
              experience working with React. I am also familiar with other
              frontend technologies such as HTML, CSS, and SASS. I am passionate
              about learning new technologies and am always looking for
              opportunities to improve my skills.
            </p>
            <button className="bg-blue-500 text-white p-2 rounded-md mt-5">
              Say Hi!
            </button>
          </div>

          <div className="w-[20rem] h-[10] ">
            <img
              className="rounded-full"
              src="/assets/images/my-image.png"
              alt="a picture of myself smiling"
            />
          </div>
        </div>

  )
}

export default About