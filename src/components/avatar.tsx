import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

type AvatarProps = {
  src: string;
  alt: string;
  fallbackInitials: string;
}

function AvatarChat({ src, alt, fallbackInitials }: AvatarProps) {
  return (
    <Avatar>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallbackInitials}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarChat;
