import Image from "next/image";

export const SignIn = () => {
  return (
    <div className="bg-white relative">
      <div className="w-screen h-screen relative z-1">
        <Image src="/auth-background.jpg" alt="Logo" fill className="object-contain"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-2 top-[35%] md:top-[25%] bottom-auto">
        <div className="grid grid-cols-1 gap-2 md:gap-4">
          <p className="text-center text-black text-lg md:text-4xl font-bold mb-4 md:mb-6 cursor-default">Note Me Up</p>
          <div className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="border border-black rounded-lg p-2 w-40 h-7 md:w-80 md:h-10 focus:outline-none focus:ring-1 focus:ring-black"/>
            <input type="password" placeholder="Password" className="border border-black rounded-lg mb-4 md:mb-6 p-2 w-40 h-7 md:w-80 md:h-10 focus:outline-none focus:ring-1 focus:ring-black"/>
            <button className="bg-indigo-600 text-white rounded-lg p-2 w-40 md:w-80 hover:bg-blue-600 transition duration-200"> Sign In </button>
            <div className="flex items-center">
              <div className="flex-grow h-px bg-black" />
              <span className="mx-2 text-black text-lg"> or</span>
              <div className="flex-grow h-px bg-black" />
            </div>
            <button className="bg-indigo-600 text-white rounded-lg p-2 w-40 md:w-80 hover:bg-blue-600 transition duration-200"> Sign Up </button>
          </div>
        </div>
      </div>
  </div>
  )
}