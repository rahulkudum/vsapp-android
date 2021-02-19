import React, { useContext, useState, useRef, useEffect } from "react";
import { Colour, FontType } from "../global";
import { IonItem, IonToolbar, IonItemDivider, IonLabel, IonButtons, IonButton, IonNote, IonSegment, IonSegmentButton } from "@ionic/react";

import { Plugins } from "@capacitor/core";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowBackSharp, QueueMusicSharp, MenuBookSharp, LibraryMusicSharp, CollectionsBookmarkSharp } from "@material-ui/icons";

import { Switch, Route, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import SBP from "./sbsong";
import ScrollToTop from "../scroll";
const { Storage } = Plugins;
function SB() {
 let { path, url } = useRouteMatch();

 let history = useHistory();
 let location = useLocation();
 const [content, setContent] = useState({ chap: [], inside: "" });
 let content2;

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
 const [anchor1, setAnchor1] = useState();
 const [anchor2, setAnchor2] = useState();
 const cont = useRef();

 async function getItem(key) {
  const valu = await Storage.get({ key: key });

  return valu.value;
 }

 useEffect(() => {
  getItem("govardhan").then((res) => {
   content2 = JSON.parse(res);
   setContent(content2);
  });
 }, []);

 setTimeout(function () {
  if (cont.current) {
   cont.current.focus({ preventScroll: false });
  }
 }, 1500);

 if (content.chap.length !== 0) {
  return (
   <AnimatePresence onExitComplete>
    <Switch location={location}>
     <Route exact path={path}>
      <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ type: "linear", duration: 1 }}>
       <ScrollToTop />
       <div style={{ height: "58px" }}></div>
       <IonToolbar color={clr ? "warning" : "primary"} className="ionhead">
        <IonButtons slot="start" onClick={() => history.goBack()}>
         <IonButton>
          <ArrowBackSharp />
         </IonButton>
        </IonButtons>
        <IonLabel style={{ fontFamily: `${fon}` }}> Prayers from Srimad Bhagavatam</IonLabel>
       </IonToolbar>
       {content.chap.map((part, i1) => {
        if (i1 === anchor1) {
         return (
          <div>
           <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
            <IonLabel style={{ fontFamily: `${fon}` }}>{part.name}</IonLabel>
           </IonItemDivider>

           {content.chap[i1].song.map((td, i2) => {
            if (i2 === anchor2) {
             return (
              <IonItem
               color={clr}
               button
               onClick={() => {
                history.push(`${url}/${i1}_${i2}`);
                setAnchor1(i1);
                setAnchor2(i2);
               }}
               ref={cont}
              >
               <IonLabel style={{ fontFamily: `${fon}` }} style={{ fontSize: "14px" }}>
                {td.name.slice(0, td.name.indexOf("(SB")).slice(0, td.name.slice(0, td.name.indexOf("(SB")).indexOf("(SB"))}
               </IonLabel>
               <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
                {td.name.slice(td.name.indexOf("(SB"))}
               </IonNote>
              </IonItem>
             );
            }

            return (
             <IonItem
              color={clr}
              button
              onClick={() => {
               history.push(`${url}/${i1}_${i2}`);
              }}
             >
              <IonLabel style={{ fontFamily: `${fon}` }} style={{ fontSize: "14px" }}>
               {td.name.slice(0, td.name.indexOf("(SB"))}
              </IonLabel>
              <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
               {td.name.slice(td.name.indexOf("(SB"))}
              </IonNote>
             </IonItem>
            );
           })}
          </div>
         );
        }

        return (
         <div>
          <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}`, fontSize: "16px" }}>
           <IonLabel style={{ fontFamily: `${fon}` }}>{part.name}</IonLabel>
          </IonItemDivider>

          {content.chap[i1].song.map((td, i2) => {
           return (
            <IonItem
             color={clr}
             button
             onClick={() => {
              history.push(`${url}/${i1}_${i2}`);
              setAnchor1(i1);
              setAnchor2(i2);
             }}
            >
             <IonLabel style={{ fontFamily: `${fon}` }} style={{ fontSize: "14px" }}>
              {td.name.slice(0, td.name.indexOf("(SB"))}
             </IonLabel>
             <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
              {td.name.slice(td.name.indexOf("(SB"))}
             </IonNote>
            </IonItem>
           );
          })}
         </div>
        );
       })}
      </motion.div>
     </Route>
     <Route path={`${path}/:ind`}>
      <SBP govardhan={content} />
     </Route>
    </Switch>
    <IonToolbar className="tab" color={clr ? "warning" : "primary"}>
     <IonSegment>
      <IonSegmentButton onClick={() => history.push("/iskcon")}>
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
   </AnimatePresence>
  );
 } else {
  return null;
 }
}

export default SB;
