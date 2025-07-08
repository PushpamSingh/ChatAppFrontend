import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import userService from "../../BackendService/User.service";
import toast, { Toaster } from "react-hot-toast";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";

const Notificationpage = () => {
  const queryClient = useQueryClient();

  const {
    data: notification,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const response = await userService.getFriendRequest();
      return response ? response?.data : [];
    },
  });

  const { mutate:acceptfriendMutation, isPending } = useMutation({
    mutationFn: async (userId) => {
      const response = await userService.acceptFriendRequest(userId);
      return response ? response?.data : [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedUser"] });
      toast.success("friend request accepted", { style: { fontSize: "16px" } });
    },
  });
  const incomingRequest = notification?.incomingRequest || [];
  const acceptedRequest = notification?.acceptedRequest || [];
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          incomingRequest.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <UserCheckIcon className="h-5 w-5 text-primary" />
                Friend Requests
                <span className="badge badge-primary ml-2">
                  {incomingRequest.length}
                </span>
              </h2>
              <div className="space-y-3">
                {incomingRequest.map((req) => (
                  <div
                    key={req._id}
                    className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="avatar w-14 h-14 rounded-full bg-base-300">
                            <img
                              src={req.sender.profilePic}
                              alt={req.sender.fullname}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {req.sender.fullname}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className="badge badge-secondary badge-sm">
                                Native: {req.sender.nativeLanguage}
                              </span>
                              <span className="badge badge-outline badge-sm">
                                Learning: {req.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => acceptfriendMutation(req._id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}
        {/* ACCEPTED REQS NOTIFICATONS */}
        {acceptedRequest.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-success" />
              New Connections
            </h2>

            <div className="space-y-3">
              {acceptedRequest.map((notification) => (
                <div
                  key={notification._id}
                  className="card bg-base-200 shadow-sm"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="avatar mt-1 size-10 rounded-full">
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {notification.recipient.fullname}
                        </h3>
                        <p className="text-sm my-1">
                          {notification.recipient.fullname} accepted your friend
                          request
                        </p>
                        <p className="text-xs flex items-center opacity-70">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          Recently
                        </p>
                      </div>
                      <div className="badge badge-success">
                        <MessageSquareIcon className="h-3 w-3 mr-1" />
                        New Friend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {incomingRequest.length === 0 && acceptedRequest.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
              <BellIcon className="size-8 text-base-content opacity-40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-base-content opacity-70 max-w-md">
              When you receive friend requests or messages, they'll appear here.
            </p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Notificationpage;
