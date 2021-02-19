import React, { useContext } from "react";
import { Switch, Route, useHistory, useRouteMatch, useLocation } from "react-router-dom";

import { IonItem, IonToolbar, IonLabel, IonButtons, IonSegmentButton, IonSegment, IonItemDivider, IonNote } from "@ionic/react";
import { Colour, FontType } from "../global";
import ScrollToTop from "../scroll";
import { AnimatePresence, motion } from "framer-motion";
import Part from "./chapters";
import { LibraryMusicSharp, CollectionsBookmarkSharp, QueueMusicSharp, MenuBookSharp } from "@material-ui/icons";

function Book() {
 let { path, url } = useRouteMatch();

 let history = useHistory();
 let location = useLocation();
 const [clr, setClr] = useContext(Colour);
 let color2;
 if (clr) color2 = "#FFEB3B";
 else color2 = "#00CBFE";
 let color3;
 if (clr) color3 = "black";
 else color3 = "white";
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 return (
  <div>
   <AnimatePresence onExitComplete>
    <Switch location={location}>
     <Route exact path={path}>
      <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ type: "linear", duration: 1 }}>
       <ScrollToTop />
       <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
        <IonButtons slot="start">
         <IonLabel style={{ marginLeft: "10px", fontFamily: `${fon}` }}>Song Books</IonLabel>
        </IonButtons>
       </IonToolbar>

       <div style={{ height: "58px" }}></div>
       <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Bhakti Vinoda Thakura</IonLabel>
       </IonItemDivider>
       <IonItem color={clr} onClick={() => history.push(`${url}/Saranagati`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Saranagati</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Gitavali`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Gitavali</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Kalyanakalpataru`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Kalyanakalpataru</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Gitamala`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Gitamala</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Baula Sangita`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Baula Sangita</IonLabel>
       </IonItem>
       <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Narottama Dasa Thakura</IonLabel>
       </IonItemDivider>
       <IonItem color={clr} onClick={() => history.push(`${url}/Prarthana`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Prarthana</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Prema Bhakti Chandrika`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Prema Bhakti Chandrika</IonLabel>
       </IonItem>
       <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Visvanatha Cakravarti Thakura</IonLabel>
       </IonItemDivider>
       <IonItem color={clr} onClick={() => history.push(`${url}/Stavamrita Lahari`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Stavamrita Lahari</IonLabel>
       </IonItem>
       <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Song Books based on Srimad Bhagavatam</IonLabel>
       </IonItemDivider>
       <IonItem color={clr} onClick={() => history.push(`${url}/Krsna Lila Stava`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Krishna Lila Stava</IonLabel>
        <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
         Sanatana Goswami
        </IonNote>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Sri Krsna Vijaya`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Sri Krishna Vijaya</IonLabel>
        <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
         Gunaraja Khan
        </IonNote>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Gopala Campu`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Gopala Campu</IonLabel>
        <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
         Jiva Goswami (Abridged)
        </IonNote>
       </IonItem>

       <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Compilations</IonLabel>
       </IonItemDivider>
       <IonItem color={clr} onClick={() => history.push(`${url}/Sri Ksanada Gita Cintamani`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Sri Ksanada Gita Cintamani</IonLabel>
        <IonNote style={{ fontFamily: `${fon}` }} color={!clr ? "dark" : "light"} mode="ios" slot="end">
         VCT (Abridged)
        </IonNote>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Songs of the Vaisnava Acaryas`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Songs of the Gaudiya Vaishnava Acaryas</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/The Acaryas Songs Glorifying Lord Gauranga and Govinda`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Songs Glorifying Lord Gauranga and Govinda</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/Songs of Vaishnava Acaryas`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>Songs of the Vaishnava Acaryas</IonLabel>
       </IonItem>
       <IonItem color={clr} onClick={() => history.push(`${url}/More Songs of the Vaisnava Acaryas`)}>
        <IonLabel style={{ fontFamily: `${fon}` }}>More Songs of the Vaiṣṇava Acaryas</IonLabel>
       </IonItem>

       <div style={{ height: "56px" }}></div>
      </motion.div>
     </Route>

     <Route path={`${path}/:name`}>
      <Part />
     </Route>
    </Switch>
   </AnimatePresence>
   <IonToolbar className="tab" color={clr ? "warning" : "primary"}>
    <IonSegment value="default">
     <IonSegmentButton onClick={() => history.push("/iskcon")}>
      <QueueMusicSharp />
     </IonSegmentButton>
     <IonSegmentButton value="default" onClick={() => history.push("/topics")}>
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
  </div>
 );
}

export default Book;
