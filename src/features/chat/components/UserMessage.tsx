import { Message } from "@ai-sdk/react";
import { motion } from "framer-motion";

export function UserMessage(props: Message) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-end">
        <div className="bg-stone-950 text-white p-4 rounded-2xl rounded-br-none">
          <h1 className="font-grotesk font-semibold">{props.content}</h1>
        </div>
      </div>
    </motion.div>
  );
}
