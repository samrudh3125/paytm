import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Users = ({name}) => {
    const [users, setUsers] = useState([]);
    const [filter,setFilter]=useState("");
    console.log(name);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
                    params: {
                        filter
                    }
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }};
            fetchUsers();
    }, [filter]);
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user =>(user.username===name.toLowerCase())?console.log("hi"): <User key={user._id} user={user}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate=useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={()=>{
                navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName);
            }}/>
        </div>
    </div>
}