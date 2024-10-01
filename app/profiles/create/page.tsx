import { Input } from "@/components/ui/input";

export default function Home(){
    const list = ["haldwani", "delhi", "mumbai" , "blr" , "noida"]
    return <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-4">
             <h1 className="text-4xl font-heading text-blue-700">Looking for a Room?</h1>
             <span className="font-serif text-gray-500">create your room wanted profile</span>
        </div>
        
        <div className="rounded-md bg-white w-1/3 p-4 h-full border border-b-appbar-border">
            <div className="flex flex-col flex-wrap">
            <h1 className="text-lg md:text-2xl font-heading">Looking for a Room?</h1>
            <span className="font-serif text-gray-500 m-3">Search locations</span>
            <Input placeholder="Type to search..." className=""/>
            </div>
        </div>
    </div>
}