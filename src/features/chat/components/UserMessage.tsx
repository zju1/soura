import { Message } from "@ai-sdk/react";
import { motion } from "framer-motion";

export function UserMessage(props: Message) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mt-8">
        <h1 className="font-grotesk text-2xl font-semibold">{props.content}</h1>
      </div>
    </motion.div>
  );
}
