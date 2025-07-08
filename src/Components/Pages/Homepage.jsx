import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import userService from "../../BackendService/User.service";
import toast, { Toaster } from "react-hot-toast";
// import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import { RecommendedFriendsCard } from "../RecommendedFriendCard";
import { Link } from "react-router-dom";
import { UsersIcon } from "lucide-react";
import { NoUserFound } from "../NoUserFound";
import { FriendCard } from "../FriendCard";
// import { useChatClient } from "../../Store/useMenuClass";

const Homepage = () => {
  const [outgoingfriendReqID, setOutGoingfriendReqID] = useState(new Set());
  const queryClient = useQueryClient();
  // const {globalChatwatcher}=useChatClient()
  // console.log("chat watcher: ",globalChatwatcher);
  
  
  const { data: Myfriends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await userService.getMyFriends();
      if (response) {
        return response?.data;
      } else {
        return [];
      }
    },
  });

  const { data: RecommendedFriends, isLoading: recommendedLoading } = useQuery({
    queryKey: ["recommendedUser"],
    queryFn: async () => {
      const response = await userService.getRecommendedUsers();
      return response ? response?.data : [];
    },
  });

  const { data: outgoingReqData, isLoading: outgoingLoading } = useQuery({
    queryKey: ["outgoingReq"],
    queryFn: async () => {
      const response = await userService.getOutgoingFriendRequest();
      return response ? response?.data : [];
    },
  });

  const { mutate: sendFriendReqMutation, isPending } = useMutation({
    mutationFn: async (userId) => {
      const response = await userService.sendFriendRequest(userId);
      return response ? response?.data : [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingReq"] });
      toast.success("Friend Request send Successfuly", {
        style: { fontSize: "16px" },
      });
    },
    onError: (error) => {
      toast.error(error?.message, { style: { fontSize: "16px" } });
    },
  });

  useEffect(() => {
    const outgoingID = new Set();
    if (outgoingReqData && outgoingReqData.length > 0) {
      outgoingReqData.forEach((req) => {
        // console.log("reqpanday:",req);
        
        outgoingID.add(req.recipient._id);
      });
      setOutGoingfriendReqID(outgoingID);
    }
  }, [outgoingReqData]);

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

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {recommendedLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : RecommendedFriends.length === 0 ? (
            <NoUserFound H1={"No recommendations available"} P={"Check back later for new language partners!"}/>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RecommendedFriends.map((user) => {
                const hasRequestBeenSent = outgoingfriendReqID.has(user._id);

                return (
                 <RecommendedFriendsCard 
                 hasRequestBeenSent={hasRequestBeenSent} 
                 user={user} 
                 sendFriendReqMutation={sendFriendReqMutation} 
                 isPending={isPending}
                 />
                );
              })}
            </div>
          )}
        </section>
      </div>
      <Toaster />
    </div>
  );
};

export default Homepage;
