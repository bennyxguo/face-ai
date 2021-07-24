import entriesSVG from '../../assets/svg/entries.svg';
import Card from '../card/Card';

const Rank = ({ entries }: { entries: number }) => {
  return (
    <Card>
      <div className="bg-purple-800 p-2 rounded-lg w-16 h-16 flex justify-center items-center shadow-2xl">
        <img src={entriesSVG} alt="entries-icon" />
      </div>
      <div className="flex flex-col flex-1 pl-6 justify-center">
        <p className="text-2xl text-purple-500">{entries}</p>
        <h2 className="text-gray-500">{`Your current entry count`}</h2>
      </div>
    </Card>
  );
};

export default Rank;
