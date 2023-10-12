type Props = {
  menus: {
    id: number;
    title: string;
    category: string;
    price: number;
    img: string;
    desc: string;
  }[];
};

function Menus({ menus }: Props) {
  return (
    <div className="section-center">
      {menus.map((menu) => {
        const { id, title, img, desc, price } = menu;
        return (
          <article key={id} className="menu-item">
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Menus;
