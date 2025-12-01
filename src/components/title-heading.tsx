interface TitleHeadingProps {
  title: string;
}

const TitleHeading = ({ title }: TitleHeadingProps) => {
  return (
    <div className="flex items-center px-5 py-3">
      <h1 className="text-2xl font-bold md:text-2xl">{title}</h1>
    </div>
  );
};

export default TitleHeading;
