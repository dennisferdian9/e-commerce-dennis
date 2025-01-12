import Image from 'next/image';
import UpRightIcon from '@/assets/up-right.svg';
import { useModalState } from '@/app/stores/modalState';

type PropsType = {
  title: string;
  sku: string;
  image: string;
  price: number;
  description: string;
  id: number;
};

export default function ProductCard({
  title,
  sku,
  image,
  price,
  description,
  id,
}: PropsType) {
  const openModalState = useModalState((state) => state.openModalState);
  const openProductModal = () => {
    console.log(id);
    openModalState('edit', true, {
      title,
      sku,
      image,
      price,
      description,
      id,
    });
  };
  return (
    <div className="w-full h-max flex shadow-md justify-between px-4 py-3">
      <div>
        <h3 className="text-lg md:text-2xl font-bold">
          {title} <span className="font-normal">{sku}</span>
        </h3>
        <div className="text-lg md:text-2xl">${price}</div>
        <p className="break-words text-xs md:text-sm">{description}</p>
      </div>
      <div>
        <div className="h-[100px] relative">
          <Image placeholder="empty" fill src={image} alt={title} />
        </div>
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
