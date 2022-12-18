import React, { useContext, useRef, useState, useEffect } from "react";
import { Colour, FontType, IskconContent, SearchBook } from "../global";
import Csong from "./hsong";
import Tsub from "../SP/spsonglist";
import About from "../menu/about";
import Readme from "../menu/readme";
import { Switch, Route, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IonItem, IonToolbar, IonItemDivider, IonLabel, IonButtons, IonSearchbar, IonNote, IonSegmentButton, IonSegment, IonButton } from "@ionic/react";
import { SwipeableDrawer, Menu } from "@material-ui/core";
import { ChromeReaderMode, Feedback, FilterList, InfoSharp, MenuSharp, Receipt, SettingsSharp, ShareSharp, Search } from "@material-ui/icons";
import { LibraryMusicSharp, CollectionsBookmarkSharp, QueueMusicSharp, MenuBookSharp } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../splash.jpg";
import Settings from "../menu/settings";
import SB from "../SB/sbsonglist";
import { Plugins } from "@capacitor/core";
import ScrollToTop from "../scroll";
const { Share } = Plugins;

function Csub() {
 let { path, url } = useRouteMatch();
 const [anchor, setAnchor] = useState();
 const [anchor2, setAnchor2] = useState();
 const [anchor3, setAnchor3] = useState();
 let location = useLocation();
 const [searchText, setSearchText] = useState("");
 const [searchState, setSearchState] = useState(false);
 const [drawerstate, setDrawer] = useState(false);
 const [file, setFile] = useState();
 const cont = useRef();
 const cont2 = useRef();
 const cont3 = useRef();
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";
 const [clr, setClr] = useContext(Colour);
 let color;
 if (clr) color = "#121212";
 else color = "";
 let color2;
 if (clr) color2 = "#FFEB3B";
 else color2 = "#00CBFE";
 let color3;
 if (clr) color3 = "black";
 else color3 = "white";
 const [anchorEl, setAnchorEl] = useState(null);
 const [iskcon, setIskcon] = useContext(IskconContent);
 const searchBook = useContext(SearchBook);
 const [searchList, setSearchList] = useState([]);
 let history = useHistory();
 const [filter, setFilter] = useState("all");
 let others = false;
 useEffect(() => {
  if (file) file.pause();
 }, [location]);

 setTimeout(function () {
  if (filter === "all") {
   if (cont.current) {
    cont.current.focus({ preventScroll: false });
   }
  }
  if (searchText) {
   if (cont3.current) {
    cont3.current.focus({ preventScroll: false });
   }
  }
  if (filter === "authors") {
   if (cont2.current) {
    cont2.current.focus({ preventScroll: false });
   }
  }
 }, 1500);

 const useStyles = makeStyles({
  paper: {
   background: `${color}`,
  },
 });
 const classes = useStyles();

 let ls;

 return (
  <div style={{ backgroundColor: `${color}` }}>
   <AnimatePresence onExitComplete>
    <Switch location={location}>
     <Route exact path={path}>
      <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ type: "linear", duration: 1 }}>
       <ScrollToTop />

       <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
        <IonButtons slot="start" onClick={() => setDrawer(true)}>
         <MenuSharp style={{ fontSize: 30 }} />
        </IonButtons>
        <IonSearchbar
         color={clr}
         value={searchText}
         onIonChange={(e) => {
          setSearchText(e.detail.value);
         }}
         onIonClear={() => {
          setSearchState(false);
         }}
         showCancelButton="never"
         animated="true"
        ></IonSearchbar>
        {searchText ? (
         <IonButtons slot="end">
          <IonButton
           onClick={(e) => {
            if (searchText.length === 0) setSearchState(false);
            else if (searchText.length !== 0) setSearchState(true);
            let query = searchText
             .toLowerCase()
             .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
             .replace(/\s{2,}/g, " ");
            iskcon.songs.map((td, i) => {
             let show =
              td.name.toLowerCase().indexOf(query) > -1 ||
              td.offical
               .toLowerCase()
               .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
               .replace(/\s{2,}/g, " ")
               .indexOf(query) > -1;

             let niskcon = { ...iskcon };
             niskcon.songs[i].state = show;
             setIskcon(niskcon);
            });

            let startIndex = 0;
            let titles = [];

            if (query && query !== " ") {
             while (searchBook.indexOf(query, startIndex) > -1) {
              let index = searchBook.indexOf(query, startIndex);
              let line = searchBook.slice(searchBook.lastIndexOf("\n", index), searchBook.indexOf("\n", index));
              startIndex = index + query.length;
              let title = searchBook.slice(
               searchBook.lastIndexOf("song name", startIndex) + 10,
               searchBook.indexOf("\n", searchBook.lastIndexOf("song name", startIndex) + 10)
              );
              if (line.indexOf("name:") === -1 && searchBook.lastIndexOf("\n", index) - searchBook.lastIndexOf("song name", startIndex) > 11) {
               titles.push({ title: title, line: line });
              }
             }
            }

            setSearchList(titles);
            setAnchor3("");
            cont3.current = null;
            window.scrollTo(0, 0);
           }}
          >
           <Search />
          </IonButton>
         </IonButtons>
        ) : (
         <IonButtons slot="end">
          <IonButton aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>
           <FilterList />
          </IonButton>
         </IonButtons>
        )}
       </IonToolbar>

       <div style={{ height: "58px" }}></div>

       <SwipeableDrawer classes={{ paper: classes.paper }} anchor="left" open={drawerstate} onOpen={() => setDrawer(true)} onClose={() => setDrawer(false)}>
        <img src={logo} style={{ width: "275px" }} alt="Gauranga is Radha & Krishna combined"></img>

        <IonItem
         color={clr}
         button
         onClick={() => {
          history.push(`${url}/sb`);
          setDrawer(false);
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }} style={{ width: "225px" }}>
          Prayers from Srimad Bhagavatam
         </IonLabel>
        </IonItem>

        <IonItem
         color={clr}
         button
         onClick={() => {
          history.push(`${url}/menu/sp`);
          setDrawer(false);
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }} style={{ width: "225px" }}>
          Bhaktivedanta Music & Purports
         </IonLabel>
        </IonItem>

        <IonItem
         color={clr}
         button
         onClick={() => {
          history.push(`${url}/settings`);
          setDrawer(false);
         }}
        >
         <SettingsSharp style={{ paddingRight: "10px" }} />
         <IonLabel style={{ fontFamily: `${fon}` }}>Settings</IonLabel>
        </IonItem>

        <IonItem
         color={clr}
         button
         onClick={() => {
          history.push(`${url}/readme`);
          setDrawer(false);
         }}
        >
         <ChromeReaderMode style={{ paddingRight: "10px" }} />
         <IonLabel style={{ fontFamily: `${fon}` }}>Read Me</IonLabel>
        </IonItem>
        <IonItem
         color={clr}
         button
         onClick={() => {
          history.push(`${url}/about`);
          setDrawer(false);
         }}
        >
         <InfoSharp style={{ paddingRight: "10px" }} />
         <IonLabel style={{ fontFamily: `${fon}` }}>About</IonLabel>
        </IonItem>

        <IonItem
         color={clr}
         button
         onClick={async () => {
          let shareRet = await Share.share({
           title: "Share this Treasure",
           text: "The All in One Vaishnava Songs & Prayers App, it has Vaishnava Songs with Audios, Word to Word Meanings and Much More!!!",
           url: "https://play.google.com/store/apps/details?id=com.rahulkudum.vaisnava_songs",
           dialogTitle: "Share with devotees",
          });
         }}
        >
         <ShareSharp style={{ paddingRight: "10px" }} />
         <IonLabel style={{ fontFamily: `${fon}` }}>Share this App</IonLabel>
        </IonItem>

        <IonItem color={clr} button href="mailto:vaishnavasongs108@gmail.com">
         <Feedback style={{ paddingRight: "10px" }} />
         <IonLabel style={{ fontFamily: `${fon}` }}>Give us Feedback</IonLabel>
        </IonItem>
       </SwipeableDrawer>

       {searchState ? (
        <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
         <IonLabel style={{ fontFamily: `${fon}` }}>Title</IonLabel>
        </IonItemDivider>
       ) : null}

       {iskcon.songs.map((td, i) => {
        if (td.name === "Yasomati Nandana") {
         ls = i;
        }

        if (ls && i > ls) return null;

        function next() {
         setAnchor(i);
         setSearchState(false);
         history.push(`${url}/songs/${i}_${td.book}`);
        }

        if (!searchState) {
         if (filter === "all") {
          if (i === anchor) {
           if (i === 0 || td.name[0] !== iskcon.songs[i - 1].name[0])
            return (
             <div>
              <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
               <IonLabel style={{ fontFamily: `${fon}` }}>{td.name[0]}</IonLabel>
              </IonItemDivider>

              <IonItem color={clr} button onClick={next} ref={cont}>
               <IonLabel style={{ fontFamily: `${fon}` }}>
                {td.name}
                {/* <h6>{td.offical}</h6>   */}
               </IonLabel>
               {/* <IonLabel style={{fontFamily:`${fon}`}}>{td.book ? "yes" : "no"}</IonLabel> */}
               {/* <IonLabel style={{fontFamily:`${fon}`}} slot="end" style={{fontSize:"15px",position:"absolute",left:"210px"}}><h6>{td.author}</h6></IonLabel> */}

               <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
                {td.author}
               </IonNote>
              </IonItem>
             </div>
            );

           return (
            <IonItem color={clr} button onClick={next} ref={cont}>
             <IonLabel style={{ fontFamily: `${fon}` }}>{td.name}</IonLabel>
             <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
              {td.author}
             </IonNote>
            </IonItem>
           );
          }
          if (i === 0 || td.name[0] !== iskcon.songs[i - 1].name[0])
           return (
            <div>
             <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
              <IonLabel style={{ fontFamily: `${fon}` }}>{td.name[0]}</IonLabel>
             </IonItemDivider>

             <IonItem color={clr} button onClick={next}>
              <IonLabel style={{ fontFamily: `${fon}` }}>{td.name}</IonLabel>
              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {td.author}
              </IonNote>
             </IonItem>
            </div>
           );

          return (
           <IonItem color={clr} button onClick={next}>
            <IonLabel style={{ fontFamily: `${fon}` }}>{td.name}</IonLabel>
            <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
             {td.author}
            </IonNote>
           </IonItem>
          );
         }
        }

        if (searchState) {
         if (td.state) {
          return (
           <IonItem color={clr} button onClick={next}>
            <IonLabel style={{ fontFamily: `${fon}` }}>
             <h2>{td.name}</h2>
             <h6>{td.offical}</h6>
            </IonLabel>
           </IonItem>
          );
         }
        }
       })}

       {searchState ? (
        <div>
         <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
          <IonLabel style={{ fontFamily: `${fon}` }}>Verses</IonLabel>
         </IonItemDivider>

         {searchList.map((val, i) => {
          if (val.line.indexOf(")") === -1) {
           if (anchor3 === val.line) {
            return (
             <IonItem
              color={clr}
              ref={cont3}
              button
              onClick={() => {
               for (let j in iskcon.songs) {
                if (val.title.indexOf(iskcon.songs[j].name.toLowerCase()) !== -1) {
                 history.push(`${url}/songs/${iskcon.songs[j].name}_${iskcon.songs[j].book}`);
                 setAnchor3(val.line);
                }
               }
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }}>{val.line}</IonLabel>
              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {val.title}
              </IonNote>
             </IonItem>
            );
           } else {
            return (
             <IonItem
              color={clr}
              button
              onClick={() => {
               for (let j in iskcon.songs) {
                if (val.title.indexOf(iskcon.songs[j].name.toLowerCase()) !== -1) {
                 history.push(`${url}/songs/${iskcon.songs[j].name}_${iskcon.songs[j].book}`);
                 setAnchor3(val.line);
                }
               }
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }}>{val.line}</IonLabel>
              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {val.title}
              </IonNote>
             </IonItem>
            );
           }
          }
         })}

         <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
          <IonLabel style={{ fontFamily: `${fon}` }}>Translations</IonLabel>
         </IonItemDivider>

         {searchList.map((val, i) => {
          if (val.line.indexOf(")") !== -1) {
           if (anchor3 === val.line) {
            return (
             <IonItem
              color={clr}
              ref={cont3}
              button
              onClick={() => {
               for (let j in iskcon.songs) {
                if (val.title.indexOf(iskcon.songs[j].name.toLowerCase()) !== -1) {
                 history.push(`${url}/songs/${iskcon.songs[j].name}_${iskcon.songs[j].book}`);
                 setAnchor3(val.line);
                }
               }
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }}>{val.line.slice(val.line.indexOf(")") + 1, -1)}</IonLabel>
              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {val.title}
              </IonNote>
             </IonItem>
            );
           } else {
            return (
             <IonItem
              color={clr}
              button
              onClick={() => {
               for (let j in iskcon.songs) {
                if (val.title.indexOf(iskcon.songs[j].name.toLowerCase()) !== -1) {
                 history.push(`${url}/songs/${iskcon.songs[j].name}_${iskcon.songs[j].book}`);
                 setAnchor3(val.line);
                }
               }
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }}>{val.line.slice(val.line.indexOf(")") + 1, -1)}</IonLabel>
              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {val.title}
              </IonNote>
             </IonItem>
            );
           }
          }
         })}
        </div>
       ) : null}

       <div>
        {!searchState && filter === "authors" ? (
         <div>
          {iskcon.author.map((td) => {
           if (td === "") return null;

           if (anchor2 === td) {
            if (others) {
             let nind = 0;
             for (let j in iskcon.songs) {
              if (iskcon.songs[j].name === td) {
               nind = j;
              }
             }

             return (
              <IonItem
               color={clr}
               ref={cont2}
               button
               onClick={() => {
                history.push(`${url}/songs/${iskcon.songs[nind].name}_${iskcon.songs[nind].book}`);
                setAnchor2(td);
               }}
              >
               <IonLabel style={{ fontFamily: `${fon}` }}>{td}</IonLabel>

               <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
                {iskcon.songs[nind].author}
               </IonNote>
              </IonItem>
             );
            }

            return (
             <IonItem
              ref={cont2}
              color={clr}
              button
              onClick={() => {
               let nind;
               for (let j in iskcon.songs) {
                if (iskcon.songs[j].name === td) {
                 nind = j;
                }
               }

               history.push(`${url}/songs/${iskcon.songs[nind].name}_${iskcon.songs[nind].book}`);
               setAnchor2(td);
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }}>{td}</IonLabel>
             </IonItem>
            );
           }

           if (td.indexOf("Songs by Others") !== -1) {
            others = true;
           }

           if (td.indexOf("Songs") !== -1) {
            return (
             <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
              <IonLabel style={{ fontFamily: `${fon}` }}>{td}</IonLabel>
             </IonItemDivider>
            );
           }

           if (others) {
            let nind;
            for (let j in iskcon.songs) {
             if (iskcon.songs[j].name === td) {
              nind = j;
             }
            }

            return (
             <IonItem
              color={clr}
              button
              onClick={() => {
               history.push(`${url}/songs/${iskcon.songs[nind].name}_${iskcon.songs[nind].book}`);
               setAnchor2(td);
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }}>{td}</IonLabel>

              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {iskcon.songs[nind].author}
              </IonNote>
             </IonItem>
            );
           }

           return (
            <IonItem
             color={clr}
             button
             onClick={() => {
              let nind;
              for (let j in iskcon.songs) {
               if (iskcon.songs[j].name === td) {
                nind = j;
               }
              }

              history.push(`${url}/songs/${iskcon.songs[nind].name}_${iskcon.songs[nind].book}`);
              setAnchor2(td);
             }}
            >
             <IonLabel style={{ fontFamily: `${fon}` }}>{td}</IonLabel>
            </IonItem>
           );
          })}
         </div>
        ) : null}
       </div>

       <div>
        {!searchState && filter === "pranama" ? (
         <div>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Guru Pranama_Songs%20of%20Vaishnava%20Acaryas_0_0`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Guru Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Rupa Pranama_Songs%20of%20Vaishnava%20Acaryas_0_1`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Rupa Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Mangalacaran_Songs%20of%20Vaishnava%20Acaryas_0_2`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Mangalacarana</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Srila Prabhupada Pranati_Songs%20of%20Vaishnava%20Acaryas_0_3`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Srila Prabhupada Pranati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Srila Bhaktisiddhanta Sarasvati Pranati_Songs%20of%20Vaishnava%20Acaryas_0_4`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Srila Bhaktisiddhanta Sarasvati Pranati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Srila Gaurakisora Pranati_Songs%20of%20Vaishnava%20Acaryas_0_5`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Srila Gaurakisora Pranati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Srila Bhaktivinoda Pranati_Songs%20of%20Vaishnava%20Acaryas_0_6`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Srila Bhaktivinoda Pranati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Srila Jagannatha Pranati_Songs%20of%20Vaishnava%20Acaryas_0_7`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Srila Jagannatha Pranati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Vaishnava Pranama_Songs%20of%20Vaishnava%20Acaryas_0_8`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Vaishnava Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Gauranga Pranama_Songs%20of%20Vaishnava%20Acaryas_0_9`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Gauranga Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Panca-tattva Pranama_Songs%20of%20Vaishnava%20Acaryas_0_10`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Panca-tattva Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Krishna Pranama_Songs%20of%20Vaishnava%20Acaryas_0_11`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Krishna Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sambandhadhideva Pranama_Songs%20of%20Vaishnava%20Acaryas_0_12`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sambandhadhideva Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Abhidheyadhideva Pranama_Songs%20of%20Vaishnava%20Acaryas_0_13`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Abhidheyadhideva Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Prayojanadhideva Pranama_Songs%20of%20Vaishnava%20Acaryas_0_14`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Prayojanadhideva Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Radha Pranama_Songs%20of%20Vaishnava%20Acaryas_0_15`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Radha Pranama</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Panca-tattva Maha-mantra_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Panca-tattva Maha-mantra</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Hare Krishna Mahamantra_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Hare Krishna Mahamantra</IonLabel>
          </IonItem>
         </div>
        ) : null}
       </div>

       <div>
        {!searchState && filter === "temple" ? (
         <div>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Samsara Davanala Lidha Loka_Songs%20of%20Vaishnava%20Acaryas_0_18`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Mangal Arati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Prema Dhvani Prayers_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Prema Dhvani Prayers</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Namaste Narasimhaya_Songs%20of%20Vaishnava%20Acaryas_3_13`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Narasimha Aarati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Namo Namah Tulasi Krsna Preyasi_Songs%20of%20Vaishnava%20Acaryas_3_12`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Tulasi Arati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Ceto Darpana Marjanam_Songs%20of%20Vaishnava%20Acaryas_0_20`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Sri Shikshashtakam</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Ten Offenses_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Ten Offenses</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Govindam Prayers_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Govindam Prayers</IonLabel>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sri Guru Carana Padma_Songs%20of%20Vaishnava%20Acaryas_2_6`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Guru Puja</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Jaya Radha Madhava_Songs%20of%20Vaishnava%20Acaryas_1_11`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Jaya Radha-Madhava</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Mangalacarana (Full)_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Mangalacarana (Full)</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Jaya Jaya Goracander Arotik_Songs%20of%20Vaishnava%20Acaryas_1_16`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Gaura Arati</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Hari Haraye Namah Krsna Yadavaya_Songs%20of%20Vaishnava%20Acaryas_2_2`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Nama Sankirtana</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Vibhavari Sesa_Songs%20of%20Vaishnava%20Acaryas_1_19`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Vibhavari Sesa</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Yasomati Nandana_Songs%20of%20Vaishnava%20Acaryas_1_17`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Nama-Kirtana</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Bhaja Bhakata Vatsala_Songs%20of%20Vaishnava%20Acaryas_1_15`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Bhoga Arati</IonLabel>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Prasadam Seva_Songs%20of%20Vaishnava%20Acaryas_1_8`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Prasadam Seva</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Namamisvaram Saccidananda Rupam_Songs%20of%20Vaishnava%20Acaryas_3_5`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Damodara Ashtakam</IonLabel>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Krsnotkirtana Gana Nartana_Songs%20of%20Vaishnava%20Acaryas_0_19`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Sri Sad Goswami Ashtaka</IonLabel>
          </IonItem>
         </div>
        ) : null}
       </div>

       <div>
        {!searchState && filter === "astakams" ? (
         <div>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Samsara Davanala Lidha Loka_Songs%20of%20Vaishnava%20Acaryas_0_18`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Guruvastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Visvanatha Cakravarti Thakura
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Ceto Darpana Marjanam_Songs%20of%20Vaishnava%20Acaryas_0_20`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Shikshastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Lord Sri Caitanya Mahaprabhu
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Krsnotkirtana Gana Nartana_Songs%20of%20Vaishnava%20Acaryas_0_19`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Shad Goswami-astakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Srinivasa Acarya
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Gangeya Campeya_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Vrndadevi-astakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Visvanatha Cakravarti Thakura
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Huhunkara Garjanadi Aho_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Advaitastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Sarvabhauma Bhattacarya
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Sarac Candra Bhrantim_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Nityanandastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Prabodhananda Sarasvati
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Nava Gaura Varam_More%20Songs%20of%20the%20Vaisnava%20Acaryas_34`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sacisutastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Sarvabhauma Bhattacarya
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Ujjvala Varana_More%20Songs%20of%20the%20Vaisnava%20Acaryas_47`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sacitanayastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Sarvabhauma Bhattacarya
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Ambudanjanendra Nila_More%20Songs%20of%20the%20Vaisnava%20Acaryas_2`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Krsishna Candrastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Krsnadasa Kaviraja Goswami
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Kunkumakta Kancanabja_More%20Songs%20of%20the%20Vaisnava%20Acaryas_29`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Radhikastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Krsnadasa Kaviraja Goswami
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Krsna Prema Mayi Radha_More%20Songs%20of%20the%20Vaisnava%20Acaryas_28`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Yugalastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Jiva Goswami
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Kadacit Kalindi Tata Vipina_Songs%20of%20Vaishnava%20Acaryas_3_6`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Jagannathastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Adi Sankaracarya
           </IonNote>
          </IonItem>
          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Namamisvaram Saccidananda Rupam_Songs%20of%20Vaishnava%20Acaryas_3_5`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Damodarastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Satyavrata Muni
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Adharam Madhuram_More%20Songs%20of%20the%20Vaisnava%20Acaryas_0`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Madhurastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Sri Vallabhacarya
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Vraje Prasiddham Navanita_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Corastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Bilvamangala Thakura
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Nava Nirada Nindita_More Songs of the Vaisnava Acaryas_35`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Vrajaraja Sutastakam</IonLabel>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Munindra Vrnda Vandite_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Sri Radha Krpa Kataksha Stava Raja</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Lord Siva
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Madhuram Madhurebhyo ‘Pi_More%20Songs%20of%20the%20Vaisnava%20Acaryas_31`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Kevalastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Nilakanta Goswami
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Bhratur Antakasya Pattane_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Yamunastakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Visvanatha Cakravarti Thakura
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Nija Pati Bhuja_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Govardhana Vasa Prarthana Dasakam</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Ragunatha Dasa Goswami
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Devi Suresvari Bhagavati Gange_`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Ganga Stotram</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Adi Sankaracarya
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`${url}/songs/Pralaya Payodhi Jale_Songs%20of%20Vaishnava%20Acaryas_3_1`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Dasavatara Stotra</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            Jayadeva Goswami
           </IonNote>
          </IonItem>

          <IonItem color={clr} button onClick={() => history.push(`/topics/Stavamrita%20Lahari`)}>
           <IonLabel style={{ fontFamily: `${fon}` }}>Stavamrita Lahari</IonLabel>
           <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
            VCT (Book of Ashtakams)
           </IonNote>
          </IonItem>
         </div>
        ) : null}
       </div>

       <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <IonItem
         button
         onClick={() => {
          setAnchorEl(null);
          setFilter("all");
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }}> Alphabetical</IonLabel>
        </IonItem>
        <IonItem
         button
         onClick={() => {
          setAnchorEl(null);
          setFilter("authors");
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }}> Authors</IonLabel>
        </IonItem>
        <IonItem
         button
         onClick={() => {
          setAnchorEl(null);
          setFilter("temple");
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }}>Temple Songs</IonLabel>
        </IonItem>
        <IonItem
         button
         onClick={() => {
          setAnchorEl(null);
          setFilter("pranama");
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }}>Pranama Mantras </IonLabel>
        </IonItem>
        <IonItem
         lines="none"
         button
         onClick={() => {
          setAnchorEl(null);
          setFilter("astakams");
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }}> Ashtakams & Stotras</IonLabel>
        </IonItem>
       </Menu>
      </motion.div>
      <IonToolbar className="tab" color={clr ? "warning" : "primary"}>
       <IonSegment value="default">
        <IonSegmentButton value="default" onClick={() => history.push("/iskcon")}>
         <QueueMusicSharp />
        </IonSegmentButton>
        <IonSegmentButton onClick={() => history.push("/topics")}>
         <MenuBookSharp />
        </IonSegmentButton>
        <IonSegmentButton onClick={() => history.push("/playlist")}>
         <LibraryMusicSharp />
        </IonSegmentButton>
        <IonSegmentButton onClick={() => history.push("/bookmarks")}>
         <CollectionsBookmarkSharp />
        </IonSegmentButton>
       </IonSegment>
      </IonToolbar>
     </Route>

     <Route path={`${path}/songs/:ind`}>
      <Csong value={[file, setFile]} />
     </Route>
     <Route path={`${path}/menu/:id`}>
      <Tsub />
     </Route>
     <Route path={`${path}/about`}>
      <About />
     </Route>
     <Route path={`${path}/settings`}>
      <Settings />
     </Route>
     <Route path={`${path}/readme`}>
      <Readme />
     </Route>
     <Route path={`${path}/sb`}>
      <SB />
     </Route>
    </Switch>
    <div style={{ height: "56px" }}></div>
   </AnimatePresence>
  </div>
 );
}

export default Csub;
