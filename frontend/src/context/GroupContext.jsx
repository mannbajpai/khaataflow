import { createContext} from "react";

const GroupContext = createContext({
    group: { name: "", members: [], expenses: [] },
    setGroup: () => { },
    creator: null,
    members: [],
    setMembers: () => { },
});

export default GroupContext;
