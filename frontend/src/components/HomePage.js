
import {Header, Footer, ImageBanner, WomenImageBanner, HomePageListItem} from './import';

const MainContent = ({data}) => {

    let firstThreeItemsMen = data.filter((item) =>  item.category === "Men").slice(0,3);

    const listItems = firstThreeItemsMen.map((item) =>
    <HomePageListItem item={item} key={item._id}/>
    );

    const firstThreeItemsWomen = data.filter((item) => item.category === "Women").slice(0,3);

    const womenItems = firstThreeItemsWomen.map((item) => 
    <HomePageListItem item={item} key={item._id}/>
    );

    return (
        <>
        <Header/>
        <div className="trd"> Men's Collection Trending Now
        <div className="mainContent">
            {listItems}
        </div>
        <ImageBanner />
        <div className="trd"> Women's Collection Trending Now
        <div className="mainContent">
            {womenItems}
        </div>
        </div>
        <WomenImageBanner />
        <Footer />
        </div>
        </>

    );

};

export default MainContent;
