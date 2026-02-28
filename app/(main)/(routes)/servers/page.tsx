import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerRPage = async() => {
    const profile = await currentProfile();
    if(!profile){
        return redirect("/sign-in");
    }
    const server = await db.server.findFirst({
        include : {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })

    const initialChannel = server?.channels[0];
    if(initialChannel?.name!='general') {
        return null;
    }

    return redirect(`/servers/${server?.id}/channels/${initialChannel.id}`)
}
 
export default ServerRPage;