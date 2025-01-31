import { Button } from './ui/Button';

interface GroupProps {
  name: string;
  description: string;
  membersCount: number;
  category: string;
  imageUrl?: string; // Optional group image
  onJoin?: () => void; // Optional join action
}

const Group = ({ name, description, membersCount, category, imageUrl, onJoin }: GroupProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-32 w-full object-cover" />
      ) : (
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{category} • {membersCount} members</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={onJoin}>
            Join Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Group;
