import React, {useState,useEffect} from 'react';
import HomePageListItem from './HomePageListItem';
import Header from './Header';
import Footer from './Footer';

const MenSection = ({data}) => {

  const [sortType, setSortType] = useState('0');
  const [menShoes, setMenShoes] = useState([data]);

  useEffect(() => {
    setMenShoes(data);
    sortMenShoes(data);
  }, [data,sortType]);


    const sortMenShoes = (data) => {
      if (sortType === '0'){
        setMenShoes(data);
      }
      if (sortType === '1'){
        const sortedShoes = [...menShoes].sort(function(a,b){
          return a.price - b.price;
        });
         setMenShoes(sortedShoes);
      }
      if (sortType === '2'){
        const sortedShoes = [...menShoes].sort(function(a,b){
          return b.price - a.price;
        });
        setMenShoes(sortedShoes);
      }
    };

    const listItems = menShoes.map((item) =>
    <HomePageListItem item={item} key={item._id}/>
    );

    return (
        <>
        <Header/>
        <div className="trd">Men's Trainers & Shoes ({data.length})
        <form>
        <select className="dropdown" onChange={(e) => setSortType(e.target.value)}>
       <option value="0">Sort By</option>
       <option value="1" >Price: Low-High</option>
        <option value="2">Price: High-Low</option>
        </select>
        </form>
        <div className="mainContent">
            {listItems}
        </div>
        </div>
        <Footer />
        </>
    );
};

export default MenSection;
