import React from 'react'
import { FriendCard } from '../FriendCard'
import { useQuery } from '@tanstack/react-query'
import { NoUserFound } from '../NoUserFound'
import userService from '../../BackendService/User.service'
import { Link } from 'react-router-dom'
import { UsersIcon } from 'lucide-react'

const FriendsPage = () => {

    const {data:Myfriends,isLoading:friendsLoading}=useQuery({
        queryKey:["friends"],
        queryFn:async()=>{
            const response=await userService.getMyFriends();
            if(response){
                return response?.data;
            }else{
                return [];
            }
        }
    })
  return (
     <div className="p-4 sm:p-6 lg:p-8">
     <div className="container mx-auto space-y-10">
     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notification" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {friendsLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : Myfriends.length === 0 ? (
          <NoUserFound H1={"No friends yet"} P={"Connect with language partners below to start practicing together!"}/>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Myfriends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
        </div>
        </div>  
    )
}

export default FriendsPage
