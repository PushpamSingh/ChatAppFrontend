import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {StreamChat } from "stream-chat";
import { useAuthUser } from "./../../Hooks/useAuthUser";
import chatService from "../../BackendService/Chat.service";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ChatLoader } from "../ChatLoader";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
// import { useChatClient } from "../../Store/useMenuClass";
import { CallButton } from "../CallButton";

const Chatpage = () => {
  const [chatClient, setChatClient] = useState(null);
  const [Chatchannel, setChatChannel] = useState(null);
  const [loader, setLoader] = useState(true);
  const queryClient = useQueryClient();
  const { authUserData } = useAuthUser();
  const { id: targetId } = useParams();
  const Stream_Api_Key = import.meta.env.VITE_STREAMING_API_KEY;
  // const {globalChatwatcher,setglobalChatwatcher}=useChatClient()

  const { data: TokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: async () => {
      const response = await chatService.genStreamToken();
      return response ? response.data : null;
    },
    enabled: !!authUserData, //it will only run when authuserdata is fetched or available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!(TokenData || authUserData)) return;
      try {
        console.log("Initializing Stream Chat....");
        const client = StreamChat.getInstance(Stream_Api_Key);
        // setglobalChatwatcher(client)
          await client.connectUser(
          {
            id: authUserData._id,
            name: authUserData?.fullname,
            image: authUserData?.profilePic,
          },
          TokenData
        );

        // console.log("Connected: ",connected);

        const channelId = [authUserData?._id, targetId].sort().join("-");

        const createdchannel = client.channel("messaging", channelId, {
          members: [authUserData._id, targetId],
        });
         await createdchannel.watch();
        //  console.log("Watching", chatWatcher.read[0].unread_messages);

          
        setChatClient(client);
        setChatChannel(createdchannel);
      } catch (error) {
        // console.log("Error: ", error);

        toast.error(error?.message, { style: { fontSize: "16px" } });
      } finally {
        setLoader(false);
        toast.success("Chat connected successfuly", {
          style: { fontSize: "16px" },
        });
      }
    };

    initChat();
  }, [authUserData, TokenData]);

  const handleVideocall=()=>{
      if(Chatchannel){
        const callUrl=`${window.location.origin}/call/${Chatchannel.id}`

          Chatchannel.sendMessage({
            text:`i have started a video call, join me here ${callUrl}`
          })
      }

      // console.log("Clicked button");
      
      
  }

  if (loader || !(chatClient || Chatchannel)) return <ChatLoader />;
  return (
    <div className="h-[90vh]">
      <Chat client={chatClient}>
        <Channel channel={Chatchannel}>
          <div className="w-full relative">
            <CallButton handleVideocall={handleVideocall}/>
          <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
          </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  );
};

export default Chatpage;
