import React, { useContext } from "react";
import Song from "./song";
import { AnimatePresence, motion } from "framer-motion";
import { BookContent, Colour, FontType } from "../global";
import { Switch, Route, useHistory, useParams, useRouteMatch, useLocation } from "react-router-dom";
import { IonItem, IonLabel, IonToolbar, IonButtons, IonButton } from "@ionic/react";
import { ArrowBackSharp } from "@material-ui/icons";

function Sub(props) {
 let { songid } = useParams();
 let { path, url } = useRouteMatch();
 let location = useLocation();
 let id = Number(songid);
 let history = useHistory();
 const [clr, setClr] = useContext(Colour);
 const content = useContext(BookContent);
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 return (
  <AnimatePresence onExitComplete>
   <Switch location={location}>
    <Route exact path={path}>
     <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ type: "linear", duration: 1 }}>
      <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
       <IonButtons slot="start">
        <IonButton onClick={() => history.goBack()}>
         <ArrowBackSharp />
        </IonButton>
       </IonButtons>
       <IonButtons slot="start">
        <IonLabel style={{ fontFamily: `${fon}` }}>
         {content[props.title].chap[id].name.indexOf("-") !== -1
          ? content[props.title].chap[id].name.slice(0, content[props.title].chap[id].name.indexOf("-"))
          : content[props.title].chap[id].name}
        </IonLabel>
       </IonButtons>
      </IonToolbar>
      <div style={{ height: "58px" }}></div>
      {content[props.title].chap[id].song.map((td, i) => {
       function next() {
        history.push(`${url}/${i}`);
       }
       return (
        <IonItem color={clr} button onClick={next}>
         <IonLabel style={{ fontFamily: `${fon}` }}>{td.name}</IonLabel>
        </IonItem>
       );
      })}
      <div style={{ height: "56px" }}></div>
     </motion.div>
    </Route>
    <Route path={`${path}/:songid`}>
     <Song i1={props.title} i2={id} />
    </Route>
   </Switch>
  </AnimatePresence>
 );
}

export default Sub;
