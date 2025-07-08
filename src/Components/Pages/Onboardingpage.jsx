import React, { useEffect, useState } from "react";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../BackendService/Auth.Service";
import toast,{LoaderIcon, Toaster} from "react-hot-toast";
import {
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "./../../Constant/index.js";
import { useNavigate } from "react-router-dom";
const Onboardingpage = () => {
  const { authUserData } = useAuthUser();
  const [onBoardingData, setOnBoardingData] = useState({
    fullname: authUserData?.fullname || "",
    bio: authUserData?.bio || "",
    nativeLanguage: authUserData?.nativeLanguage || "",
    learningLanguage: authUserData?.learningLanguage || "",
    location: authUserData?.location || "",
    profilePic: authUserData?.profilePic || "",
  });
const navigate=useNavigate()
  const queryClient = useQueryClient();
  const {
    mutate: OnBoardingMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await authService.onboardUser(onBoardingData);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
      toast.success("User OnBoarding completed!", {
        style: {
          fontSize: "12px",
        },
      });
      // navigate("/")
    },
    onError: () => {
      toast.error(`${error?.message}`);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    OnBoardingMutation();
  };
  const genRandomAvatar = async() => {
    const idx=Math.floor(Math.random()*100)+1 //1-100 random number generate
    const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`
    setOnBoardingData({...onBoardingData,profilePic:randomAvatar})
    toast.success("Avatar changes successfuly")
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4" data-theme="forest">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {onBoardingData?.profilePic ? (
                  <img
                    src={onBoardingData?.profilePic}
                    alt="profilePic"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={genRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="fullname"
                value={onBoardingData?.fullname}
                onChange={(e) =>
                  setOnBoardingData({
                    ...onBoardingData,
                    fullname: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                autoComplete="on"
                required
              />
            </div>
            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <input
                type="text"
                name="bio"
                placeholder="Tell others about yourself and your language learning goals"
                required
                autoComplete="on"
                value={onBoardingData?.bio}
                onChange={(e) =>
                  setOnBoardingData({ ...onBoardingData, bio: e.target.value })
                }
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  id="nativeLanguage"
                  value={onBoardingData?.nativeLanguage}
                  onChange={(e) =>
                    setOnBoardingData({
                      ...onBoardingData,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  {LANGUAGES.map((lang) => {
                    return (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={onBoardingData?.learningLanguage}
                  onChange={(e) =>
                    setOnBoardingData({
                      ...onBoardingData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                  autoComplete="on"
                  required
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={onBoardingData?.location}
                  onChange={(e) =>
                    setOnBoardingData({
                      ...onBoardingData,
                      location: e.target.value,
                    })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                  autoComplete="on"
                  required
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Onboardingpage;
