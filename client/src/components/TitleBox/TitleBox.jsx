import "./TitleBox.scss";

function TitleBox({ title }) {
  return (
    <section className="title-box">
      <h1 className="title-box__title">{title}</h1>
    </section>
  );
}

export default TitleBox;
