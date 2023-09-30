import niit from "../StudentComponent/icons/icon-niit.png";
const FailedToFetchScreen = ({Error}) => {
  return (
    <>
      <div className="w-screen h-screen p-10 bg-background">
        <div className="flex justify-center items-center">
          <img src={niit} alt="niit"></img>
          <p className="px-5 font-bold">Error - {Error}</p>
        </div>
      </div>
    </>
  );
};
export default FailedToFetchScreen;
