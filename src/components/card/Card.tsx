const Card = (props: { children: JSX.Element | Array<JSX.Element> }) => {
  return (
    <div className="flex bg-dark-secondary rounded-xl p-6 mb-3 shadow-xl">
      {props.children}
    </div>
  );
};

export default Card;
