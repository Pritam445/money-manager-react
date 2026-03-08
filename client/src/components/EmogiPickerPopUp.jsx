import { Image, X } from "lucide-react";
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <div className="flex items-center gap-4 mb-6 relative">
      
      {/* Icon Box */}
      <div
        className="size-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <Image />
        )}
      </div>

      {/* Text */}
      <p className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {icon ? "Change Icon" : "Pick Icon"}
      </p>

      {/* Emoji Picker */}
      {isOpen && (
        <div className="absolute top-16 z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="size-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10"
          >
            <X size={14} />
          </button>

          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);  // ✅ correct property
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;

