import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=> {setTitle(e.target.value)}} type="email" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  " placeholder="name@flowbite.com" />
                <TextEditor onChange={(e)=> {setDescription(e.target.value)}}/>
                <button onClick={async ()=> {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content: description
                },{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                });
                navigate(`/blog/${response.data.id}`)
                }} type="submit" className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({onChange}: {onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return (
        <form>
            <div className="mt-2 w-full mb-4 border ">
                <div className="flex items-center justify-between border ">
                    <div className="py-2 bg-white rounded-b-lg w-full ">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 focus:outline-none" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
            </div>

        </form>

    )
}