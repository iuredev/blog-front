import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

interface ShareSocialMediaProps {
  url: string;
}
export default function ShareSocialMedia({ url }: ShareSocialMediaProps) {
  const encodedUrl = encodeURIComponent(url);

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const xShareUrl = `https://x.com/intent/tweet?url=${encodedUrl}`;

  return (
    <div className="flex items-center gap-1 leading-none">
      <p className="text-[1.0rem] text-gray-400">Share on:</p>
      <div className="flex items-center gap-2">
        <a
          href={linkedinShareUrl}
          className="text-xm text-gray-400 group"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
          target="_blank"
        >
          <FaLinkedin className="h-4 w-4 text-gray-300 hover:text-blue-500 transition duration-300 " />
        </a>

        <a
          href={xShareUrl}
          className="text-xm text-gray-400 group"
          aria-label="Share on X"
          title="Share on X"
          target="_blank"
        >
          <FaXTwitter className="h-4 w-4 text-gray-300 hover:text-gray-600 transition duration-300" />
        </a>
      </div>
    </div>
  );
}
