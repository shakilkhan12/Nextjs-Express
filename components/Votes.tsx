import { NextPage } from "next"
import axios from "axios";
import { HiArrowSmUp,HiArrowSmDown } from "react-icons/hi"
interface VotesProps {
    votes: {
        _id: string;
        createdAt: string;
        updatedAt: string;
        postsId: string;
        username: string;
        value: number;
    }[],
    identifier: string,
    slug: string,
    
}
const Votes:NextPage<VotesProps>= ({votes, identifier, slug}) => {
  const upVote = async () => {
    try {
        const {data} = await axios.post('/misc/vote', {
            value: 1,
            status: 'post',
            identifier,
            slug,
        })
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="flex flex-col items-center mt-2">
        <HiArrowSmUp className="cursor-pointer" onClick={upVote} />
        <span className="text-xs font-bold mt-1.5">{votes.length}</span>
        <HiArrowSmDown className="mt-1.5 cursor-pointer" />
    </div>
  )
}

export default Votes