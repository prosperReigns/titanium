import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, ShoppingBag, Menu, X, Heart, SlidersHorizontal, Instagram, MessageCircle } from 'lucide-react';

type Product = { id:number; name:string; category:string; price:number; oldPrice?:number; tag?:string; image:string; tone:string };
const categories = ['All pieces','Shoes','Bags','Belts','Sandals','Slippers','Clothing','Fragrance'];
const products:Product[] = [
 {id:1,name:'The Executive Leather Loafer',category:'Shoes',price:68500,oldPrice:78000,tag:'BEST SELLER',image:'photo-1614252369475-531eba835eb1',tone:'Chocolate'},
 {id:2,name:'Signature Everyday Crossbody',category:'Bags',price:54000,tag:'NEW ARRIVAL',image:'photo-1548036328-c9fa89d128fa',tone:'Espresso'},
 {id:3,name:'Heritage Leather Belt',category:'Belts',price:24500,image:'photo-1624222247344-550fb8e9a6b2',tone:'Black'},
 {id:4,name:'The Minimalist Leather Sandal',category:'Sandals',price:32000,image:'photo-1603487742131-4160ec999306',tone:'Tan'},
 {id:5,name:'After Hours Eau de Parfum',category:'Fragrance',price:38500,tag:'JUST DROPPED',image:'photo-1541643600914-78b084683601',tone:'Amber'},
 {id:6,name:'Relaxed Premium Hoodie',category:'Clothing',price:42000,image:'photo-1556821840-3a63f95609a7',tone:'Stone'},
 {id:7,name:'City Runner Sneaker',category:'Shoes',price:59000,image:'photo-1542291026-7eec264c27ff',tone:'Ivory / Red'},
 {id:8,name:'Weekend Essential Tote',category:'Bags',price:47500,image:'photo-1584917865442-de89df76afd3',tone:'Sand'}
];
const money=(n:number)=>new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n);
const photo=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
function Brand(){return <a className="brand" href="#" aria-label="Titanium 5 Collections home"><span className="brand-mark">T<span>5</span></span><span className="brand-name">TITANIUM 5<small>COLLECTIONS</small></span></a>}

export default function App(){
 const [active,setActive]=useState('All pieces'),[query,setQuery]=useState(''),[cart,setCart]=useState(0),[menu,setMenu]=useState(false),[liked,setLiked]=useState<number[]>([]);
 const visible=useMemo(()=>products.filter(p=>(active==='All pieces'||p.category===active)&&p.name.toLowerCase().includes(query.toLowerCase())),[active,query]);
 return <div className="site-shell">
  <div className="announcement">COMPLIMENTARY DELIVERY ON ORDERS OVER ₦150,000 <span>·</span> MADE FOR THE WAY YOU MOVE</div>
  <header className="header">
   <button className="icon-btn mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button><Brand/>
   <nav className={menu?'main-nav open':'main-nav'}><a href="#shop" onClick={()=>setMenu(false)}>Shop all</a><a href="#shop" onClick={()=>{setActive('Clothing');setMenu(false)}}>Clothing</a><a href="#shop" onClick={()=>{setActive('Shoes');setMenu(false)}}>Footwear</a><a href="#shop" onClick={()=>{setActive('Bags');setMenu(false)}}>Bags & accessories</a><a href="#story">Our story</a></nav>
   <div className="header-actions"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search pieces..." aria-label="Search products"/></label><button className="icon-btn account-btn">ACCOUNT</button><button className="icon-btn bag-btn" aria-label={`Shopping bag, ${cart} items`}><ShoppingBag size={19}/><span className="bag-count">{cart}</span></button></div>
  </header>
  <main>
   <section className="hero"><img className="hero-image" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2200&q=90" alt="Fashion editorial campaign"/><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow gold">THE NEW STANDARD · EST. 2025</p><h1>Define your<br/><em>presence.</em></h1><p className="hero-sub">Considered essentials. Distinctive details.<br/>Pieces that speak before you do.</p><a className="gold-button" href="#shop">DISCOVER THE COLLECTION <ArrowUpRight size={16}/></a></div><div className="hero-index"><span>01</span><i/> 03</div><p className="hero-side">TITANIUM 5 COLLECTIONS — LAGOS, NIGERIA</p></section>
   <section className="category-section" id="shop"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Find your <em>signature.</em></h2></div><a className="text-link" href="#products">EXPLORE ALL <ArrowRight size={15}/></a></div><div className="category-rail">{categories.map((c,i)=><button key={c} onClick={()=>setActive(c)} className={active===c?'category-pill selected':'category-pill'}><span className="category-number">0{i+1}</span>{c}<ArrowRight size={13}/></button>)}</div></section>
   <section className="products-section" id="products"><div className="products-top"><div><p className="eyebrow">THE EDIT</p><h2>{active==='All pieces'?'Pieces worth keeping.':active+', considered.'}</h2><p className="muted">A thoughtful selection for every version of you.</p></div><button className="filter-button"><SlidersHorizontal size={16}/> FILTER & SORT</button></div>
    <div className="product-grid">{visible.map(p=><article className="product-card" key={p.id}><div className="product-image-wrap"><img src={photo(p.image)} alt={p.name} loading="lazy"/>{p.tag&&<span className="product-tag">{p.tag}</span>}<button className={liked.includes(p.id)?'wishlist liked':'wishlist'} onClick={()=>setLiked(old=>old.includes(p.id)?old.filter(id=>id!==p.id):[...old,p.id])} aria-label="Toggle wishlist"><Heart size={17} fill={liked.includes(p.id)?'currentColor':'none'}/></button><button className="quick-add" onClick={()=>setCart(c=>c+1)}>ADD TO BAG <ArrowUpRight size={15}/></button></div><div className="product-info"><div><h3>{p.name}</h3><p>{p.tone}</p></div><strong>{money(p.price)}</strong></div>{p.oldPrice&&<p className="old-price">{money(p.oldPrice)}</p>}</article>)}</div>
    {visible.length===0&&<div className="empty-state">No pieces found. Try another search or category.</div>}<div className="center-action"><a className="outline-button" href="#shop">VIEW THE FULL COLLECTION <ArrowRight size={15}/></a></div>
   </section>
   <section className="editorial" id="story"><div className="editorial-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" alt="Modern fashion editorial" loading="lazy"/></div><div className="editorial-copy"><p className="eyebrow gold">THE TITANIUM 5 POINT OF VIEW</p><h2>Style is not<br/>what you wear.<br/><em>It's how you arrive.</em></h2><p>We believe in pieces with presence. Everyday essentials, elevated through thoughtful design, quality materials and details that make the difference.</p><a href="#shop" className="text-link light">GET TO KNOW US <ArrowUpRight size={16}/></a></div></section>
   <section className="newsletter"><p className="eyebrow">A LITTLE SOMETHING EXTRA</p><h2>Good taste. <em>Great updates.</em></h2><p>Be first to know about new drops, exclusive edits and considered offers.</p><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address"/><button type="submit">JOIN THE LIST <ArrowRight size={15}/></button></form></section>
  </main>
  <footer className="footer"><div className="footer-top"><Brand/><p>Pieces with presence.<br/>Made for the way you move.</p><div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle size={14}/> WhatsApp</a><a href="https://instagram.com/" target="_blank" rel="noreferrer"><Instagram size={14}/> Instagram</a></div></div><div className="footer-bottom"><span>© 2026 TITANIUM 5 COLLECTIONS ENTERPRISE</span><span>LAGOS, NIGERIA · NGN ₦</span><span>DEMO STOREFRONT — SAMPLE PRODUCTS</span></div></footer>
 </div>
}
