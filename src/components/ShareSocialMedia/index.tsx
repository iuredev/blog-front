import { FaLinkedin } from "react-icons/fa6";

interface ShareSocialMediaProps {
  url: string;
}
export default function ShareSocialMedia({ url }: ShareSocialMediaProps) {

  const encodedUrl = encodeURIComponent(url);

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&mini=true&source=iure.dev`;

  return (
    <div className="flex items-center gap-1 leading-none">
      <p className="text-[1.0rem] text-gray-400">Share on:</p>
      <a href={linkedinShareUrl} className="text-xm text-gray-400 hover:text-gray-600" aria-label="Share on LinkedIn" title="Share on LinkedIn" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="h-4 w-4 text-gray-300" />
      </a>
    </div>
  );
}