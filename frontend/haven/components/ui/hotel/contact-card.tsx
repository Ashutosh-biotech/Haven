import { Contact } from "@/components/interface/hotel";
import { LuPhone, LuMail, LuGlobe } from "react-icons/lu";

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard({ contact }: ContactCardProps): React.ReactNode {
  if (!contact) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <LuPhone className="size-5 text-teal-600" />
        Contact Details
      </h3>

      <div className="space-y-4">
        {contact.phone && (
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-full bg-teal-50 text-teal-600 shrink-0">
               <LuPhone className="size-4" />
            </span>
            <div>
              <p className="text-xs text-gray-500 font-medium">Phone</p>
              <a href={`tel:${contact.phone}`} className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors">
                {contact.phone}
              </a>
            </div>
          </div>
        )}

        {contact.email && (
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-full bg-teal-50 text-teal-600 shrink-0">
              <LuMail className="size-4" />
            </span>
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <a href={`mailto:${contact.email}`} className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors break-all">
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {contact.website && (
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-full bg-teal-50 text-teal-600 shrink-0">
              <LuGlobe className="size-4" />
            </span>
            <div>
              <p className="text-xs text-gray-500 font-medium">Website</p>
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors break-all">
                {new URL(contact.website).hostname.replace('www.', '')}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
