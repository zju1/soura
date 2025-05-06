import { Message } from "@ai-sdk/react";
import { motion } from "framer-motion";

export function UserMessage(props: Message) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-end">
        <div className="bg-gradient-to-b from-stone-700 to-stone-950 text-white p-3 rounded-2xl">
          <p className="font-grotesk  font-medium text-sm">{props.content}</p>
        </div>
      </div>
    </motion.div>
  );
}
