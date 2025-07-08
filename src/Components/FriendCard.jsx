import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../Constant";

export const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullname} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullname}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {Capitlize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {Capitlize(friend.learningLanguage)}
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export const getLanguageFlag=(language)=>{
    if(!language) return null;

    const countryCode=LANGUAGE_TO_FLAG[language.toLowerCase()]

    if(countryCode){
         return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${language.toLowerCase()} flag`}
        className="h-3 mr-1 inline-block"
      />
    )
    }
    return null;
}

export const Capitlize=(language)=>{
    if(!language) return null;

    return language.toString().charAt(0).toUpperCase() + language.toString().slice(1);
}