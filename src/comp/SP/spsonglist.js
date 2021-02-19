import { IonItem, IonLabel, IonButtons, IonButton, IonToolbar, IonSegmentButton, IonSegment } from "@ionic/react";
import React, { useContext, useState, useRef } from "react";
import { SPContent, Colour, FontType } from "../global";
import Tsong from "./spsong";
import { Switch, Route, useLocation, useRouteMatch, useHistory } from "react-router-dom";

import { ArrowBackSharp, QueueMusicSharp, MenuBookSharp, LibraryMusicSharp, CollectionsBookmarkSharp } from "@material-ui/icons";
import ScrollToTop from "../scroll";
import { AnimatePresence, motion } from "framer-motion";
export default function Tsub() {
 let { path, url } = useRouteMatch();
 let history = useHistory();
 let location = useLocation();

 let [piskcon, setpiskcon] = useContext(SPContent);
 const [anchor, setAnchor] = useState();
 const cont = useRef();
 setTimeout(function () {
  if (cont.current) {
   cont.current.focus({ preventScroll: false });
  }
 }, 1500);
 const [clr, setClr] = useContext(Colour);
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 return (
  <AnimatePresence onExitComplete>
   <Switch location={location}>
    <Route exact path={path}>
     <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ type: "linear", duration: 1 }}>
      <ScrollToTop />
      <IonToolbar color={clr ? "warning" : "primary"} className="ionhead">
       <IonButtons slot="start" onClick={() => history.goBack()}>
        <IonButton>
         <ArrowBackSharp />
        </IonButton>
       </IonButtons>
       <IonLabel style={{ fontFamily: `${fon}` }}>Bhaktivedanta Music & Purports</IonLabel>
      </IonToolbar>
      <div style={{ height: "34px" }}></div>
      <p style={{ marginBottom: 0 }}>
       {piskcon.songs.map((td, i) => {
        if (i === anchor) {
         return (
          <IonItem
           color={clr}
           button
           onClick={() => {
            history.push(`${url}/${i}`);
            setAnchor(i);
           }}
           ref={cont}
          >
           <IonLabel style={{ fontFamily: `${fon}` }}>{td.name}</IonLabel>
          </IonItem>
         );
        }
        return (
         <IonItem
          color={clr}
          button
          onClick={() => {
           history.push(`${url}/${i}`);
           setAnchor(i);
          }}
         >
          <IonLabel style={{ fontFamily: `${fon}` }}>{td.name}</IonLabel>
         </IonItem>
        );
       })}
      </p>
     </motion.div>
    </Route>
    <Route path={`${path}/:ind`}>
     <Tsong value={[piskcon, setpiskcon]} />
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
}
