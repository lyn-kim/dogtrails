// import React from 'react';
// import SearchList from '../pages/search-list';

// export default class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       trails: [],
//       keyword: '',
//       isSubmitted: false
//     };
//     this.handleSearch = this.handleSearch.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ keyword: event.target.value });
//   }

//   handleSearch(event) {
//     event.preventDefault();

//     fetch('/api/searched-trails?trailName=' + encodeURIComponent(this.state.keyword))
//       .then(res => res.json())
//       .then(trails => {
//         this.setState({
//           keyword: '',
//           isSubmitted: true,
//           trails: trails
//         });
//       });
//   }

//   render() {
//     if (this.state.isSubmitted) {
//       <SearchList/>;
//     }
//     return (
//       <div className="row">
//         <div className="search-container column-full">
//           <div className="row">
//             <p className="quote">Find your adventure:</p>
//           </div>
//           <div className="row">
//             <div className="search-bar">
//               <div className="input-container">
//                 <form onSubmit={this.handleSearch} className="form-container">
//                   <span><i className="magnify-icon fas fa-search"></i></span>
//                   <label htmlFor="keyword" className="keyword-container">
//                     <input value={this.state.keyword} onChange={this.handleChange} className="keyword-box" required id="keyword" type="text" placeholder="Search by trail name or keyword" name="keyword" />
//                   </label>
//                   <span><button href="#search-list" type="submit" className="go-button"><i className="go-button-icon fas fa-arrow-alt-circle-right"></i></button></span>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// // export default function SearchBar(props) {

// //   return (
// //     <div className="row">
// //       <div className="search-container column-full">
// //         <div className="row">
// //           <p className="quote">Find your adventure:</p>
// //         </div>
// //         <div className="row">
// //           <div className="search-bar">
// //             <div className="input-container">
// //               <form className="form-container">
// //                 <span><i className="magnify-icon fas fa-search"></i></span>
// //                 <label htmlFor="keyword" className="keyword-container">
// //                   <input className="keyword-box" required id="keyword" type="text" placeholder="Search by trail name or keyword" name="keyword" />
// //                 </label>
// //                 <span><button onSubmit={ } href="#searched-list" type="submit" className="go-button"><i className="go-button-icon fas fa-arrow-alt-circle-right"></i></button></span>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
