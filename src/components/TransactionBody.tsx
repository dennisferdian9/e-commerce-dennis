import TransactionCardList from './TransactionCardList';

export default function TransactionBody() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 justify-around gap-x-8 gap-y-4">
      <TransactionCardList />
    </div>
  );
}
