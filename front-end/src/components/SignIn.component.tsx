import Image from "next/image";

export const SignIn = () => {
    return (
      <div className="bg-white relative">
        <div className="w-screen h-screen relative z-1">
          <Image src="/auth-background.jpg" alt="Logo" fill className="object-contain"
          />
        </div>
        <div className="absolute flex flex-col justify-center items-center top-2/7 left-3/7 z-2 transform ">
          <h1 className="text-center text-black text-2xl font-bold">Note Me Up</h1>
          <h1 className="text-center text-black text-2xl font-bold">Sign In</h1>
        </div>
      </div>  
    )
}