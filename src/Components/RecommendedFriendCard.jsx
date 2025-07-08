import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import { Capitlize, getLanguageFlag } from "./FriendCard";

export const RecommendedFriendsCard = ({hasRequestBeenSent,user,sendFriendReqMutation,isPending}) => {
  return (
    <div
      key={user._id}
      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullname} />
          </div>
          <h3 className="font-semibold text-lg">{user.fullname}</h3>
          {user.location && (
            <div className="flex items-center text-xs opacity-70 mt-1">
              <MapPinIcon className="size-3 mr-1" />
              {user.location}
            </div>
          )}
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {Capitlize(user.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {Capitlize(user.learningLanguage)}
          </span>
        </div>

        {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

        {/* Action button */}
        <button
          className={`btn w-full mt-2 ${
            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
          } `}
          onClick={() => sendFriendReqMutation(user._id)}
          disabled={hasRequestBeenSent || isPending}
        >
          {hasRequestBeenSent ? (
            <>
              <CheckCircleIcon className="size-4 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon className="size-4 mr-2" />
              Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};
