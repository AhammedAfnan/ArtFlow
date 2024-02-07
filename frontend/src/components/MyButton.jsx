function MyButton ({text, ...props}) {
    return (
        <>
        <button 
        {...props}   // idend means ippo ori button n default behaviours indavele . nammo component aayt use cheyyumbo ainte idello actions ello engane aa button aaka .. aa karano ad real button allalo component alle . appo aa behaviours ello ee real button ullil props aayt kodth normal button ello work aavu .. means default things angethello
        className="bg-yellow-500 mt-2 text-gray-900 py-2 px-6 rounded-full hover:bg-yellow-400 focus:outline-none focus:ring focus:border-blue-300 mr-4"
         >
            <b>{text}</b>
         </button>
        </>
    )
}

export default MyButton;