import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';
import Image from 'next/image';

interface MemberAvatarProps {
  seed: string;
  size?: number;
}

export const MemberAvatar = ({ seed, size = 40 }: MemberAvatarProps) => {
  const avatar = createAvatar(funEmoji, {
    seed,
    size: size,
  });

  const svgString = avatar.toString();
  // Use TextEncoder to handle Unicode characters properly
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(svgString);
  const base64 = Buffer.from(utf8Bytes).toString('base64');
  const dataUrl = `data:image/svg+xml;base64,${base64}`;

  return (
    <div className="rounded-full overflow-hidden bg-gray-100">
      <Image
        src={dataUrl}
        alt="Member avatar"
        width={size}
        height={size}
        className="w-full h-full object-cover"
      />
    </div>
  );
}; 