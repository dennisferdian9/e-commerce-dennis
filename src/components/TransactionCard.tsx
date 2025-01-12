import Image from 'next/image';
import UpRightIcon from '@/assets/up-right.svg';
type PropsModel = {
  id: number;
  sku: string;
  quantity: number;
};
export default function TransactionCard({
  sku,
  quantity,
  id,
}: Readonly<PropsModel>) {
  const openProductModal = () => {
    console.log(id);
  };
  return (
    <div className="w-full h-max  shadow-md px-4 py-3">
      <div>
        <h3 className="text-lg md:text-2xl font-bold">
          {sku} <span className="font-normal">{sku}</span>
        </h3>
        <div className="text-lg md:text-2xl">quantity :{quantity}</div>
        <button
          onClick={openProductModal}
          className="flex items-center gap-x-2 w-max text-gray-600 font-bold cursor-pointer text-xs md:text-base ml-auto mt-4"
        >
          <span>Open Detail</span>
          <Image width={10} height={10} src={UpRightIcon} alt="open detail" />
        </button>
      </div>
    </div>
  );
}
